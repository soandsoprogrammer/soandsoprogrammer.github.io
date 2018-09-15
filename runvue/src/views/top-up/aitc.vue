<style lang="less">
    @import '../../styles/common.less';
    @import '../tables/components/table.less';
</style>
<template>
    <div>
        <form action="" style="margin: 5px 0">
            <Input v-model="name"  placeholder="根据用户名查找" style="width: 200px;margin-right: 3px;"></Input>
            <Input v-model="phone" placeholder="根据手机号查找" style="width: 200px"></Input>
            <Button type="info" style="float: right;margin-right: 5px" @click="search">搜索</Button>
        </form>
        <Table :loading="loading" :data="Message" :columns="columnsList"></Table>
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
                userListInner:{},
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
                        title: 'AITC数量',
                        align: 'center',
                        key: 'aitcNumber',
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
                        title: '时间',
                        align: 'center',
                        key: 'intoLockAccountTime',
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
            search (){
                let _this = this
                let params = new URLSearchParams()
                _this.loading = true
//                填写用户名搜索
                if(_this.name){
                    params.append('username',_this.name )
                    $http.post('/backgroundIntoLockAccount/findByUsername',params).then(function (res) {
                        _this.Message = res
                        _this.loading = false
                    })
                    return false
//                    填写手机号搜索
                }
                if(_this.phone){
                    params.append('phone',_this.phone )
                    $http.post('/backgroundIntoLockAccount/findByPhone',params).then(function (res) {
                        _this.Message = res
                        _this.loading = false
                    })
                    return false
//                    全部填写搜索
                }
            },
            load (){
                let _this = this
                let params = new URLSearchParams()
                $http.post('/backgroundIntoLockAccount/findAll',params).then(function (res) {
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

