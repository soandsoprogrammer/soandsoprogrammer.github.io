<style lang="less">
    @import '../../styles/common.less';
    @import '../tables/components/table.less';
</style>
<template>
    <div>
        <!--<form action="" style="margin: 5px 0">-->
        <!--<Input v-model="name"  placeholder="根据用户名查找" style="width: 200px;margin-right: 3px;"></Input>-->
        <!--<Input v-model="phone" placeholder="根据手机号查找" style="width: 200px"></Input>-->
        <!--<Button type="info" style="float: right;margin-right: 5px" @click="load">搜索</Button>-->
        <!--</form>-->
        <Modal
                v-model="modal1"
                title="修改广告"
                style="height: 700px;"
        >
            <Form ref="addValidate" :model="addInner" :rules="addValidate"   :label-width="100">
                <Row :gutter="16">
                    <Col span="12">
                    <FormItem label="图片跳转地址" prop="price">
                        <Input v-model="addInner.price"   style="margin-right: 3px;"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="图片"  prop="picFlie">
                        <input class="ivu-input"  v-model="addInner.picFlie"  @click="files"  style="margin-right: 3px;">
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="24">
                    <FormItem label="备注" prop="presentation">
                        <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" v-model="addInner.presentation"   style="margin-right: 3px;"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <input style="display: none" id="filed" type="file" @change="imgChange">
            </Form>
            <div slot="footer" style="overflow: hidden">
                <div style="float: right">
                    <Button type="primary" @click="add('addValidate')">保存</Button>
                </div>
            </div>
        </Modal>
        <Table :loading="loading" refs="table1"  :data="Message" :columns="columnsList"></Table>
        <!--<Page :total="pageNum" :page-size="pageSize"  style="text-align: center;margin-top: 15px;" show-total   show-elevator  @on-change="pageChange"></Page>-->
        <Modal title="图片预览" v-model="visible">
            <img :src="imgName " v-if="visible" style="width: 100%">
        </Modal>
    </div>
</template>
<script>
    import $http from '../../utils/axiosWrap'
    import canEditTable from '../tables/components/canEditTable.vue'
    import Cookies from 'js-cookie'

    export default {
        data() {
            return {
                loading: true,
                Message:[],
                imgName:'',
                admin:true,
                visible:false,
                modal1:false,
                columnsList: [
                    {
                        title: '序号',
                        width: 80,
                        render: (h, params) => {
                            return  params.index + (this.initPage- 1) * this.pageSize + 1
                        }
                    },
                    {
                        title: '广告图片',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('img', {
                                    attrs: {
                                        src:'http://www.chaincsa.com/viCoin/image/imageFile/'+ params.row.adValue
                                    },
                                    style: {
                                        width: '40px',
                                        height: '40px',
                                        marginTop:'10px'
                                    },
                                    on: {
                                        click: () => {
                                            this.handleView('http://www.chaincsa.com/viCoin/image/imageFile/' + params.row.adValue)
                                        }
                                    }
                                })
                            ]);
                        }
                    },
                    {
                        title: '位置',
                        align: 'center',
                        key: 'remarks',
                        editable: true
                    },
                    {
                        title: '跳转地址',
                        align: 'center',
                        key: 'adUrl',
                        editable: true
                    },
                    {
                        title: '修改时间',
                        align: 'center',
                        key: 'lastModify',
                        editable: true
                    },{
                        title: '操作',
                        align: 'center',
                        width: 140,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.ty(params)
                                        }
                                    }
                                }, '修改')
                            ])
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
                    presentation: [
                        { required: true, message: '备注不得为空', trigger: 'blur' }
                    ],
                    price: [
                        { required: true,  message: '跳转路径不得为空', trigger: 'blur'}
                    ],
                    picFlie: [
                        { required: true, message: '图片不得为空', trigger: 'blur' }
                    ]
                },
                name: '',
                phone: '',
                pageSize:10,
                initPage:1,
                pageNum:1
            }
        },
        created: function () {
            this.load()
        },
        methods: {

            load (index){
                let _this = this
                let params = new URLSearchParams()
                params.append('pageNo',_this.initPage)
                $http.post('a/login/Advertisement',params).then(function (res) {
                    console.log(res)
                    if(res.suc){
                        _this.Message = res.result.content
                        _this.pageNum = res.result.totalElements
                    }else{
                        _this.$Message.error(res.msg)
                    }
                    _this.loading = false
                })
            },
            pageChange(index){
                this.initPage = index
                this.load ()
            },
            ty(index){
                this.$refs['addValidate'].resetFields()
                this.addInner.presentation = index.row.remarks + ''
                this.addInner.price = index.row.adUrl + ''
                this.addInner.picFlie = index.row.adValue + ''
                this.addInner.adKey = index.row.adKey + ''

                this.modal1 = true
            },
            files(){
                document.getElementById("filed").click()
            },
            imgChange(){
                this.addInner.picFlie = document.getElementById('filed').files[0].name
                var picStr = this.addInner.picFlie.split('.')[1].toUpperCase()
                if(picStr != 'JPG' && picStr !='PNG'){
                    this.addInner.picFlie = ''
                    this.$Message.error('请上传图片!')
                }
            },
            add(name){
                let _this = this
                _this.$refs[name].validate((valid) => {
                    if (valid) {
                            let params = new FormData()
                            params.append('adKey',_this.addInner.adKey)
                            params.append('adUrl',_this.addInner.price)
                            params.append('remarks',_this.addInner.presentation)
                            params.append('adminid',Cookies.get('superId'))
                            if(document.getElementById('filed').files[0]){
                                params.append('file',document.getElementById('filed').files[0])
                            }else{
                                params.append('file',_this.addInner.picFlie)
                            }
                            $http.post('a/login/updateHomeAD',params,{
                                headers:{
                                    'Content-Type':'multipart/form-data'
                                }
                            }).then(function (res) {
                                if(res.suc){
                                    _this.$Message.info('修改成功!')
                                    _this.modal1 = false
                                    _this.loading = true
                                    setInterval(_this.load(),1000);

                                }else{
                                    _this.$Message.error('修改失败!')
                                }
                            })
                    } else {
                        _this.$Message.error('信息填写有误!')
                    }
                })
            }
        }
    }
</script>
<style>
</style>
