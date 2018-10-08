<style lang="less">
    @import '../../styles/common.less';
    @import '../tables/components/table.less';
</style>
<template>
    <div>
      <Form  :label-width="100" style="height: 38px;">
        <Input v-model="goodName"  placeholder="根据商品名查找" style="width: 200px;margin-right: 3px;float: left"></Input>
        <FormItem label="实体精选" style="width: 300px;float: left" >
            <Select  v-model="goodOfflineChoice" style="margin-right: 3px;">
                <Option value="5">全部</Option>
                <Option value="1">自营 </Option>
                <Option value="2">店铺经营</Option>
            </Select>
        </FormItem>
        <FormItem label="商城优选" style="width: 300px;float: left" >
            <Select  v-model="goodShopChoice" style="margin-right: 3px;">
                <Option value="5">全部</Option>
                <Option value="1">自营 </Option>
                <Option value="2">店铺经营</Option>
            </Select>
        </FormItem><FormItem label="每日精选" style="width: 300px;float: left" >
            <Select  v-model="goodEveryChoice" style="margin-right: 3px;">
                <Option value="5">全部</Option>
                <Option value="1">自营 </Option>
                <Option value="2">店铺经营</Option>
            </Select>
        </FormItem><FormItem label="推广商品" style="width: 300px;float: left" >
            <Select  v-model="goodExtension" style="margin-right: 3px;">
                <Option value="5">全部</Option>
                <Option value="1">自营 </Option>
                <Option value="2">店铺经营</Option>
            </Select>
        </FormItem>
        <Button type="info" style="float: right;margin-right: 5px" @click="load(1)">搜索</Button>
      </Form>

        <Table :loading="loading" refs="table1"  :data="Message" :columns="columnsList" style="float:left"></Table>
        <Page :total="pageNum" :page-size="pageSize"  style="text-align: center;margin-top: 15px;" show-total   show-elevator  @on-change="pageChange"></Page>
        <!-- <Modal title="图片预览" v-model="visible">
            <img :src="imgName " v-if="visible" style="width: 100%">
        </Modal> -->
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
                columnsList: [

                    {
                        title: '商品主图',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('img', {
                                    attrs: {
                                        src:'http://47.91.247.228:8989/viCoin/image/contractionImageFile/'+ params.row.goodImageDefault
                                    },
                                    style: {
                                        width: '40px',
                                        height: '40px',
                                        marginTop:'10px'
                                    },
                                    // on:{
                                    //   click:()=>{
                                    //     this.handleView('http://47.91.247.228:8989/viCoin/image/imageFile/'+ params.row.goodImageDefault)
                                    //   }
                                    // }
                                }),
                            ]);
                        }
                    },
                    {
                        title: '商品ID',
                        align: 'center',
                        key: 'goodId',
                        editable: true
                    },
                    {
                        title: '商家ID',
                        align: 'center',
                        key: 'shopId',
                        editable: true
                    },
                    {
                        title: '商品名称',
                        align: 'center',
                        key: 'goodName',
                        editable: true
                    },
                    {
                        title: '商品价格',
                        align: 'center',
                        key: 'goodPrice',
                        editable: true
                    },
                    {
                        title: '商品经营状态',
                        align: 'center',
                        key: 'goodStatus',
                        render: (h, params) => {
                            if(params.row.goodStatus == '1'){
                                return  '自营'
                            }else{
                                return  '店铺经营'
                            }
                        }
                    },
                    {
                        title: '每日精选',
                        align: 'center',
                        key: 'goodEveryChoice',
                        render: (h, params) => {
                            if(params.row.goodEveryChoice == 'yes'){
                                return  h('div',[
                                    h('p',{},'是'),h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.dec(params)
                                            }
                                        }
                                    }, '取消')
                                ])
                            }else{
                                return  h('div',[
                                    h('p',{},'否'),h('Button', {
                                        props: {
                                            type: 'info',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.uec(params)
                                            }
                                        }
                                    }, '设置')
                                ])
                            }
                        }
                    },
                {
                    title: '商城优选',
                    align: 'center',
                    key: 'goodShopChoice',
                    render: (h, params) => {
                        if(params.row.goodShopChoice == 'yes'){
                           return  h('div',[
                                    h('p',{},'是'),h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.dmc(params)
                                            }
                                        }
                                    }, '取消')
                                ])
                        }else{
                            return  h('div',[
                                    h('p',{},'否'),h('Button', {
                                        props: {
                                            type: 'info',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.umc(params)
                                            }
                                        }
                                    }, '设置')
                                ])
                        }
                    }
                },
                {
                    title: '实体精选',
                    align: 'center',
                    key: 'goodOffineChoice',
                    render: (h, params) => {
                        if(params.row.goodOffineChoice == 'yes'){
                            return  h('div',[
                                    h('p',{},'是'),h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.uoc(params)
                                            }
                                        }
                                    }, '取消')
                                ])
                        }else{
                            return  h('div',[
                                    h('p',{},'否'),h('Button', {
                                        props: {
                                            type: 'info',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.doc(params)
                                            }
                                        }
                                    }, '设置')
                                ])
                        }
                    }
                },
                {
                    title: '推广商品',
                    align: 'center',
                    key: 'goodExtension',
                    render: (h, params) => {
                        if(params.row.goodExtension == 'yes'){
                            return  h('div',[
                                    h('p',{},'是'),h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.dge(params)
                                            }
                                        }
                                    }, '取消')
                                ])
                        }else{
                            return  h('div',[
                                    h('p',{},'否'),h('Button', {
                                        props: {
                                            type: 'info',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.uge(params)
                                            }
                                        }
                                    }, '设置')
                                ])
                        }
                    }
                },
                    {
                        title: '上架状态',
                        align: 'center',
                        key: 'goodSaleState',
                        render:(h,params)=>{
                          if(params.row.goodSaleState == 'sale'){
                              return  '上架销售'
                          }else if(params.row.goodSaleState == 'locking'){
                              return  '下架'
                          }else if(params.row.goodSaleState == 'delete'){
                              return  '删除'
                          }else{
                              return '其他'
                          }
                        }
                    },

                ],
                shopId: '',
                goodName:'',
                goodStatus:'',
                goodCat:'',
                goodEveryChoice:'',
                goodShopChoice:'',
                goodOffineChoice:'',
                goodExtension:'',
                pageSize:10,
                initPage:1,
                shopChoice:'',
                pageNum:1
            }
        },
        created: function () {
            this.load()
        },
        methods: {
            load (index){
                let _this = this
                let params = new URLSearchParams()
                if(index == '1'){
                    _this.initPage = 1
                }
                params.append('pageNo',_this.initPage)
                params.append('shopId',_this.shopId)
                params.append('goodName',_this.goodName)
                params.append('goodStatus',_this.goodStatus)
                params.append('goodCat',_this.goodCat)
                params.append('goodEveryChoice',_this.goodEveryChoice)
                params.append('goodShopChoice',_this.goodShopChoice)
                params.append('goodOffineChoice',_this.goodOffineChoice)
                params.append('goodExtension',_this.goodExtension)
                $http.post('a/shop/good/findGoodSearch',params).then(function (res) {
                    console.log(res)
                    if(res.status == '200'){
                        _this.Message = res.data.content
                        _this.pageNum = res.data.totalElements
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
            uge(res){
                let _this = this
                _this.loading = true
                let params = new URLSearchParams()
                params.append('goodId',res.row.goodId)
                $http.post('a/shop/good/updateGoodExtension',params).then(function (res) {
                    if(res.status == '200'){
                        _this.load()
                        _this.$Message.info('设为推广商品成功!')
                    }else{
                        _this.$Message.error(res.messages)
                        _this.load()
                    }
                })
            },
            dge(res){
                let _this = this
                _this.loading = true
                let params = new URLSearchParams()
                params.append('goodId',res.row.goodId)
                $http.post('a/shop/good/deleteGoodExtension',params).then(function (res) {
                    if(res.status == '200'){
                        _this.load()
                        _this.$Message.info('取消推广商品成功!')
                    }else{
                        _this.$Message.error(res.messages)
                    }
                })
            },
            uoc(res){
                let _this = this
                _this.loading = true
                let params = new URLSearchParams()
                params.append('goodId',res.row.goodId)
                $http.post('a/shop/good/updateOfflineChoice',params).then(function (res) {
                    if(res.status == '200'){
                        _this.load()
                        _this.$Message.info('设为实体精选成功!')
                    }else{
                        _this.$Message.error(res.messages)
                        _this.load()
                    }
                })
            },
            doc(res){
                let _this = this
                _this.loading = true
                let params = new URLSearchParams()
                params.append('goodId',res.row.goodId)
                $http.post('a/shop/good/updateOfflineChoice',params).then(function (res) {
                    if(res.status == '200'){
                        _this.load()
                        _this.$Message.info('取消实体精选成功!')
                    }else{
                        _this.$Message.error(res.messages)
                    }
                })
            },
            umc(res){
                let _this = this
                _this.loading = true
                let params = new URLSearchParams()
                params.append('goodId',res.row.goodId)
                $http.post('a/shop/good/updateMallsChoice',params).then(function (res) {
                    if(res.status == '200'){
                        _this.load()
                        _this.$Message.info('设为商城优选成功!')
                    }else{
                        _this.$Message.error(res.messages)
                        _this.load()
                    }
                })
            },
            dmc(res){
                let _this = this
                _this.loading = true
                let params = new URLSearchParams()
                params.append('goodId',res.row.goodId)
                $http.post('a/shop/good/deleteMallsChoice',params).then(function (res) {
                    if(res.status == '200'){
                        _this.load()
                        _this.$Message.info('取消商城优选成功!')
                    }else{
                        _this.$Message.error(res.messages)
                    }
                })
            },
            uec(res){
                let _this = this
                _this.loading = true
                let params = new URLSearchParams()
                params.append('goodId',res.row.goodId)
                $http.post('a/shop/good/updateEveryChoice',params).then(function (res) {
                    if(res.status == '200'){
                        _this.load()
                        _this.$Message.info('设为每日精选成功!')
                    }else{
                        _this.$Message.error(res.messages)
                        _this.load()
                    }
                })
            },
            dec(res){
                let _this = this
                _this.loading = true
                let params = new URLSearchParams()
                params.append('goodId',res.row.goodId)
                $http.post('a/shop/good/deleteEveryChoice',params).then(function (res) {
                    if(res.status == '200'){
                        _this.load()
                        _this.$Message.info('取消每日精选成功!')
                    }else{
                        _this.$Message.error(res.messages)
                    }
                })
            },
        }
    }
</script>
<style>
    .ivu-form-item {
        margin-bottom: 5px;
    }
</style>
