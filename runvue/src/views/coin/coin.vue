<style lang="less">
    @import '../../styles/common.less';
    @import '../tables/components/table.less';
</style>
<template>
    <div>
        <Form style="margin: 5px 0;height: 40px;">
            <FormItem  style="width: 200px;display: inline-block;margin-right: 3px;" >
                <Select  v-model="name" placeholder="请选择币种"  style="margin-right: 3px;">
                    <Option value="0">全部</Option>
                    <Option value="1">主流币</Option>
                    <Option value="2">创新币</Option>
                    <Option value="3">其它币</Option>
                </Select>
            </FormItem>
            <Button type="info" style="float: right;margin-right: 5px" @click="load(1)">查询</Button>
        </Form>
        <Page :total="pageNum" :page-size="pageSize"  style="text-align: center;margin-top: 15px;"  @on-change="pageChange"></Page>
        <Modal
                v-model="modal1"
                class="userListInfoWrap"
                title="用户详情"
                @on-ok="ok"
                @on-cancel="cancel">
            <p><span class="userListInfo">注册时间:</span><span v-text="userListInner.created"></span></p>
            <p><span class="userListInfo">国家:</span><span v-text="userListInner.country"></span></p>
            <p><span class="userListInfo">用户名(邮箱):</span><span v-text="userListInner.email"></span></p>
            <p><span class="userListInfo">真实姓名:</span><span v-text="userListInner.userRealName"></span></p>
            <p><span class="userListInfo">电话号码:</span><span v-text="userListInner.phone"></span></p>
            <p><span class="userListInfo">钱包地址:</span><span v-text="userListInner.walletAddress"></span></p>
            <!--<p><span class="userListInfo">银行开户行:</span><span v-text="userListInner.created"></span></p>-->
            <p><span class="userListInfo">银行卡号:</span><span v-text="userListInner.bankcard"></span></p>
            <p><span class="userListInfo">支付宝账号:</span><span v-text="userListInner.alipay"></span></p>
            <p><span class="userListInfo">推荐人用户名:</span><span v-text="userListInner.recommenderid"></span></p>
            <p><span class="userListInfo">推广人数:</span><span v-text="userListInner.promotionNumber"></span></p>
            <p><span class="userListInfo">团队总人数:</span><span v-text="userListInner.teamnumber"></span></p>
            <p><span class="userListInfo">团队A区人数:</span><span v-text="userListInner.leftAreaNumber"></span></p>
            <p><span class="userListInfo">团队B区人数:</span><span v-text="userListInner.rightAreaNumber"></span></p>
            <p><span class="userListInfo">最后登录时间:</span><span v-text="userListInner.lastlogintime"></span></p>
        </Modal>
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
                modal1:false,
                userListInner:{},
                pageSize:10,
                columnsList: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '序号',
                        width: 80,
                        align: 'center',
                        render: (h, params) => {
                            return  params.index + (this.initPage- 1) * this.pageSize + 1
                        }
                    },
                    {
                        title: '用户名(邮箱)',
                        align: 'center',
                        key: 'email',
                        editable: true
                    },
                    {
                        title: '真实姓名',
                        align: 'center',
                        key: 'userRealName',
                        editable: true
                    },
                    {
                        title: '手机号码',
                        align: 'center',
                        key: 'phone',
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
                        title: '国家',
                        align: 'center',
                        key: 'country'
                    },
                    {
                        title: '推荐人用户名',
                        align: 'center',
                        key: 'recommenderid',
                        editable: true
                    },
                    {
                        title: '推广人数',
                        align: 'center',
                        key: 'promotionNumber',
                        editable: true
                    },
                    {
                        title: '团队A区人数',
                        align: 'center',
                        key: 'leftAreaNumber',
                        editable: true
                    },
                    {
                        title: '团队B区人数',
                        align: 'center',
                        key: 'rightAreaNumber',
                        editable: true
                    },
                    {
                        title: '状态',
                        align: 'center',
                        key: 'typestate',
                        editable: true
                    },
                    {
                        title: '最后登录时间',
                        align: 'center',
                        key: 'lastlogintime',
                        render: (h, params) => {
                            if(params.row.lastlogintime){
                                return params.row.lastlogintime.replace(/\T/g, ' ').substring(0,19)
                            }else{
                                return ''
                            }
                        }
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
                if (_this.name == '0' ) {
                    _this.name = ''
                }
                params.append('str',_this.name)
                $http.post('/adminToken/listAllToken',params).then(function (res) {
                    console.log(res)
                    if(res.status == '1'){
                        _this.pageSize = res.data.size
                        _this.Message =  res.data.currentPageData
                        _this.loading = false
                    }else{
                        _this.$Message.error(res.message)
                    }

                })
            },
            changeNum (val){
                console.log(val)
            },
            info(val){
                this.modal1 = true
                this.userListInner = val.row
                console.log(this.userListInner)
            },
            change(val){
                this.modal1 = true
                console.log(val)
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
</style>

