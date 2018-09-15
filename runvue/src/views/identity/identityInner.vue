<style lang="less">
    @import '../../styles/common.less';
    @import '../tables/components/table.less';
</style>
<template>
    <div>
        <Row style="background:#eee;">
            <Col span="24">
            <Card :bordered="false">
                <p slot="title">申请基本信息</p>
                <p><span class="infoTitle">用户名:</span> <span v-text="userName"></span></p>
                <p><span class="infoTitle">真实姓名:</span> <span v-text="idName"></span></p>
                <p><span class="infoTitle">国籍: </span><span v-text="country"></span></p>
                <p><span class="infoTitle">手机号: </span><span v-text="phone"></span></p>
                <p><span class="infoTitle">注册时间: </span><span v-text="createds"></span></p>
                <p><span class="infoTitle">提交时间: </span><span v-text="update"></span></p>
                <p><span class="infoTitle">支付宝账户: </span><span v-text="alipay"></span></p>
                <p><span class="infoTitle">支付方式: </span><span v-text="paymethod"></span></p>
                <p><span class="infoTitle">银行卡: </span><span v-text="bankcard"></span></p>
                <p><span class="infoTitle">钱包地址: </span><span v-text="walletAddress"></span></p>
                <p><span class="infoTitle">邮箱: </span><span v-text="idNumber"></span></p>
                <p><span class="infoTitle">身份证号: </span><span v-text="idNumber"></span></p>
                <p><span class="infoTitle">当前状态: </span><span v-text="status"></span></p>

            </Card>
            </Col>
            <Col span="24" style="margin-top: 10px;">
            <Card shadow v-if="ranks">
                <p slot="title">证件审核</p>
                <div class="identityImgWrap">
                    <div class="identityImgInner">
                        <img :src="takeOne" alt="">
                    </div>
                    <div class="identityImgInner">
                        <img :src="takeFour" alt="">
                    </div>
                    <div class="identityImgInner">
                        <img :src="handTakeOne" alt="">
                    </div>
                </div>
            </Card>
            </Col>
        </Row>
        <Card shadow style="margin-top: 10px;">
            <Form  class="step-form"  :model="step" :label-width="100">
                <FormItem v-show="primary" label="是否通过：" required>
                    <RadioGroup v-model="step.pass" >
                        <Radio  :disabled="hasSubmit" label="通过"></Radio>
                        <Radio  :disabled="hasSubmit" label="不通过"></Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="">
                    <Button :disabled="hasSubmit" v-if="primary" @click="handleSubmit" style="width:100px;" type="primary">提交</Button>
                    <Button :disabled="hasSubmit" v-if="!primary" @click="fanhui" style="width:100px;" type="success">返回</Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>
<script>
    import $http from '../../utils/axiosWrap';
    import Cookies from 'js-cookie'

    export default {
        name: 'CountToInner',
        data () {
            return {
                userName: '', // 用户名
                idName: '', // 真实姓名
                country: '', // 国际
                takeFour: '', // 反面照
                phone:'', // 手机号
                idNumber: '', // idcard
                handTakeOne: '', // 手持正面照
                takeOne: '', // 正面照
                createds:'', //注册时间
                update:'', //提交时间
                alipay:'', //支付宝账户
                lastlogintime:'', // 最后登录时间
                paymethod:'',//支付方式
                bankcard:'',//银行卡
                walletAddress:'', // 钱包地址
                email:'',// 邮箱
                id:'',
                ranks:'',
                step: {
                    remark: '',
                    pass: '通过'
                },
                hasSubmit: false,
                currentStep: 0,
                primary:false,
                status: ''
            };
        },
        created: function () {
            console.log(this.$route.params.row)
            this.userName = this.$route.params.row.username
            this.idName = this.$route.params.row.userRealName
            this.country = this.$route.params.row.country
            this.phone = this.$route.params.row.phone
            if(this.$route.params.row.created){
                this.createds = this.$route.params.row.created.replace(/\T/g, ' ').substring(0,19)
            }else{
                this.createds = ''
            }
            if(this.$route.params.row.update){
                this.update = this.$route.params.row.update.replace(/\T/g, ' ').substring(0,19)
            }else{
                this.update = ''
            }
            this.alipay = this.$route.params.row.alipay
            this.lastlogintime = this.$route.params.row.lastlogintime
            this.paymethod = this.$route.params.row.paymethod
            this.bankcard = this.$route.params.row.bankcard
            this.walletAddress = this.$route.params.row.walletAddress
            this.email = this.$route.params.row.email
            this.status = this.$route.params.row.status
            console.log(this.status)
            if(this.status == '正在审核'){
                this.primary = true
            }else{
                this.primary = false
            }
            this.id = this.$route.params.row.id

            let params = new URLSearchParams()
            params.append('userId', this.id)
            let _this = this
            $http.post('/userControl/queryCertifacation',params).then(function (res) {
               console.log(res)
                if(res.status == '0'){
                    _this.ranks = false
                }else{
                    _this.ranks = true
                    _this.handTakeOne = res.data.handTakeOne
                    _this.takeFour = res.data.takeFour
                    _this.takeOne = res.data.takeOne
                }

            })
            if(this.$route.params.row.ranks == '1'){
                this.ranks = false
            }else{
                this.ranks = true
            }
        },
        methods: {
            handleSubmit () {
                let _this = this
                let params = new URLSearchParams()
                let url = ''
                params.append('userId',_this.id)
                if (_this.step.pass === '通过') {
                    url = '/userControl/accept'
                }else{
                    url = '/userControl/reject'
                }
                _this.hasSubmit = true;
                $http.post(url,params).then(function (res) {
                   if(res.status == '1'){
                       _this.$Message.info('审核成功!')
                       _this.$router.push({
                           name: 'identityIndex'
                       })
                   }else{
                       _this.$Message.error(res.msg)
                   }
                    _this.hasSubmit = false;
                })
            },
            fanhui(){
                this.$router.push({
                    name: 'identityIndex'
                })
            }
        }
    };
</script>
<style>
    .identityWrap{
        width: 100%;
        min-height: 100%;
        background: #fff;
        margin-top: 10px;
    }
    .identityImgWrap{
        height: 240px;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .identityImgInner{
        width: 360px;
        height: 220px;
        float: left;
        border:1px solid #eeeeee;
        border-radius: 5px;
    }
    .identityImgInner>img{
        width: 100%;
        height: 100%;
    }
    .identityImgInner p{
        margin-top: 200px;
        text-align: center;
    }

</style>

