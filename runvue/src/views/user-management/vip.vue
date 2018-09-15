<style lang="less">
    @import '../../styles/common.less';
    @import '../tables/components/table.less';
</style>
<template>
    <div>
        <form action="" style="margin: 5px 0;height: 40px;">
            <!--<Input v-model="name"   placeholder="管理员名称"  style="width: 200px;margin-right: 3px;"></Input>-->
            <Button type="info" style="float: right;margin-right: 5px" @click="addUser">添加</Button>
            <!--<Button type="info" style="float: right;margin-right: 5px" @click="load(1)">查询</Button>-->
        </form>
        <Table :loading="loading" refs="table1" @on-selection-change="changeNum" @on-delete="handleDel" :data="Message" :columns="columnsList"></Table>
        <Modal
                v-model="modal1"
                title="创建新用户"
        >
            <Form ref="Validate" :model="addInner" :rules="addValidate"  :label-width="100">
                <Row :gutter="16">
                    <Col span="12">
                    <FormItem label="管理员名称" prop="sysEnglishName">
                        <Input v-model="addInner.sysEnglishName"   style="margin-right: 3px;"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="手机号" prop="sysUserPhone">
                        <Input v-model="addInner.sysUserPhone"   style="margin-right: 3px;"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                    <FormItem label="密码" prop="password">
                        <Input v-model="addInner.password"   style="margin-right: 3px;"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="管理员类型" prop="sysUserAuthorityType">
                        <Select v-model="addInner.sysUserAuthorityType"  style="margin-right: 3px;">
                            <Option value="1">超级管理员</Option>
                            <Option value="2">普通管理员</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="add('Validate')">保存</Button>
            </div>
        </Modal>
        <Modal
                v-model="modal2"
                title="修改"
        >
            <Form ref="formValidate" :model="changeInner"  :rules="ruleValidate" :label-width="100">
                <Row :gutter="16">
                    <Col span="12">
                    <FormItem label="修改密码" prop="changesPassword">
                        <Input v-model="changeInner.changesPassword"   style="margin-right: 3px;"></Input>
                    </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="sub('formValidate')">保存</Button>
            </div>
        </Modal>
        <Page :total="pageNum" :page-size="pageSize"  style="text-align: center;margin-top: 15px;" show-total   show-elevator  @on-change="pageChange"></Page>
    </div>
</template>
<script>
    import $http from '../../utils/axiosWrap'
    import canEditTable from '../tables/components/canEditTable.vue'
    import Cookies from 'js-cookie'

    export default {
        data() {
            var validatePass = (rule,value, callback) => {
                setTimeout(() => {
                    var reg = /^[A-Za-z]{4,20}$/;
                    if(!reg.test(value)){
                        callback(new Error('管理员名为4-20位字母'));
                    }else{
                        callback();
                    }

                }, 1000);
            };
            var validatePhone = (rule,value, callback) => {
                setTimeout(() => {
                    var reg = /^[1][0-9]{10}$/;
                    if(!reg.test(value)){
                        callback(new Error('手机号格式错误'));
                    }else{
                        callback();
                    }

                }, 1000);
            };
            return {
                loading: true,
                Message:[],
                admin:true,
                modal1:false,
                modal2:false,
                pageSize:10,
                addInner:{
                    sysEnglishName:'',
                    sysUserPhone:'',
                    sysUserAuthorityType:'',
                    password:''
                },
                changeInner:{
                    changesysEnglishName:'',
                    changesysUserPhone:'',
                    changesysUserAuthorityType:'',
                    changeloginUser:'',
                    zt:''
                },
                userListInner:{},
                changeInner:{
                    changesPassword:''
                },
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
                        key: 'name',
                        editable: true
                    },
                    {
                        title: '手机号',
                        align: 'center',
                        key: 'phone',
                        editable: true
                    },
                    {
                        title: '类型',
                        align: 'center',
                        key:'sysStatus',
                        render: (h, params) => {
                            if(params.row.sysStatus == '1'){
                                return '超级管理员'
                            }else{
                                return '普通管理员'
                            }
                        }
                    },
                    {
                        title: '最后登录时间',
                        align: 'center',
                        key: 'last_Login_time',
                        width:'auto',
                        editable: true
                    },
                    {
                        title: '操作',
                        align: 'center',
                        width: 140,
                        render: (h, params) => {
                            if(this.admin){
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
                                                this.change(params)
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
                addValidate: {
                    sysEnglishName: [
                        { required: true, message: '管理员名不得为空', trigger: 'blur' },
                        {validator: validatePass, trigger: 'blur' }
                    ],
                    sysUserPhone: [
                        { required: true, message: '管理员手机号不得为空', trigger: 'blur' },
                        {validator: validatePhone, trigger: 'blur' }
                    ],
                    sysUserAuthorityType: [
                        { required: true, message: '类型不得为空', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '管理员密码不得为空', trigger: 'blur' }

                    ]
                },
                ruleValidate: {
                    changesPassword: [
                        { required: true, message: '密码不得为空', trigger: 'blur' }
                    ]
                },
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
                params.append('pageNo',_this.initPage)
                $http.post('a/login/getAdministration',params).then(function (res) {
                    console.log(res)
                    _this.Message = res.result.content
                    _this.pageNum = res.result.totalRow
                    _this.loading = false
                })
            },
            changeNum (val){
                console.log(val)
            },
            info(val){
                this.modal1 = true
                this.userListInner = val.row
            },
            change(val){
                this.changeInner.changesPassword= val.row.password
                this.changeInner.id= val.row.id
                this.changeInner.sysStatus= val.row.sysStatus
                this.modal2 = true
            },
            sub(name){
                let _this = this
                _this.$refs[name].validate((valid) => {
                    if (valid) {
                        let params = new URLSearchParams()
                        params.append('id',_this.changeInner.id)
                        params.append('password',_this.changeInner.changesPassword)
                        params.append('adminid',Cookies.get('superId'))
                        params.append('sysStatus',_this.changeInner.sysStatus)

                        console.log(params)
                        $http.post('a/login/updateSysUser',params).then(function (res) {
                             if (res.suc) {
                                 _this.$Message.info('信息修改成功!')
                                 _this.modal2 = false
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
            add(name){
                let _this = this
                _this.$refs[name].validate((valid) => {
                    if (valid) {
                        let params = new URLSearchParams()
                        params.append('name',_this.addInner.sysEnglishName)
                        params.append('phone',_this.addInner.sysUserPhone)
                        params.append('status',_this.addInner.sysUserAuthorityType)
                        params.append('userid  ',Cookies.get('superId'))
                        params.append('password',_this.addInner.password)
                        $http.post('a/login/addAdministration',params).then(function (res) {
                            if(res.suc){
                                _this.modal1 = false
                                _this.load()
                                _this.$Message.info('管理员添加成功!')
                            }else{
                                _this.$Message.error('管理员添加失败!')
                            }
                        })
                    } else {
                        _this.$Message.error('信息填写有误!')
                    }
                })
            },
            addUser(){
                if(this.Message.length > 4){
                    this.$Message.info('管理员上限为5位!')
                }else{
                    this.addInner.sysEnglishName=''
                    this.addInner.sysUserPhone=''
                    this.addInner.sysUserAuthorityType=''
                    this.modal1 = true
                }
            },
            cancel(){
//                this.$Message.info('Clicked cancel');
            },
            pageChange(index){
                this.initPage = index
                this.load ()
            }
        }
    }
</script>
<style>
    .userListInfo{
        display: inline-block;
        width: 120px;
    }
    .userListInfoWrap p{
        line-height: 26px;
    }
</style>

