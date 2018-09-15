<style lang="less">
    @import '../../styles/common.less';
    @import '../tables/components/table.less';
</style>
<template>
    <div>
        <form action="" style="margin: 5px 0">
            <!--<Input v-model="name" icon="search"  placeholder="根据用户名查找" @on-click="searchName" style="width: 200px;margin-right: 3px;"></Input>-->
            <!--<Input v-model="phone" icon="search" placeholder="根据手机号查找" @on-click="searchPhone" style="width: 200px"></Input>-->
        </form>
        <Table :loading="loading" refs="table1"  :data="Message" :columns="columnsList"></Table>
        <Page :total="100" style="text-align: center;margin-top: 15px;"  @on-change="pageChange"></Page>
    </div>
</template>
<script>
    import $http from '../../utils/axiosWrap'
    import canEditTable from '../tables/components/canEditTable.vue'
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
                        align: 'center'
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
                                                this.info(params)
                                            }
                                        }
                                    }, '删除')
                                ]);
                            }
                        }
                    }
                ],
                initPage:1
            }
        },
        created: function () {
            this.load()
            console.log(this.$route.query)
        },
        methods: {
            searchPhone(){
                let _this = this
                let params = new URLSearchParams()
                params = _this.$route.query
                _this.loading = true
                if(_this.phone) {
                    params.append('phone',_this.phone )
                    $http.post('/backgroundTransfer/findByPhone',params).then(function (res) {
                        _this.Message = res
                        _this.loading = false
                    })
                }else{
                    _this.load()
                }
            },
            load (){
//                let _this = this
//                let params = new URLSearchParams()
//                params.append('pno',_this.initPage)
//                $http.post('/shopping/listShopping',params).then(function (res) {
//                    _this.Message = res.result.list
//                    _this.loading = false
//                    console.log(res)
//                })
            },
            pageChange(index){
                this.initPage = index
                this.load ()
            },
            info(index){
                console.log(index)
            },
            change(index){
                console.log(index)
            }
        }
    }
</script>
<style>
</style>

