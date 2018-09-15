<style lang="less">
    @import '../../styles/common.less';
    @import '../tables/components/table.less';
</style>
<template>
    <div>
        <Card >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="200">
                <Row :gutter="16">
                    <Col span="12" >
                    <FormItem label="币币交易最大值" prop="bigCSA">
                        <Input v-model="formValidate.bigCSA"  placeholder="请输入USD提现手续费"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="币币交易最小值" prop="samlCSA">
                        <Input v-model="formValidate.samlCSA" placeholder="请输入矿石转账手续费"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12" >
                    <FormItem label="币币交易手续费" prop="csaex">
                        <Input v-model="formValidate.csaex" placeholder="请输入最低转账"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="CTC手续费" prop="ctcrate">
                        <Input v-model="formValidate.ctcrate" placeholder="请输入最高转账"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>
<script>
    import $http from '../../utils/axiosWrap'
    import Cookies from 'js-cookie';

    export default {
        data () {
            return {
                formValidate: {
                    bigCSA:'',
                    samlCSA:'',
                    ctcrate:'',
                    csaex:''
                },
                ruleValidate: {
                    bigCSA: [
                        { required: true, message: '币币交易最大值不得为空', trigger: 'blur' }
                    ],
                    samlCSA: [
                        { required: true, message: '币币交易最小值不得为空', trigger: 'blur' }
                    ],
                    ctcrate: [
                        { required: true, message: 'CTC交易手续费不得为空', trigger: 'blur' }
                    ],
                    csaex: [
                        { required: true, message: '币币交易手续费不得为空', trigger: 'blur' }
                    ]
                },
                Message: ''
            }
        },
        created(){
            this.load()
        },
        methods: {
            setTime(time){
                var date = new Date(time);
                var month = date.getMonth() + 1
                var day =  date.getDate()
                var hours =   date.getHours()
                var minutes = date.getMinutes()
                var datese = date.getSeconds()
                if(datese /1  < 10){
                    datese = '0' +  datese
                }
                if(month /1  < 10){
                    month = '0' +  month
                }
                if(day /1  < 10){
                    day = '0' +  day
                }
                if(hours /1  < 10){
                    hours = '0' +  hours
                }
                if(minutes /1  < 10){
                    minutes = '0' +  minutes
                }
                return date.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + datese
            },
            handleSubmit (name) {
                let _this = this
                _this.formValidate.bigCSA += ''
                 _this.formValidate.samlCSA += ''
                _this.formValidate.ctcrate += ''
                _this.formValidate.csaex += ''
                    _this.$refs[name].validate((valid) => {
                    if (valid) {
                        let params = new URLSearchParams()
                        params.append('bigCSA',_this.formValidate.bigCSA)
                        params.append('samlCSA',_this.formValidate.samlCSA)
                        params.append('ctcrate',_this.formValidate.ctcrate)
                        params.append('csaex',_this.formValidate.csaex)
                        params.append('adminid',Cookies.get('superId'))

                        $http.post('a/login/updateSystem',params).then(function (res) {
                            if(res.suc){
                                _this.$Message.info('修改成功')
                            }else{
                                _this.$Message.error('修改失败')
                            }
                        })
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            load () {
                let _this = this
                let params = new URLSearchParams()
                //查询手续费汇率
                $http.post('a/login/getSystem',params).then(function (res) {
                    console.log(res)
                    _this.formValidate.bigCSA = res.result.bigCSA
                    _this.formValidate.samlCSA = res.result.samlCSA
                    _this.formValidate.ctcrate = res.result.ctcrate
                    _this.formValidate.csaex = res.result.csaex

                })

            }
        }
    };
</script>
<style>

</style>
