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
        <Page :total="pageNum" :page-size="10" style="text-align: center;margin-top: 15px;"  @on-change="pageChange"></Page>

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
                        key: 'idName'
                    },
                    {
                        title: '手机号',
                        align: 'center',
                        key: 'phone',
                        editable: true
                    },
                    {
                        title: '兑换商城积分',
                        align: 'center',
                        key: 'duiHuanIntegral',
                        editable: true
                    },
                    {
                        title: '消耗动态收益',
                        align: 'center',
                        key: 'extractEarning',
                        editable: true
                    },
                    {
                        title: '剩余可兑换动态收益',
                        align: 'center',
                        key: 'shenYuFreeDynamicEarning',
                        editable: true
                    },
                    {
                        title: '兑换时间',
                        align: 'center',
                        key: 'updateTime',
                        editable: true
                    }
                ],
                name: '',
                phone: '',
                pageNum:1
            }
        },
        created: function () {
            this.load()
        },
        methods: {
            load (){
                let _this = this
                let params = new URLSearchParams()
                params.append('userName',_this.name)
                params.append('phone',_this.phone)
                params.append('page',_this.pageNum)
                $http.post('/oreAllModules/selectOreUserEarningLogInfoPage',params).then(function (res) {
                    _this.Message = res.result.list
                    _this.pageNum = res.result.totalRow
                    _this.loading = false
                })
            },
            pageChange(index){
                this.pageNum = index
                this.load ()
            }
        }
    }
</script>
<style>
</style>

