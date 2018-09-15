<style lang="less">
    @import '../../styles/common.less';
    @import '../tables/components/table.less';
</style>
<template>
    <div>
        <Form   style="height: 38px;">
            <Input v-model="auditorUser"  placeholder="按审核人查询" style="float: left;width: 200px;margin-right: 3px;"></Input>
            <Input v-model="userName" placeholder="按申请人查询" style="float: left;width: 200px;margin-right: 3px;"></Input>
            <FormItem   style="width: 200px;float: left;margin-right: 3px;" >
                <Select  v-model="auditorStatus" placeholder="请选择审核状态"  style="margin-right: 3px;">
                    <Option value="3">全部</Option>
                    <Option value="0">未审核 </Option>
                    <Option value="1">审核通过</Option>
                    <Option value="2">审核失败</Option>
                </Select>
            </FormItem>
            <FormItem   style="width: 200px;float: left;margin-right: 3px;" >
                <Select  v-model="rank"  placeholder="请选择审核级别"  style="margin-right: 3px;">
                    <Option value="0">全部</Option>
                    <Option value="1">级别一 </Option>
                    <Option value="2">级别二</Option>
                </Select>
            </FormItem>
            <Button type="info" style="float: right;margin-right: 5px" @click="load(1)">查询</Button>
        </Form>
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
                        render: (h, params) => {
                            return  params.index + (this.initPage- 1) * this.pageSize + 1
                        }
                    },
                    {
                        title: '买家名',
                        align: 'center',
                        key: 'buyerName',
                        width:'auto',
                        editable: true
                    },
                    {
                        title: '买家手机',
                        align: 'center',
                        key: 'buyerTelephone'
                    },
                    {
                        title: '卖家名',
                        align: 'center',
                        width:'auto',
                        key: 'sellerName'
                    },
                    {
                        title: '卖家手机',
                        align: 'center',
                        key: 'sellerTelephone'
                    },
                    {
                        title: '币种',
                        align: 'center',
                        key: 'currency'
                    },
                    {
                        title: '数量',
                        align: 'center',
                        key: 'sellerId',
                        width:'auto',
                        editable: true
                    },
                    {
                        title: '售价',
                        align: 'center',
                        key: 'price',
                        width:'auto',
                        editable: true
                    },
                    {
                        title: '总价',
                        align: 'center',
                        key: 'totalPrice',
                        width:'auto',
                        editable: true
                    },
                    {
                        title: '支付方式',
                        align: 'center',
                        key: 'payMethod',
                        width:'auto',
                        editable: true
                    },
                    {
                        title: '申诉时间',
                        align: 'center',
                        render: (h, params) => {
                            if(params.row.appealTime){
                                return params.row.appealTime.replace(/\T/g, ' ').substring(0,19)
                            }else{
                                return ''
                            }
                        }
                    },
                    {
                        title: '订单状态',
                        align: 'center',
                        key: 'orderStatus',
                        width:'auto',
                        editable: true
                    },
                    {
                        title: '备注',
                        align: 'center',
                        key: 'remark',
                        width:'auto',
                        editable: true
                    },
                    {
                        title: '操作',
                        align: 'center',
                        width:'auto',
                        render: (h, params) => {
//                            if (params.row.auditorStatus == "未审核") {
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
                                                this.$router.push({
                                                    name: 'CTCFreezeInner',
                                                    params:params
                                                });
                                            }
                                        }
                                    }, '编辑')
                                ]);
                            }
//                        }
                    }
                ],
                name: '',
                pageNum:0,
                pagesize:'',
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
            load (index){
                let _this = this
                let params = new URLSearchParams()
                if(index == '1'){
                    _this.initPage = 1
                }
                params.append('pno',_this.initPage)
                params.append('status','冻结中')
                $http.post('/order/listAllOrder',params).then(function (res) {
                    if(res.status  == '0'){
                        _this.$Message.info(res.message)
                    }else{
                        console.log(res)
                        _this.Message = res.data.currentPageData
                        _this.pagesize = res.data.total_sum

                    }
                    _this.loading = false
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

