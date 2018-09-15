<style lang="less">
    @import '../../styles/common.less';
    @import '../tables/components/table.less';
</style>
<template>
    <div>
        <Row style="background:#eee;">
            <Col span="24">
            <Card :bordered="false" style="overflow: hidden;padding-bottom: 10px;">
                <p slot="title">申请基本信息</p>
                <p><span class="infoTitle">支付宝认证姓名:</span> <span v-text="innerArr.aliRealName"></span></p>
                <p><span class="infoTitle">支付账户:</span> <span v-text="innerArr.alipay"></span></p>
                <p><span class="infoTitle">银行:</span> <span v-text="innerArr.bank"></span></p>
                <p><span class="infoTitle">支行:</span> <span v-text="innerArr.bankBranch"></span></p>
                <p><span class="infoTitle">收款人姓名:</span> <span v-text="innerArr.bankRealName"></span></p>
                <p><span class="infoTitle">银行卡号:</span> <span v-text="innerArr.bankVard"></span></p>
                <p><span class="infoTitle">买家按钮:</span> <span >buyerButton</span></p>
                <p><span class="infoTitle">买家ID:</span> <span v-text="innerArr.buyerId"></span></p>
                <p><span class="infoTitle">买家姓名:</span> <span v-text="innerArr.buyerName"></span></p>
                <p><span class="infoTitle">买家状态:</span> <span v-text="innerArr.buyerStruts"></span></p>
                <p><span class="infoTitle">买家手机:</span> <span v-text="innerArr.buyerTelephone"></span></p>
                <p><span class="infoTitle">取消时间:</span> <span v-text="innerArr.cancelTime"></span></p>
                <p><span class="infoTitle">数量:</span> <span v-text="innerArr.count"></span></p>
                <p><span class="infoTitle">币种:</span> <span v-text="innerArr.currency"></span></p>
                <p><span class="infoTitle">备注:</span> <span v-text="innerArr.extral"></span></p>
                <p><span class="infoTitle">完成时间:</span> <span v-text="innerArr.finishTime"></span></p>
                <p><span class="infoTitle">订单状态:</span> <span v-text="innerArr.orderStatus"></span></p>
                <p><span class="infoTitle">订单时间:</span> <span v-text="innerArr.payTime"></span></p>
                <p><span class="infoTitle">支付方式:</span> <span v-text="innerArr.payMethod"></span></p>
                <p><span class="infoTitle">支付时间:</span> <span v-text="innerArr.bankRealName"></span></p>
                <p><span class="infoTitle">单价:</span> <span v-text="innerArr.price"></span></p>
                <p><span class="infoTitle">卖家按钮:</span> <span >sellerButton</span></p>
                <p><span class="infoTitle">卖家ID:</span> <span v-text="innerArr.sellerId"></span></p>
                <p><span class="infoTitle">卖家姓名:</span> <span v-text="innerArr.sellerName"></span></p>
                <p><span class="infoTitle">卖家状态:</span> <span v-text="innerArr.sellerStruts"></span></p>
                <p><span class="infoTitle">卖家手机:</span> <span v-text="innerArr.sellerTelephone"></span></p>
                <p><span class="infoTitle">总价:</span> <span v-text="innerArr.totalPrice"></span></p>
                <p><span class="infoTitle" style="float: left;">支付宝收款码:</span><img :src="innerArr.payCode" alt="" style="float: left;"></p>
            </Card>
            </Col>
            <Col span="24" style="margin-top: 10px;">
            <Card shadow v-if="ranks">
                <p slot="title">凭证审核</p>
                <div class="identityImgWrap">
                    <div class="identityImgInner" v-for="list in imgArr">
                        <img :src="list.pic" alt="">
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
                innerArr:{
                },
                id:'',
                imgArr:'',
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
            this.innerArr = this.$route.params.row
            this.id = this.$route.params.row.id
            if(this.$route.params.row.appealTime){
                this.innerArr.appealTime = this.$route.params.row.appealTime.replace(/\T/g, ' ').substring(0,19)
            }else{
                this.innerArr.appealTime = ''
            }
            if(this.$route.params.row.orderTime){
                this.innerArr.orderTime = this.$route.params.row.orderTime.replace(/\T/g, ' ').substring(0,19)
            }else{
                this.innerArr.orderTime = ''
            }
            if(this.$route.params.row.cancelTime){
                this.innerArr.cancelTime = this.$route.params.row.cancelTime.replace(/\T/g, ' ').substring(0,19)
            }else{
                this.innerArr.cancelTime = ''
            }
            if(this.$route.params.row.finishTime){
                this.innerArr.finishTime = this.$route.params.row.finishTime.replace(/\T/g, ' ').substring(0,19)
            }else{
                this.innerArr.finishTime = ''
            }
            if(this.$route.params.row.payTime){
                this.innerArr.payTime = this.$route.params.row.payTime.replace(/\T/g, ' ').substring(0,19)
            }else{
                this.innerArr.payTime = ''
            }
            if(this.$route.params.row.orderTime){
                this.innerArr.orderTime = this.$route.params.row.orderTime.replace(/\T/g, ' ').substring(0,19)
            }else{
                this.innerArr.orderTime = ''
            }

//            this.status = this.$route.params.row.status
//
            if(this.$route.params.row.orderStatus == '冻结中'){
                this.primary = true
            }else{
                this.primary = false
            }
//            this.id = this.$route.params.row.id

            let params = new URLSearchParams()
            params.append('orderId', this.id)
            let _this = this
            $http.post('/order/look',params).then(function (res) {
                console.log(res)
                if(res.status == '0'){
                    _this.ranks = false
                }else{
                    _this.ranks = true
                    _this.imgArr = res.data
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
                params.append('orderId',_this.id)
                if (_this.step.pass === '通过') {
                    url = '/order/putCoin'
                }else{
                    url = '/order/deal'
                }
                _this.hasSubmit = true;
                $http.post(url,params).then(function (res) {
                    if(res.status == '1'){
                        _this.$Message.info('审核成功!')
                        _this.$router.push({
                            name:'CTCfreeze'
                        })
                    }else{
                        _this.$Message.error(res.message)
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
    .infoTitle{
        display: inline-block;
        width: 130px;
        text-align: right;
    }

</style>

