<style lang="less">
    @import '../../styles/common.less';
    @import '../tables/components/table.less';
</style>
<template>
    <div>
        <!--<form action="" style="margin: 5px 0">-->
        <!--<Input v-model="name"  placeholder="根据用户名查找" style="width: 200px;margin-right: 3px;"></Input>-->
        <!--<Input v-model="phone" placeholder="根据手机号查找" style="width: 200px"></Input>-->
        <!--<Button type="info" style="float: right;margin-right: 5px" @click="load">搜索</Button>-->
        <!--</form>-->
        <Table :loading="loading" refs="table1"  :data="Message" :columns="columnsList"></Table>
        <Page :total="pageNum" :page-size="pageSize"  style="text-align: center;margin-top: 15px;" show-total   show-elevator  @on-change="pageChange"></Page>

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
                columnsList: [
                    {
                        title: '序号',
                        width: 80,
                        render: (h, params) => {
                            return  params.index + (this.initPage- 1) * this.pageSize + 1
                        }
                    },
                    {
                        title: '商品',
                        align: 'center',
                        key: 'goodName',
                        editable: true
                    },
                    {
                        title: '规格',
                        align: 'center',
                        render:(h,params)=>{
                            console.log(params.row.products)
                            var asd = params.row.products
                            asd = JSON.parse(asd)
                            var listArr = []
                            for(var i = 0; i < asd.length; i++){
                                listArr.push(h('div', {
                                }, asd[i].goodsgg))
                            }
                            return h('div', listArr);
                        }
                    },
                    {
                        title: '价格',
                        align: 'center',
                        render:(h,params)=>{
                            console.log(params.row.products)
                            var asd = params.row.products
                            asd = JSON.parse(asd)
                            var listArr = []
                            for(var i = 0; i < asd.length; i++){
                                listArr.push(h('div', {
                                }, asd[i].goodsggPrice))
                            }
                            return h('div', listArr);
                        }
                    },
                    {
                        title: '库存',
                        align: 'center',
                        render:(h,params)=>{
                            console.log(params.row.products)
                            var asd = params.row.products
                            asd = JSON.parse(asd)
                            var listArr = []
                            for(var i = 0; i < asd.length; i++){
                                listArr.push(h('div', {
                                }, asd[i].goodsggNum))
                            }
                            return h('div', listArr);
                        }
                    },
                    {
                        title: '状态',
                        align: 'center',
                        key: 'v3',
                        editable: true
                    },{
                        title: '操作',
                        align: 'center',
                        width: 140,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.ty(params)
                                        }
                                    }
                                }, '同意'), h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.jj(params)
                                        }
                                    }
                                }, '拒绝')
                            ])
                        }
                    }
                ],
                name: '',
                phone: '',
                pageSize:10,
                initPage:1,
                pageNum:1
            }
        },
        created: function () {
            this.load()
        },
        methods: {
            load (){
                let _this = this
                let params = new URLSearchParams()
                params.append('pageNo',_this.pageNum)
                $http.post('a/login/shopGoodErgodic',params).then(function (res) {
                    if(res.suc){
                        console.log(res)
                        _this.Message = res.result.content
                        _this.pageNum = res.result.totalElements
                    }else{
                        _this.$Message.error(res.msg)
                    }

                    _this.loading = false
                })
            },
            pageChange(index){
                this.initPage = index
                this.load ()
            },
            ty(res){
                let _this = this
                _this.loading = true
                let params = new URLSearchParams()
                params.append('goodId',res.row.goodId)
                params.append('adminid',Cookies.get('superId'))
                $http.post('a/login/shopGoodThrough',params).then(function (res) {
                    if(res.suc){
                        _this.load()
                        _this.$Message.info('已同意!')
                    }else{
                        _this.$Message.error(res.msg)
                    }
                })
            },
            jj(res){
                let _this = this
                _this.loading = true
                let params = new URLSearchParams()
                params.append('goodId',res.row.goodId)
                params.append('adminid',Cookies.get('superId'))
                $http.post('a/login/shopGoodRefusal',params).then(function (res) {
                    if(res.suc){
                        _this.load()
                        _this.$Message.info('已拒绝!')
                    }else{
                        _this.$Message.error(res.msg)

                    }
                })
            }
        }
    }
</script>
<style>
</style>

