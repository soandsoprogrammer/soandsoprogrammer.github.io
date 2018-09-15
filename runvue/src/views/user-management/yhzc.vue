<style lang="less">
    @import '../../styles/common.less';
    @import '../tables/components/table.less';
</style>
<template>
    <div>
        <form action="" style="margin: 5px 0">
            <Input v-model="name"   placeholder="根据用户名"  style="width: 200px;margin-right: 3px;"></Input>
            <Button type="primary"  style="float: right;margin-right: 5px" @click="load(1)">查询</Button>
        </form>
        <Table :loading="loading" refs="table1" @on-selection-change="changeNum"  :data="Message" :columns="columnsList"></Table>

        <Page :total="pageNum" :page-size="pageSize"  style="text-align: center;margin-top: 15px;" show-total   show-elevator  @on-change="pageChange"></Page>
        <Modal
                v-model="modal1"
                title="修改"
        >
            <Form ref="formValidate" :model="changeInner"  :rules="ruleValidate" :label-width="120">
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem label="交易所CSA余额" prop="csaBalane">
                            <Input v-model="changeInner.csaBalane"   style="margin-right: 3px;"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="交易所ETH余额" prop="csaEthBalane">
                        <Input v-model="changeInner.csaEthBalane"   style="margin-right: 3px;"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                    <FormItem label="交易所USDT余额" prop="usdibalane">
                        <Input v-model="changeInner.usdibalane"   style="margin-right: 3px;"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="积分" prop="integral">
                        <Input v-model="changeInner.integral"   style="margin-right: 3px;"></Input>
                    </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="xginner('formValidate')">保存</Button>
            </div>
        </Modal>

    </div>
</template>
<script>
    import $http from '../../utils/axiosWrap'
    import canEditTable from '../tables/components/canEditTable.vue'
    import Cookies from 'js-cookie'


    export default {
        data() {
            return {
                loading: true,
                Message:[],
                admin:true,
                modal1:false,
                changeInner:{},
                pageSize:10,
                ruleValidate: {
                    csaBalane: [
                        { required: true, message: '交易所CSA余额为空', trigger: 'blur' }
                    ],
                    csaEthBalane: [
                        { required: true, message: '交易所ETH余额为空', trigger: 'blur' }
                    ],
                    usdibalane: [
                        { required: true, message: '交易所USDT余额为空', trigger: 'blur' }
                    ],
                    integral: [
                        { required: true, message: '积分为空', trigger: 'blur' }
                    ]
                },
                columnsList: [
                    {
                        title: '序号',
                        width: 80,
                        align: 'center',
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
                        title: '交易所CSA余额',
                        align: 'center',
                        key: 'csaBalane',
                        editable: true
                    },
                    {
                        title: '交易所ETH余额',
                        align: 'center',
                        key: 'csaEthBalane',
                        editable: true
                    },
                    {
                        title: '交易所USDT余额',
                        align: 'center',
                        key: 'usdibalane'
                    },
                    {
                        title: '积分',
                        align: 'center',
                        key: 'integral',
                        editable: true
                    },
                    {
                        title: '操作',
                        align: 'center',
                        width: 80,
                        render: (h, params) => {
                            if(this.admin){
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
                                                this.info(params)
                                            }
                                        }
                                    }, '修改')
                                ]);
                            }
                        }
                    }
                ],
                name: '',
                phone: '',
                pageNum:1,
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
                params.append('pageNo',_this.initPage)
                params.append('search',_this.name)
                $http.post('a/login/Assets',params).then(function (res) {
                    if(res.suc){
                        _this.pageNum = res.result.totalElements
                        _this.Message =  res.result.content
                        _this.loading = false
                    }else{
                        _this.$Message.error(res.msg)
                    }

                })
            },
            changeNum (val){
                console.log(val)
            },
            info(val){
                let _this = this
                _this.modal1 = true
                _this.changeInner = val.row
            },
            xginner(name){
                let _this = this
                _this.changeInner.csaBalane += ''
                _this.changeInner.ethBalane += ''
                _this.changeInner.usdibalane += ''
                _this.changeInner.integral += ''
                _this.$refs[name].validate((valid) => {
                    alert(2)
                    if (valid) {
                        let params = new URLSearchParams()
                        params.append('userid',_this.changeInner.userId)
                        params.append('csaBalane',_this.changeInner.csaBalane)
                        params.append('adminid',Cookies.get('superId'))
                        params.append('ethBalane',_this.changeInner.ethBalane)
                        params.append('uSDIBalane',_this.changeInner.usdibalane)
                        params.append('integral',_this.changeInner.integral)
                        $http.post('a/login/updateAssets',params).then(function (res) {
                            if (res.suc) {
                                _this.$Message.info('信息修改成功!')
                                _this.modal1 = false
                                _this.load()
                            }else{
                                _this.$Message.error('信息修改失败!')
                            }
                        }).then(function (res) {
                            console.log(res)
                        })
                    } else {
                        _this.$Message.error('信息修改失败!')
                    }
                })

            },
        }
    }
</script>
<style>
    .userListInfo{
        display: inline-block;
        width: 80px;
    }
    .userListInfoWrap p{
        line-height: 20px;
    }
    tr{
        line-height: 24px;
    }
    td,th{
        text-align: center !important;
        width: 80px;
    }
</style>

