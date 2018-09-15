<style lang="less">
    @import '../../styles/common.less';
    @import '../tables/components/table.less';
</style>
<template>
    <div>
        <form action="" style="margin: 5px 0">
            <Input v-model="name"  placeholder="根据用户名查找" style="width: 200px;margin-right: 3px;"></Input>
            <Input v-model="phone" placeholder="根据手机号查找" style="width: 200px"></Input>
            <Button type="info" style="float: right;margin-right: 5px" @click="load">搜索</Button>
        </form>
        <Table :loading="loading" refs="table1"  :data="Message" :columns="columnsList"></Table>
        <Page :total="pageNum" :page-size="10"  style="text-align: center;margin-top: 15px;"  @on-change="pageChange"></Page>
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
                        title: '用户名',
                        align: 'center',
                        key: 'username',
                        editable: true
                    },
                    {
                        title: '用户姓名',
                        align: 'center',
                        key: 'userRealName'
                    },
                    {
                        title: '手机号',
                        align: 'center',
                        key: 'phone',
                        editable: true
                    },
                    {
                        title: 'ETH数量',
                        align: 'center',
                        key: 'ethNumber',
                        editable: true
                    },
                    {
                        title: '兑换USD数量',
                        align: 'center',
                        key: 'exchangeUsdNumber',
                        editable: true
                    },
                    {
                        title: '打款钱包',
                        align: 'center',
                        key: 'moneyPurseAddress',
                        editable: true
                    },
                    {
                        title: '状态',
                        align: 'center',
                        key: 'status',
                        editable: true
                    },
                    {
                        title: '兑换时间',
                        align: 'center',
                        key: 'exchangTime',
                        editable: true
                    }
                ],
                name: '',
                phone: '',
                pageNum:0,
                initPage:1
            }
        },
        created: function () {
            this.load()
        },
        methods: {
            pageChange(index){
                this.initPage = index
                this.load ()
            },
            load (){
                let _this = this
                let params = new URLSearchParams()
                params.append('backTransferId','18')
                params.append('page',_this.initPage)
                $http.post('/backgroundExchangeUsd/intoPlatform',params).then(function (res) {
                    _this.Message = res
                    _this.loading = false
                    console.log(_this.Message)
                })
            }
        }
    }
</script>
<style>
</style>

