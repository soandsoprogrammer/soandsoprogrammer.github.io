<style lang="less">
    @import '../../styles/common.less';
    @import '../tables/components/table.less';
</style>
<template>
    <div>
      <Form  :label-width="100" style="height: 38px;">
        <Input v-model="shopName"  placeholder="根据店铺名查找" style="width: 200px;margin-right: 3px;float: left"></Input>
        <FormItem label="店铺精选状态" style="width: 300px;float: left" >
            <Select  v-model="shopChoice" style="margin-right: 3px;">
                <Option value="1">全部</Option>
                <Option value="yes">精选 </Option>
                <Option value="no">非精选</Option>
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
                        title: '店铺logo',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('img', {
                                    attrs: {
                                        src:'http://47.91.247.228:8989/viCoin/image/imageFile/'+ params.row.shopLogo
                                    },
                                    style: {
                                        width: '40px',
                                        height: '40px'

                                    },
                                }),
                            ]);
                        }
                    },
                    {
                        title: '店铺名称',
                        align: 'center',
                        key: 'shopName',
                        editable: true
                    },
                    {
                        title: '店铺banner',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('img', {
                                    attrs: {
                                        src:'http://47.91.247.228:8989/viCoin/image/imageFile/'+ params.row.shopBanner
                                    },
                                    style: {
                                        width: '40px',
                                        height: '40px'

                                    },
                                    // on: {
                                    //     click: () => {
                                    //         this.handleView('http://47.91.247.228:8989/viCoin/image/imageFile/' + params.row.shopBanner)
                                    //     }
                                    // }
                                }),
                            ]);
                        }
                    },
                    {
                        title: '店铺状态',
                        align: 'center',
                        key: 'shopState',
                        render:(h,params)=>{
                          if(params.row.shopState == 'normal'){
                              return  '正常'
                          }else if(params.row.shopState == 'locking'){
                              return  '锁定'
                          }else if(params.row.shopState == 'delete'){
                              return  '已删除'
                          }else if(params.row.shopState == 'notopen'){
                              return  '未开通'
                          }else{
                              return '其他'
                          }
                        }
                    },
                    {
                        title: '店铺精选',
                        align: 'center',
                        key: 'shopChoice',
                        render: (h, params) => {
                            if(params.row.shopChoice == 'yes'){
                                return  '是'
                            }else{
                                return  '否'
                            }
                        }
                    },
                    {
                        title: '操作',
                        align: 'center',
                        width: 140,
                        render: (h, params) => {

                          if(params.row.shopChoice == 'yes'){
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
                                              this.xj(params)
                                          }
                                      }
                                  }, '取消精选')
                              ])
                          }else{
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
                                              this.ty(params)
                                          }
                                      }
                                  }, '设为精选')
                              ])
                          }

                        }
                    }
                ],
                shopId: '',
                shopName:'',
                shopState:'',
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
          // handleView (index) {
          //     this.imgName = index;
          //     this.visible = true;
          // },
            load (index){
                let _this = this
                let params = new URLSearchParams()
                if(index == '1'){
                    _this.initPage = 1
                }
                if(_this.shopChoice == '1'){
                  _this.shopChoice = ''
                }
                params.append('pageNo',_this.initPage)
                params.append('shopId',_this.shopId)
                params.append('shopName',_this.shopName)
                params.append('shopChoice',_this.shopChoice)

                $http.post('a/shop/shop/findShopSearch',params).then(function (res) {
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
            ty(res){
                let _this = this
                _this.loading = true
                let params = new URLSearchParams()
                params.append('shopId',res.row.shopId)

                $http.post('a/shop/shop/updateShopChoice',params).then(function (res) {
                    if(res.status == '200'){
                        _this.load()
                        _this.$Message.info('设为精选成功!')
                    }else{
                        _this.$Message.error(res.messages)
                        _this.load()
                    }
                })
            },
            xj(res){
                let _this = this
                _this.loading = true
                let params = new URLSearchParams()
                params.append('shopId',res.row.shopId)

                $http.post('a/shop/shop/deleteShopChoice',params).then(function (res) {
                    if(res.status == '200'){
                        _this.load()
                        _this.$Message.info('取消精选成功!')
                    }else{
                        _this.$Message.error(res.messages)
                    }
                })
            }
        }
    }
</script>
<style>
.ivu-form-item {
    margin-bottom: 5px;
}
</style>
