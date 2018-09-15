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
                class="userListInfoWrap"
                title="用户详情"
                @on-ok="ok"
                @on-cancel="cancel">
            <div style="overflow: hidden">
            <p><span class="userListInfo">用户名:</span><span v-text="userListInner.name"></span></p>
            <p><span class="userListInfo">手机号:</span><span v-text="userListInner.phone"></span></p>
            <p><span class="userListInfo">登录密码:</span><span v-text="userListInner.password"></span></p>
            <p><span class="userListInfo">身份证号:</span><span v-text="userListInner.idnumber"></span></p>
            <p><span class="userListInfo">推荐人:</span><span v-text="userListInner.recommenderid"></span></p>
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
                        key: 'idnum',
                        editable: true
                    },
                    {
                        title: '邀请码',
                        align: 'center',
                        key: 'codes'
                    },
                    {
                        title: '矿机数量',
                        align: 'center',
                        key: 'minerNum',
                        editable: true
                    },
                    {
                        title: '团队矿机数量',
                        align: 'center',
                        key: 'teamMiner',
                        editable: true
                    },
                    {
                        title: '推荐人姓名',
                        align: 'center',
                        key: 'referee',
                        editable: true
                    },
                    {
                        title: '开通时间',
                        align: 'center',
                        key: 'time',
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
                $http.post('a/login/pageUser',params).then(function (res) {
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
                $http.post('a/login/userDetails',params).then(function (res) {
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

