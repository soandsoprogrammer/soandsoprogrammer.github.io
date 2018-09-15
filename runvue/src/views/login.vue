<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="yzm">
                            <Button @click="sendYzm" type="primary"  style="width: 90px;float: right" >{{yzmInner}}</Button>
                            <Input type="text" v-model="form.yzm" style="width: 150px;" placeholder="请输入验证码">
                                <span slot="prepend">
                                    <Icon :size="16" type="email"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="verificationCode">
                            <Input v-model="form.verificationCode" style="" type="password" placeholder="请输入密码">
                            <span slot="prepend">
                                    <Icon :size="16" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import $http from '../utils/axiosWrap'
export default {
    data () {
        return {
            Message: '',
            form: {
                userName: '',
                verificationCode: '',
                yzm:''
            },
            yzmInner: '获取验证码',
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                yzm: [
                    { required: true, message: '验证码不能为空', trigger: 'blur' }
                ],
                verificationCode: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            },
            codeId:'',
            sendTrue:true,
            getVerificationCode:''
        }
    },
//    created(){
//        var _this = this
//        _this.$router.push({
//            path: 'home'
//        })
//    },
    methods: {
        handleSubmit () {
            var _this = this
            _this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    var storage=window.localStorage;
                    storage.clear();
                    let params = new URLSearchParams()
                    params.append('code', _this.form.yzm)
                    params.append('codeId', _this.codeId)
                    params.append('phone', _this.form.userName)
                    params.append('password', _this.form.verificationCode)
                    $http.post('/a/login/adminLogin', params).then(function (res) {
                        if (res.suc) {
                            Cookies.set('user', res.result.name)
                            Cookies.set('password',_this.form.verificationCode)
                            Cookies.set('superId', res.result.id)
                            Cookies.set('logintime', res.result.last_Login_time)
                            Cookies.set('address', res.result.last_ip)
//                            sysStatus: 1超管 2普通
                            if(res.result.sysStatus == '1'){
                                Cookies.set('access', 0)
                            }else if(res.result.sysStatus == '2'){
                                Cookies.set('access', 1)
                            }else{
                                Cookies.set('access', 5)
                            }
                            _this.$router.push({
                                path: 'home'
                            })
                        }else{
                            _this.$Message.error(res.msg)
                        }
                    })
                }
            })
        },
        sendYzm () {
            let _this = this
            if(_this.sendTrue){
                _this.sendTrue = false
                let params = new URLSearchParams()
                params.append('phone', _this.form.userName)
                $http.post('/m/sms/sendadminlogin', params).then(function (res) {
                    console.log(res)
                    if(res.suc){
                        _this.codeId  = res.result
                        _this.sendTimeout()
                        _this.getVerificationCode = res.result.verificationCode
                    }else{
                        _this.$Message.error('验证码发送失败!')
                        _this.sendTrue = true
                    }
                })
            }else{
                _this.$Message.info('请稍后再试!')
            }
        },
        sendTimeout(){
            let _this = this
            let time = 60
            let setTime = setInterval(function () {
                if(time > 0){
                    time--
                    _this.yzmInner = '(' + time + ')s'
                }
                if(time == 0){
                    clearInterval(setTime)
                    _this.yzmInner = '重新发送'
                    _this.sendTrue = true
                }
            },1000)
        }
    }
};
</script>

<style>

</style>
