<style lang="less">
    @import '../../styles/common.less';
    @import '../tables/components/table.less';
</style>
<template>
    <div>
        <form action="" style="margin: 5px 0">
            <Input v-model="name" icon="search" placeholder="根据用户名查找" @on-click="searchName" style="width: 200px;margin-right: 3px;"></Input>
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
                        title: '提出本金数量',
                        align: 'center',
                        key: 'oreOutPrincipalNumber',
                        editable: true
                    },
                    {
                        title: '矿机剩余本金数量',
                        align: 'center',
                        key: 'orePrincipalNumber',
                        editable: true
                    },
                    {
                        title: '矿机本金锁仓数量',
                        align: 'center',
                        key: 'oreLockPrincipalNumber',
                        editable: true
                    },
                    {
                        title: '矿机本金释放数量',
                        align: 'center',
                        key: 'oreReleasePrincipalNumber',
                        editable: true
                    },
                    {
                        title: '提出时间',
                        align: 'center',
                        key: 'oreReleasePrincipalPutTime',
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
//                填写用户名搜索
                params.append('username',_this.name )
                $http.post('/backgroundOrePrincipalPutLog/findByUsername',params).then(function (res) {
                    _this.Message = res
                    _this.loading = false
                })
            },
            searchPhone(){
                let _this = this
                let params = new URLSearchParams()
                _this.loading = true
//                填写用户名搜索
                params.append('phone',_this.name )
                $http.post('/backgroundOrePrincipalPutLog/findByUsername',params).then(function (res) {
                    _this.Message = res
                    _this.loading = false
                })
            },
            load (){
                let _this = this
                let params = new URLSearchParams()
                $http.post('/backgroundTradeTour/dealLogList',params).then(function (res) {
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

