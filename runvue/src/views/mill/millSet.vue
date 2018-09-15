<style lang="less">
    @import '../../styles/common.less';
    @import '../tables/components/table.less';
</style>
<template>
    <div>
        <Card shadow style="margin-top: 10px;">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="200">
                <Row :gutter="16">
                    <Col span="12" >
                    <FormItem label="矿机锁仓本金释放比率" prop="releaseRate">
                        <Input v-model="formValidate.releaseRate" placeholder="请输入百分比"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="矿机动态收益可兑换积分比率" prop="integralRate">
                        <Input v-model="formValidate.integralRate" placeholder="请输入百分比"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12" >
                    <FormItem label="矿机是否开启收益计算" prop="isStartCalculateEarnings">
                                <Select v-model="formValidate.isStartCalculateEarnings" placeholder="请选择是否开启">
                                    <Option value="1">开启</Option>
                                    <Option value="0">关闭</Option>
                                </Select>
                            </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="矿机提取释放本金比率" prop="outflowFee">
                        <Input v-model="formValidate.outflowFee" placeholder="请输入百分比"></Input>
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
    import Cookies from 'js-cookie'

    export default {
        data () {
         var validatePass = (rule,value, callback) => {
                setTimeout(() => {
                    if (value < 0 || value >99) {
                      callback(new Error('请输入1-99数字'));
                    } else {
                      callback();
                    }
                }, 1000);
              };
            return {
                formValidate: {
                    releaseRate: '',
                    integralRate: '',
                    isStartCalculateEarnings: '',
                    outflowFee: '',
                    id:''
                },
                ruleValidate: {
                    releaseRate: [
                        { required: true, message: '矿机锁仓本金释放比率不得为空', trigger: 'blur' },
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    integralRate: [
                        { required: true, message: '矿机动态收益可兑换积分比率不得为空', trigger: 'blur' },
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    isStartCalculateEarnings: [
                        { required: true, message: '矿机是否开启收益计算不得为空', trigger: 'blur' }
                    ],
                    outflowFee: [
                        { required: true, message: '矿机提取释放本金比率不得为空', trigger: 'blur' },
                        { validator: validatePass, trigger: 'blur' }
                    ]
                },
                Message: ''
            }
        },
        created(){
            this.load()
        },
        methods: {
            handleSubmit (name) {
            var _this = this
            _this.formValidate.releaseRate += ''
            _this.formValidate.integralRate += ''
            _this.formValidate.outflowFee += ''

                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let params = new URLSearchParams()
                        params.append('releaseRate',_this.formValidate.releaseRate)
                        params.append('integralRate',_this.formValidate.integralRate)
                        params.append('outflowFee',_this.formValidate.outflowFee)
                        params.append('isStartCalculateEarnings',_this.formValidate.isStartCalculateEarnings)
                        params.append('id',_this.formValidate.id)
                        params.append('updateName',Cookies.get('user'))
                        $http.post('/oreAllModules/updateOreRule',params).then(function (res) {
                             _this.formValidate.releaseRate = res.result.releaseRate * 100
                             _this.formValidate.integralRate = res.result.integralRate * 100
                             _this.formValidate.outflowFee = res.result.outflowFee * 100
                             _this.formValidate.isStartCalculateEarnings = res.result.isStartCalculateEarnings
                             _this.formValidate.id = res.result.id
                             if(res.suc){
                                 _this.$Message.success('修改成功!')
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
                $http.post('/oreAllModules/getOreRule',params).then(function (res) {
                     _this.formValidate.releaseRate = res.result.releaseRate * 100
                     _this.formValidate.integralRate = res.result.integralRate * 100
                     _this.formValidate.outflowFee = res.result.outflowFee * 100
                     _this.formValidate.isStartCalculateEarnings = res.result.isStartCalculateEarnings
                     _this.formValidate.id = res.result.id
                })
            }
        }
    };
</script>
<style>

</style>
