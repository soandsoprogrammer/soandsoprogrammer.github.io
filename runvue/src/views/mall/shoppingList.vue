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
        <Page :total="pageNum"  style="text-align: center;margin-top: 15px;" @on-change="pageChange"></Page>
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
                pageNum:1,
                columnsList: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 80,
                        align: 'center'
                    },
                    {
                        title: '用户ID',
                        align: 'center',
                        key: 'userId',
                        editable: true
                    },
                    {
                        title: '商品介绍',
                        align: 'center',
                        width: 400,

                        key: 'presentation'
                    },
                    {
                        title: '积分单价',
                        align: 'center',
                        key: 'price',
                        editable: true
                    },
                    {
                        title: '购买数量',
                        align: 'center',
                        key: 'number',
                        editable: true
                    },
                    {
                        title: '购买消耗积分总价',
                        width:150,
                        align: 'center',
                        key: 'totalPrice',
                        editable: true
                    },
                    {
                        title: '商品编号',
                        align: 'center',
                        key: 'productId',
                        editable: true
                    },
                    {
                        title: '真实姓名',
                        align: 'center',
                        key: 'name',
                        editable: true
                    },
                    {
                        title: '电话号码',
                        align: 'center',
                        width:110,
                        key: 'phone',
                        editable: true
                    },
                    {
                        title: '收货地址',
                        align: 'center',
                        key: 'address',
                        editable: true
                    },
                    {
                        title: '邮政编码',
                        align: 'center',
                        key: 'postalCode',
                        editable: true
                    },
                    {
                        title: '订单状态',
                        align: 'center',
                        editable: true,
                        render: (h, params) => {
                            if( params.row.verson  == 0){
                                return '正常'
                            }else if(params.row.verson  == 1){
                                return '已发货'
                            }else{
                                return ''
                            }
                        }
                    }
                ],
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
                params.append('pno',_this.initPage)
                $http.post('/shopping/listOrder',params).then(function (res) {
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

