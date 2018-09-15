<style lang="less">
    @import '../../styles/common.less';
    @import '../tables/components/table.less';
</style>
<template>
    <div>
        <form action="" style="margin: 5px 0">
            <Input v-model="name"   placeholder="根据用户名"  style="width: 200px;margin-right: 3px;"></Input>
            <Button type="success"  style="float: right;margin-right: 5px" @click="adds">添加合伙人</Button>

            <Button type="primary"  style="float: right;margin-right: 5px" @click="load(1)">查询</Button>
        </form>
        <Table :loading="loading" refs="table1" @on-selection-change="changeNum"  :data="Message" :columns="columnsList"></Table>
        <Page :total="pageNum" :page-size="pageSize"  style="text-align: center;margin-top: 15px;" show-total   show-elevator  @on-change="pageChange"></Page>
        <Modal
                v-model="modal1"
                class="userListInfoWrap"
                title="用户详情"
                @on-ok="ok"
                @on-cancel="cancel">
            <div style="overflow: hidden">
                <p><span class="userListInfo">用户名:</span><span v-text="userListInner.name"></span></p>
                <p><span class="userListInfo">手机号:</span><span v-text="userListInner.phone"></span></p>
                <p><span class="userListInfo">登录密码:</span><span v-text="userListInner.password"></span></p>
                <p><span class="userListInfo">身份证号:</span><span v-text="userListInner.idnumber"></span></p>
                <p><span class="userListInfo">推荐人:</span><span v-text="userListInner.referee"></span></p>
                <p><span class="userListInfo">钱包地址:</span><span v-text="userListInner.purseAddress"></span></p>
                <p><span class="userListInfo">邀请码:</span><span v-text="userListInner.codes"></span></p>
                <p><span class="userListInfo" style="float: left">矿机数量:</span>
                <table class="ivu-table" style="float: left" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                        <th>总数</th>
                        <th>V1</th>
                        <th>V2</th>
                        <th>V3</th>
                        <th>V4</th>
                    </tr>
                    <tr>
                        <td>{{userListInner.mynum}}</td>
                        <td>{{userListInner.v1}}</td>
                        <td>{{userListInner.v2}}</td>
                        <td>{{userListInner.v3}}</td>
                        <td>{{userListInner.v4}}</td>
                    </tr>
                </table>
                </p>
                <p><span class="userListInfo" style="float: left">团队矿机数量:</span>
                <table class="ivu-table" style="float: left" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                        <th>总数</th>
                        <th>V1</th>
                        <th>V2</th>
                        <th>V3</th>
                        <th>V4</th>
                    </tr>
                    <tr>
                        <td>{{userListInner.num}}</td>
                        <td>{{userListInner.V1num}}</td>
                        <td>{{userListInner.V2num}}</td>
                        <td>{{userListInner.V3num}}</td>
                        <td>{{userListInner.V4num}}</td>
                    </tr>
                </table>
                </p>
            </div>

        </Modal>
        <Modal
                v-model="modal2"
                title="创建新合伙人"
        >
            <Form ref="Validate" :model="addInner" :rules="addValidate"  :label-width="100">
                <Row :gutter="16">
                    <Col span="12">
                    <FormItem label="名称:" prop="sysEnglishName">
                        <Input v-model="addInner.sysEnglishName"   style="margin-right: 3px;"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="手机号:" prop="sysUserPhone">
                        <Input v-model="addInner.sysUserPhone"   style="margin-right: 3px;"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                    <FormItem label="密码:" prop="password">
                        <Input v-model="addInner.password"   style="margin-right: 3px;"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="身份证号:" prop="sysUserAuthorityType">
                        <Input v-model="addInner.sysUserAuthorityType"   style="margin-right: 3px;"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                    <FormItem label="推荐邀请码:" prop="tjCode">
                        <Input v-model="addInner.tjCode"   style="margin-right: 3px;"></Input>
                    </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="add('Validate')" :loading="asd">保存</Button>
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
                modal2:false,
                userListInner:{},
                pageSize:10,
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
                        key: 'name',
                        editable: true
                    },
                    {
                        title: '手机号码',
                        align: 'center',
                        key: 'phone',
                        editable: true
                    },
                    {
                        title: '身份证号',
                        align: 'center',
                        key: 'idnumber',
                        editable: true
                    },
                    {
                        title: '实体店铺',
                        align: 'center',
                        key: 'shop'
                    },
                    {
                        title: '推荐人',
                        align: 'center',
                        key: 'referee',
                        editable: true
                    },
                    {
                        title: '矿机数量',
                        align: 'center',
                        key: 'myminer',
                        editable: true
                    },
                    {
                        title: '团队矿机总量',
                        align: 'center',
                        key: 'lowerNumber',
                        editable: true
                    },
                    {
                        title: '邀请码',
                        align: 'center',
                        key: 'invitationCode',
                        editable: true
                    },
                    {
                        title: '开通时间',
                        align: 'center',
                        key: 'createTime',
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
                                    }, '查看')
                                ]);
                            }
                        }
                    }
                ],
                addInner:{
                    sysEnglishName:'',
                    sysUserPhone:'',
                    sysUserAuthorityType:'',
                    password:'',
                    tjCode:''
                },
                addValidate: {
                    sysEnglishName: [
                        { required: true, message: '管理员名不得为空', trigger: 'blur' }
                    ],
                    sysUserPhone: [
                        { required: true, message: '管理员手机号不得为空', trigger: 'blur' }
                    ],
                    sysUserAuthorityType: [
                        { required: true, message: '管理员身份证不得为空', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '管理员密码不得为空', trigger: 'blur' }
                    ],
                    tjCode: [
                        { required: true, message: '推荐码不得为空', trigger: 'blur' }

                    ]
                },
                name: '',
                phone: '',
                pageNum:1,
                asd:false,
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
                $http.post('a/login/ergodicPartners',params).then(function (res) {
                    console.log(res)
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
                let params = new URLSearchParams()
                _this.loading = true
                params.append('id',val.row.id)
                $http.post('a/login/Partnersdetails',params).then(function (res) {
                    console.log(res)
                    if(res.suc){
                        _this.loading = false
                        _this.userListInner = res.result
                        _this.modal1 = true
                    }else{
                        _this.$Message.error(res.msg)
                    }
                })
                console.log(_this.userListInner)
            },
            change(val){
                this.modal1 = true
                console.log(val)
            },
            adds(){

                var _this = this
                if(_this.pageNum > 198){
                    _this.$Message.info('城市合伙人最大人数为199')
                }else{
                    _this.modal2 = true
                    _this.addInner.sysEnglishName = ''
                    _this.addInner.sysUserPhone = ''
                    _this.addInner.tjCode = ''
                    _this.addInner.password = ''
                    _this.addInner.sysUserAuthorityType = ''
                }
            },
            add(name){
                var _this = this
                _this.$refs[name].validate((valid) => {
                    if (valid) {
                        _this.asd = true
                        let params = new URLSearchParams()
                        params.append('adminid', Cookies.get('superId'))
                        params.append('name', _this.addInner.sysEnglishName)
                        params.append('phone', _this.addInner.sysUserPhone)
                        params.append('superCodes', _this.addInner.tjCode)
                        params.append('password', _this.addInner.password)
                        params.append('idnumber', _this.addInner.sysUserAuthorityType)
                        $http.post('a/login/savePartners', params).then(function (res) {
                            console.log(res)
                            if (res.suc) {
                                _this.userListInner = res.result
                                _this.modal2 = false
                                _this.$Message.info('添加成功')

                                _this.load(1)
                            } else {
                                _this.$Message.error(res.msg)
                            }
                            _this.asd = false
                        })
                    }
                })
            },
            remove(val){
                console.log(val)
            },
            ok(){
//                this.$Message.info('Clicked ok');
            },
            cancel(){
//                this.$Message.info('Clicked cancel');
            }
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

