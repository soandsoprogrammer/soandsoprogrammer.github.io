<style lang="less">
    @import '../../styles/common.less';
    @import '../tables/components/table.less';
</style>
<template>
    <div>
        <form action="" style="margin: 5px 0">
            <Input v-model="name" icon="search"  placeholder="根据用户名查找" @on-click="searchName" style="width: 200px;margin-right: 3px;"></Input>
            <Input v-model="phone" icon="search" placeholder="根据手机号查找" @on-click="searchPhone" style="width: 200px"></Input>
        </form>
        <Table :loading="loading" refs="table1"  :data="Message" :columns="columnsList"></Table>
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
                phone: ''
            }
        },
        created: function () {
            this.load()
        },
        methods: {
            handleDel (val, index) {
                this.$Message.success('删除了第' + (index + 1) + '行数据');
            },
            searchName(){
                let _this = this
                let params = new URLSearchParams()
                _this.loading = true
                if(_this.name) {
                    params.append('username', _this.name)
                    $http.post('/backgroundTransfer/findByUsername', params).then(function (res) {
                        _this.Message = res
                        _this.loading = false
                    })
                }else{
                    _this.load()
                }
            },
            searchPhone(){
                let _this = this
                let params = new URLSearchParams()
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
                let _this = this
                let params = new URLSearchParams()
                $http.post('/backgroundTransferCotroller/findAllBackgroundTransfer',params).then(function (res) {
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

