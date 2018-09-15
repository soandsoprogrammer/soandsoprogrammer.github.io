<style lang="less">
    @import '../../styles/common.less';
    @import '../tables/components/table.less';
</style>
<template>
    <div>
        <Form   style="height: 38px;">
            <FormItem   style="width: 200px;float: left;margin-right: 3px;" >
                <Select  v-model="auditorStatus" placeholder="请选择审核状态"  style="margin-right: 3px;">
                    <Option value="0">审核列表</Option>
                    <Option value="1">拒绝列表</Option>
                </Select>
            </FormItem>
            <Button type="info" style="float: right;margin-right: 5px" @click="load(1)">查询</Button>
        </Form>
        <Table :loading="loading" refs="table1"  :data="Message" :columns="columnsList"></Table>
        <!--<Page :total="pageNum" :page-size="10"  style="text-align: center;margin-top: 15px;"  @on-change="pageChange"></Page>-->
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
//                        render: (h, params) => {
//                            return  params.index + (this.initPage- 1) * this.pageSize + 1
//                        }
                    },
                    {
                        title: '申请人用户名',
                        align: 'center',
                        width:'auto',
                        key: 'username'
                    },
                    {
                        title: '申请人真实姓名',
                        align: 'center',
                        key: 'userRealName'
                    },
                    {
                        title: '申请人手机号',
                        align: 'center',
                        key: 'phone'
                    },
                    {
                        title: '申请人国籍',
                        align: 'center',
                        key: 'country',
                        width:'auto',
                        editable: true
                    },
                    {
                        title: '审核状态',
                        align: 'center',
                        key: 'status',
                        width:'auto',
                        editable: true
                    },
                    {
                        title: '注册时间',
                        align: 'center',
                        render: (h, params) => {
                            if(params.row.created){
                                return params.row.created.replace(/\T/g, ' ').substring(0,19)
                            }else{
                                return ''
                            }
                        }
                    },
                    {
                        title: '提交时间',
                        align: 'center',
                        width:'auto',
                        render: (h, params) => {
                            if(params.row.update){
                                return params.row.update.replace(/\T/g, ' ').substring(0,19)
                            }else{
                                return ''
                            }
                        }
                    },
                    {
                        title: '操作',
                        align: 'center',
                        width:'auto',
                        render: (h, params) => {
                            if (params.row.status == "正在审核") {
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
                                                    name: 'identityInner',
                                                    params:params
                                                });
                                            }
                                        }
                                    }, '审核')
                                ]);
                            }else{
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'success',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.$router.push({
                                                    name: 'identityInner',
                                                    params:params
                                                });
                                            }
                                        }
                                    }, '查看')
                                ]);
                            }
                        }
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
                params.append('token',10)
                if(_this.auditorStatus == '0'){
                    params.append('status','审核')
                }else if(_this.auditorStatus == ''){
                    params.append('status','审核')
                }else{
                    params.append('status','拒绝')
                }
                $http.post('/userControl/queryAllUser',params).then(function (res) {
                    if(res.status == '0'){
                        _this.$Message.info(res.message)
                        _this.Message = []
                    }else{
                        _this.Message = res.data
                    }
                    _this.loading = false
//                    _this.pageNum = res.result.totalRow
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

