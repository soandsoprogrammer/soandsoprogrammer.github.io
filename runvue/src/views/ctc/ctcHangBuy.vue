<style lang="less">
    @import '../../styles/common.less';
    @import '../tables/components/table.less';
</style>
<template>
    <div>
        <Form  :label-width="100" style="height: 38px;">
            <Input v-model="tradeId"   placeholder="根据挂单ID查询"  style="float: left;width: 200px;margin-right: 3px;"></Input>
            <Input v-model="userPhone"   placeholder="根据用户手机号查询"  style="float: left;width: 200px;margin-right: 3px;"></Input>
            <FormItem label="订单状态" style="width: 300px;float: left" >
                <Select  v-model="state" style="margin-right: 3px;">
                    <Option value="0">全部</Option>
                    <Option value="挂买">挂买 </Option>
                    <Option value="挂卖">挂卖</Option>
                </Select>
            </FormItem>
            <FormItem label="挂单状态" style="width: 300px;float: left" >
                <Select  v-model="buyPerhapsSell" style="margin-right: 3px;">
                    <Option value="0">全部</Option>
                    <Option value="挂买">挂买 </Option>
                    <Option value="挂卖">挂卖</Option>
                </Select>
            </FormItem>
            <Button type="info" style="float: right;margin-right: 5px" @click="load">查询</Button>
        </Form>
        <Table :loading="loading" refs="table1"  :data="Message" :columns="columnsList"></Table>
        <Page :total="pageNum" :page-size="pageSize"  style="text-align: center;margin-top: 15px;"  @on-change="pageChange"></Page>
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
                tradeId:'',
                userPhone:'',
                state:'',
                buyPerhapsSell:'',
                admin:true,
                columnsList: [
                    {
                        title: '序号',
                        width: 80,
                        render: (h, params) => {
                            return  params.index + (this.initPage- 1) * this.pageSize + 1
                        }
                    },
                    {
                        title: '用户名',
                        align: 'center',
                        key: 'userName',
                        editable: true
                    },
                    {
                        title: '价格',
                        align: 'center',
                        key: 'price',
                        editable: true
                    },
                    {
                        title: '数量',
                        align: 'center',
                        key: 'number',
                        editable: true
                    },
                    {
                        title: '总价',
                        align: 'center',
                        key: 'total',
                        editable: true
                    },
                    {
                        title: '交易类型',
                        align: 'center',
                        key: 'buyPerhapsSell',
                        render: (h, params) => {
                            if(params.row.buyPerhapsSell == 'buy'){
                                return  '买'
                            }else{
                                return  '卖'
                            }
                        }
                    },
                    {
                        title: '微信',
                        align: 'center',
                        key: 'wechat',
                        editable: true
                    },
                    {
                        title: '创建时间',
                        align: 'center',
                        key: 'createDate',
                        editable: true
                    }

                ],
                name: '',
                pageNum:0,
                pageSize:10,
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
                console.log(_this.name)
                params.append('pageNo',_this.initPage)
                params.append('pageNo',_this.tradeId)
                params.append('pageNo',_this.userPhone)
                params.append('pageNo',_this.state)
                params.append('pageNo',_this.buyPerhapsSell)

                $http.post('/a/otc/findOtcTradePage',params).then(function (res) {
                    _this.Message = res.data.content
                    _this.loading = false
//                    _this.pageNum = res.result.totalRow
                    console.log( _this.Message)
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

