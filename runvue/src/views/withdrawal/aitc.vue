<style lang="less">
    @import '../../styles/common.less';
    @import '../tables/components/table.less';
</style>
<template>
    <div>
        <Form style="margin: 5px 0;height: 40px;">
            <FormItem  style="width: 200px;display: inline-block;margin-right: 3px;" >
                <Select  v-model="name" placeholder="请选择状态"  style="margin-right: 3px;">
                    <Option value="0">全部</Option>
                    <Option value="1">已放币</Option>
                    <Option value="2">已拒绝</Option>
                    <Option value="3">已完成</Option>

                </Select>
            </FormItem>
            <Button type="info" style="float: right;margin-right: 5px" @click="load(1)">查询</Button>
        </Form>
        <Table :loading="loading" refs="table1"  :data="Message" :columns="columnsList"></Table>
        <Page :total="pageNum" :page-size="pagesize"  style="text-align: center;margin-top: 15px;"  @on-change="pageChange"></Page>

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
                pagesize:10,
                columnsList: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 80,
                        render: (h, params) => {
                            return  params.index + (this.initPage- 1) * this.pagesize + 1
                        }
                    },
                    {
                        title: '用户名',
                        align: 'center',
                        key: 'username',
                        editable: true
                    },
                    {
                        title: '手机号',
                        align: 'center',
                        key: 'phone'
                    },
                    {
                        title: '币种名称',
                        align: 'center',
                        key: 'currency',
                        editable: true
                    },
                    {
                        title: '数量',
                        align: 'center',
                        key: 'amount',
                        editable: true
                    },
                    {
                        title: '创建时间',
                        align: 'center',
                        key: 'createdate',
                        render: (h, params) => {
                            if(params.row.createdate){
                                return params.row.createdate.replace(/\T/g, ' ').substring(0,19)
                            }else{
                                return ''
                            }
                        }
                    },
                    {
                        title: '审核时间',
                        align: 'center',
                        key: 'dealdate',
                        render: (h, params) => {
                            if(params.row.dealdate){
                                return params.row.dealdate.replace(/\T/g, ' ').substring(0,19)
                            }else{
                                return ''
                            }
                        }
                    },
                    {
                        title: '审核状态',
                        align: 'center',
                        key: 'status'
                    }
                ],
                name:'0',
                phone: '',
                pageNum:0,
                initPage:1
            }
        },
        created: function () {
            this.load()
        },
        methods: {
            handleDel (val, index) {
                this.$Message.success('删除了第' + (index + 1) + '行数据');
            },
            load (index){
                let _this = this
                let params = new URLSearchParams()
                if(index == '1'){
                    _this.initPage = 1
                }
                params.append('pno',_this.initPage)
                if(_this.name == '0'){
                    params.append('str','')
                }else if(_this.name == '1'){
                    params.append('str','已放币')
                }else if(_this.name == '2'){
                    params.append('str','已拒绝')
                }else{
                    params.append('str','已完成')
                }
                $http.post('/adminLegalTender/listRolOutPage',params).then(function (res) {
                    if(res.status == '1'){
                        _this.Message = res.data.instanceList
                        _this.pageNum = res.data.total_sum
                        _this.pagesize = res.data.size
                    }else{
                        _this.$Message.error(res.message)
                    }
                    _this.loading = false
                })
            },
            pageChange(index){
                this.initPage = index
                this.load ()
            }
        }
    }
</script>
<style>
</style>

