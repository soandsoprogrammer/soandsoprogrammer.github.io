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
        <Table :loading="loading" refs="table1"  :data="Message" :columns="columnsList"></Table>
        <Page :total="pageNum" :page-size="pageSize"  style="text-align: center;margin-top: 15px;"  @on-change="pageChange"></Page>

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
                columnsList: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 80,
                        render: (h, params) => {
                            return  params.index + (this.initPage- 1) * this.pageSize + 1
                        }
                    },
                    {
                        title: '用户名',
                        align: 'center',
                        key: 'username',
                        editable: true
                    },
                    {
                        title: '手机号',
                        align: 'center',
                        key: 'phone'
                    },
                    {
                        title: '币种名称',
                        align: 'center',
                        key: 'currency',
                        editable: true
                    },
                    {
                        title: '数量',
                        align: 'center',
                        key: 'amount',
                        editable: true
                    },
                    {
                        title: '创建时间',
                        align: 'center',
                        key: 'createdate',
                        editable: true
                    },
                    {
                        title: '审核时间',
                        align: 'center',
                        key: 'dealdate',
                        editable: true
                    },
                    {
                        title: '审核状态',
                        align: 'center',
                        key: 'status'
                    },
                    {
                        title: '操作',
                        align: 'center',
                        render: (h, params) => {
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
                                                this.ty(params)
                                            }
                                        }
                                    }, '同意'),
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
                                                this.jj(params)
                                            }
                                        }
                                    }, '拒绝')
                                ]);
                        }
                    }
                ],
                name: '',
                phone: '',
                pageNum:0,
                pageSize:10,
                initPage:1
            }
        },
        created: function () {
            this.load()
        },
        methods: {
            load (){
                let _this = this
                let params = new URLSearchParams()
                params.append('page',_this.initPage)
                params.append('str','正在审核')
                $http.post('/adminLegalTender/listRolOutPage',params).then(function (res) {
                    if(res.status == '1'){
                        _this.Message = res.data.instanceList
                    }else{
                        _this.$Message.error(res.message)
                    }
                    _this.loading = false
//                    _this.pageNum = res.result.total
                })
            },
            pageChange(index){
                this.initPage = index
                this.load ()
            },
            ty(index){
                let _this = this
                let params = new URLSearchParams()
                _this.loading = true
                params.append('wid', index.row.id)
                $http.post('/ctc/acceptWithdraw',params).then(function (res) {
                    console.log(res)
                    if(res.status == '1'){
                        _this.$Message.info('已同意!')
                        _this.load()
                    }else{
                        _this.$Message.error('操作失败!')
                    }
                    _this.loading = false
                })
            },
            jj(index){
                let _this = this
                _this.loading = true
                let params = new URLSearchParams()
                params.append('wid',index.row.id)
                $http.post('/ctc/rejectWithdraw',params).then(function (res) {
                    if(res.status == '1'){
                        _this.$Message.info('已拒绝!')
                        _this.load()
                    }else{
                        _this.$Message.error('操作失败!')
                    }
                    _this.loading = false

                })
            }
        }
    }
</script>
<style>
</style>

