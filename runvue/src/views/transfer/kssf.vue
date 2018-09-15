<style lang="less">
    @import '../../styles/common.less';
    @import '../tables/components/table.less';
</style>
<template>
    <div>
        <!--<Form   style="height: 38px;">-->
        <!--<Input v-model="auditorUser"  placeholder="按审核人查询" style="float: left;width: 200px;margin-right: 3px;"></Input>-->
        <!--<Input v-model="userName" placeholder="按申请人查询" style="float: left;width: 200px;margin-right: 3px;"></Input>-->
        <!--<FormItem   style="width: 200px;float: left;margin-right: 3px;" >-->
        <!--<Select  v-model="auditorStatus" placeholder="请选择审核状态"  style="margin-right: 3px;">-->
        <!--<Option value="3">全部</Option>-->
        <!--<Option value="0">未审核 </Option>-->
        <!--<Option value="1">审核通过</Option>-->
        <!--<Option value="2">审核失败</Option>-->
        <!--</Select>-->
        <!--</FormItem>-->
        <!--<FormItem   style="width: 200px;float: left;margin-right: 3px;" >-->
        <!--<Select  v-model="rank"  placeholder="请选择审核级别"  style="margin-right: 3px;">-->
        <!--<Option value="0">全部</Option>-->
        <!--<Option value="1">级别一 </Option>-->
        <!--<Option value="2">级别二</Option>-->
        <!--</Select>-->
        <!--</FormItem>-->
        <!--<Button type="info" style="float: right;margin-right: 5px" @click="load">查询</Button>-->
        <!--</Form>-->
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
                auditorUser:'',
                userName:'',
                auditorStatus:'',
                rank:'',
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
                        title: '转账名称',
                        align: 'center',
                        key: 'tradeName',
                        render: (h, params) => {
                            if (params.row.tradeName == "1") {
                                return 'USD转账'
                            }else{
                                return 'AITC转账'
                            }
                        }
                    },
                    {
                        title: '转账账户',
                        align: 'center',
                        key: 'tradeUsername'
                    },
                    {
                        title: '转账用户名',
                        align: 'center',
                        key: 'tradeRealname'
                    },
                    {
                        title: '转账人手机号码',
                        align: 'center',
                        key: 'tradePhone',
                        editable: true
                    },
                    {
                        title: '收账账户',
                        align: 'center',
                        key: 'transferUsername',
                        editable: true
                    },
                    {
                        title: '转币数量',
                        align: 'center',
                        key: 'tradeCurrencyNumber',
                        editable: true
                    },
                    {
                        title: '审核状态',
                        align: 'center',
                        key: 'auditorStatus',
                        editable: true
                    },
                    {
                        title: '收账人用户名',
                        align: 'center',
                        key: 'transferRealname',
                        editable: true
                    },
                    {
                        title: '收账人手机号',
                        align: 'center',
                        key: 'transferPhone',
                        editable: true
                    },
                    {
                        title: '交易时间',
                        align: 'center',
                        key: 'trdingTime',
                        editable: true
                    }
                ],
                name: '',
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
                params.append('page',_this.initPage)
                params.append('id','10')
                $http.post('/backgroundTransfer/findByTransfer',params).then(function (res) {
                    _this.Message = res.result.rows
                    _this.loading = false
                    _this.pageNum = res.result.total
                    console.log(res)
                })
            }
        }
    }
</script>
<style>
    .ivu-form-item {
        margin-bottom: 5px;
    }
</style>

