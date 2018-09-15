<style lang="less">
    @import '../../styles/common.less';
    @import '../tables/components/table.less';
</style>
<template>
    <div>
        <form action="" style="margin: 5px 0">
        <Input v-model="name"  placeholder="根据店铺名查找" style="width: 200px;margin-right: 3px;"></Input>
        <!--<Input v-model="phone" placeholder="根据手机号查找" style="width: 200px"></Input>-->
        <Button type="info" style="float: right;margin-right: 5px" @click="load(1)">搜索</Button>
        </form>
        <Table :loading="loading" refs="table1"  :data="Message" :columns="columnsList"></Table>
        <Modal
                v-model="modal1"
                title="拒绝理由"
        >
            <Form ref="addValidate" :model="addInner" :rules="addValidate"   :label-width="100">
                <Row :gutter="16">
                    <Col span="24">
                    <FormItem label="理由" prop="inner">
                        <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" v-model="addInner.inner"   style="margin-right: 3px;"></Input>
                    </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer" style="overflow: hidden">
                <div style="float: right">
                    <Button type="primary" @click="add('addValidate')">保存</Button>
                </div>
            </div>
        </Modal>
        <Page :total="pageNum" :page-size="pageSize"  style="text-align: center;margin-top: 15px;" show-total   show-elevator  @on-change="pageChange"></Page>

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
                admin:true,
                modal1:false,
                addInner:{
                    inner:''
                },
                addValidate: {
                    inner: [
                        { required: true, message: '理由不得为空', trigger: 'blur' }
                    ]
                },
                columnsList: [
                    {
                        title: '序号',
                        width: 80,
                        render: (h, params) => {
                            return  params.index + (this.initPage- 1) * this.pageSize + 1
                        }
                    },
                    {
                        title: '店铺Logo',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('img', {
                                    attrs: {
                                        src:'http://www.chaincsa.com/viCoin/image/imageFile/'+ params.row.shoplogo
                                    },
                                    style: {
                                        width: '40px',
                                        height: '40px'
                                    }
                                }),
                            ]);
                        }
                    },
                    {
                        title: '店铺名称',
                        align: 'center',
                        key: 'shopName',
                        editable: true
                    },
                    {
                        title: '经营范围',
                        align: 'center',
                        key: 'shopAbstract',
                        editable: true
                    },
                    {
                        title: '地址',
                        align: 'center',
                        key: 'adress',
                        editable: true
                    },
                    {
                        title: '手机号',
                        align: 'center',
                        key: 'phone',
                        editable: true
                    },
                    {
                        title: '创建时间',
                        align: 'center',
                        key: 'createDate',
                        editable: true
                    },
                    {
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
                                }, '同意'), h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.jj(params)
                                        }
                                    }
                                }, '拒绝')
                            ])
                        }
                    }
                ],
                name: '',
                phone: '',
                pageSize:10,
                initPage:1,
                idstar:'',
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
                if(index == '1'){
                    _this.initPage = 1
                }
                params.append('pageNo',_this.initPage)
                params.append('search',_this.name)
                $http.post('a/login/shopApplication',params).then(function (res) {
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
            ty(res){
                let _this = this
                _this.loading = true
                let params = new URLSearchParams()
                params.append('applyId',res.row.id)
                params.append('adminid',Cookies.get('superId'))
                $http.post('a/login/shopthrough',params).then(function (res) {
                    if(res.suc){
                        _this.load()
                        _this.$Message.info('已同意!')
                    }else{
                        _this.$Message.error(res.msg)
                    }
                })
            },
            jj(res){
                let _this = this
                _this.modal1 = true
                _this.idstar = res.row.applyId
                _this.addInner.inner = ''
            },
            add(name){
                let _this = this
                _this.addInner.inner += ''
                _this.$refs[name].validate((valid) => {
                    if (valid) {
                        _this.loading = true
                        let params = new URLSearchParams()
                        params.append('applyId',_this.idstar)
                        params.append('adminid',Cookies.get('superId'))
                        params.append('reasons',_this.addInner.inner)
                        $http.post('a/login/shoprefusal',params).then(function (res) {
                            if(res.suc){
                                _this.load()
                                _this.modal1 = false
                                _this.$Message.info('已拒绝!')
                            }else{
                                _this.$Message.error(res.msg)

                            }
                        })
                    }
                })
            }
        }
    }
</script>
<style>
</style>

