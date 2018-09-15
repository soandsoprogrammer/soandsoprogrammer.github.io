<style lang="less">
    @import '../../styles/common.less';
    @import '../tables/components/table.less';
</style>
<template>
    <div>
        <form action="" style="margin: 5px 0;overflow: hidden">
            <!--<Input v-model="name" icon="search"  placeholder="根据用户名查找" @on-click="searchName" style="width: 200px;margin-right: 3px;"></Input>-->
            <!--<Input v-model="phone" icon="search" placeholder="根据手机号查找" @on-click="searchPhone" style="width: 200px"></Input>-->
            <Button type="info" style="float: right;margin-right: 5px" @click="addUser">添加</Button>
        </form>
        <Table :loading="loading" refs="table1"  :data="Message" :columns="columnsList"></Table>
        <Page :total="pageNum" :page-size="10"  style="text-align: center;margin-top: 15px;"  @on-change="pageChange"></Page>
        <Modal
                v-model="modal1"
                :title="modTitle"
        >
            <Form ref="addValidate" :model="addInner" :rules="addValidate"   :label-width="100">
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem label="商品id" prop="shoppingId">
                            <Input v-model="addInner.shoppingId"   style="margin-right: 3px;"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="商品积分价格" prop="price">
                            <Input v-model="addInner.price"   style="margin-right: 3px;"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem label="图片"  prop="picFlie">
                            <input class="ivu-input"  v-model="addInner.picFlie"  @click="files"  style="margin-right: 3px;">
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                    <FormItem label="商品介绍" prop="presentation">
                        <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" v-model="addInner.presentation"   style="margin-right: 3px;"></Input>
                    </FormItem>
                    </Col>
                </Row>

                <input style="display: none" id="filed" type="file" @change="imgChange">
            </Form>
            <div slot="footer">
                <Button type="primary" @click="add('addValidate')">保存</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import $http from '../../utils/axiosWrap'
    import canEditTable from '../tables/components/canEditTable.vue'
    export default {
        data() {
            return {
                modTitle: '',
                modal1:false,
                loading: true,
                Message:[],
                admin:true,
                columnsList: [
                    {
                        title: '商品ID',
                        align: 'center',
                        key: 'shoppingId',
                        editable: true
                    },
                    {
                        title: '商品编号',
                        align: 'center',
                        key: 'productId',
                        editable: true
                    },
                    {
                        title: '商品介绍',
                        align: 'center',
                        width: 800,
                        key: 'presentation'
                    },
                    {
                        title: '积分价格',
                        align: 'center',
                        key: 'price',
                        editable: true
                    },
                    {
                        title: '操作',
                        align: 'center',
                        width: 140,
                        render: (h, params) => {
                            if(this.admin){
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.change(params)
                                            }
                                        }
                                    }, '编辑'),
                                    h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.del(params)
                                            }
                                        }
                                    }, '删除')
                                ]);
                            }
                        }
                    }
                ],
                addInner:{
                    shoppingId:'',
                    presentation:'',
                    price:'',
                    picFlie:'',
                    pic:''
                },
                addValidate: {
                    shoppingId: [
                        { required: true, message: '商品ID不得为空', trigger: 'blur' }
                    ],
                    presentation: [
                        { required: true, message: '商品介绍不得为空', trigger: 'blur' }
                    ],
                    price: [
                        { required: true,  message: '商品积分价格不得为空', trigger: 'blur'}
                    ],
                    picFlie: [
                        { required: true, message: '品牌图片不得为空', trigger: 'blur' }
                    ]
                },
                initPage:1,
                pageNum:1,
                openList:''
            }
        },
        created: function () {
            this.load()
        },
        methods: {
            load (){
                let _this = this
                let params = new URLSearchParams()
                params.append('pno',_this.initPage)
                $http.post('/shopping/listShopping',params).then(function (res) {
                    _this.Message = res.result.list
                    _this.pageNum = res.result.totalRow
                    _this.loading = false
                    console.log(res)
                })
            },
            pageChange(index){
               this.initPage = index
                this.load ()
            },
            del(index){
                let _this = this
                let params = new URLSearchParams()
                params.append('shoppingId',index.row.shoppingId)
                $http.post('/shopping/deleteShopping',params).then(function (res) {
                     if(res.suc){
                         _this.$Message.info('删除成功!')
                         _this.load()
                     }else{
                         _this.$Message.error('删除失败!')
                     }
                })
            },
            change(index){
                this.$refs['addValidate'].resetFields()
                this.openList = 1
                this.modTitle = '修改商家信息'
                this.modal1 = true
                this.addInner.shoppingId = index.row.shoppingId + ''
                this.addInner.presentation = index.row.presentation + ''
                this.addInner.price = index.row.price + ''
                this.addInner.picFlie = index.row.picture
                this.addInner.pic = index.row.picture
            },
            addUser(){
                this.$refs['addValidate'].resetFields()
                this.openList = 2
                this.modTitle = '添加商家信息'
                this.addInner.shoppingId = ''
                this.addInner.presentation = ''
                this.addInner.price = ''
                this.addInner.picFlie = ''
                this.addInner.pic = ''
                this.modal1 = true
            },
            add(name){
                let _this = this
                if(_this.addInner.shoppingId){
                    _this.$refs[name].validate((valid) => {
                        if (valid) {
                            let params = new FormData()
                            params.append('presentation',_this.addInner.presentation)
                            params.append('price',_this.addInner.price)
                            if(_this.openList == 1){
                                params.append('shoppingId',_this.addInner.shoppingId)
                                if(document.getElementById('filed').files[0]){
                                    params.append('pic',document.getElementById('filed').files[0])
                                }else{
                                    params.append('pic',_this.addInner.pic)
                                }
                                $http.post('/shopping/updateShopping',params,{
                                    headers:{
                                        'Content-Type':'multipart/form-data'
                                    }
                                }).then(function (res) {
                                    if(res.suc){
                                        _this.$Message.info('修改成功!')
                                        _this.modal1 = false
                                        _this.load()
                                    }else{
                                        _this.$Message.error('修改失败!')
                                    }
                                })
                            }else{
                                if(document.getElementById('filed').files[0]){
                                    params.append('pic',document.getElementById('filed').files[0])
                                    $http.post('/shopping/addShopping',params,{
                                        headers:{
                                            'Content-Type':'multipart/form-data'
                                        }
                                    }).then(function (res) {
                                        if(res.suc){
                                            _this.$Message.info('添加成功!')
                                            _this.modal1 = false
                                            _this.load()
                                        }else{
                                            _this.$Message.error('添加失败!')
                                        }
                                    })
                                }else{
                                    _this.$Message.error('请添加图片!')
                                }

                            }
                        } else {
                            _this.$Message.error('信息填写有误!')
                        }
                    })
                }else{
                    _this.$Message.error('关联ID不得为空!')
                }
            },
            files(){
                document.getElementById("filed").click()
            },
            imgChange(){
                this.addInner.picFlie = document.getElementById('filed').files[0].name
            }
        }
    }
</script>
<style>
</style>

