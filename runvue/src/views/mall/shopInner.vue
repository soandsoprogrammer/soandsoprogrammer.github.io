<style lang="less">
    @import '../../styles/common.less';
    @import '../tables/components/table.less';
</style>
<template>
    <div>
        <form action="" style="margin: 5px 0;overflow: hidden">
            <!--<Input v-model="name" icon="search"  placeholder="根据用户名查找" @on-click="searchName" style="width: 200px;margin-right: 3px;"></Input>-->
            <!--<Input v-model="phone" icon="search" placeholder="根据手机号查找" @on-click="searchPhone" style="width: 200px"></Input>-->
            <Button type="info" style="float: right;margin-right: 5px" @click="addUser">添加</Button>
        </form>
        <Table :loading="loading" refs="table1"  :data="Message" :columns="columnsList"></Table>
        <Page :total="pageNum" style="text-align: center;margin-top: 15px;"  @on-change="pageChange"></Page>
        <Modal
                v-model="modal1"
                title="创建新用户"
        >
            <Form ref="addValidate" :model="addInner" :rules="addValidate"  :label-width="100">
                <Row :gutter="16">
                    <Col span="12">
                    <FormItem label="关联商品ID"  prop="shoppingId">
                        <Input v-model="addInner.shoppingId" :disabled="openList? true : false"   style="margin-right: 3px;"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="品牌商标" prop="trademark">
                        <Input v-model="addInner.trademark"   style="margin-right: 3px;"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                    <FormItem label="商品名称" prop="productName">
                        <Input v-model="addInner.productName"   style="margin-right: 3px;"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="商品毛重" prop="weight">
                        <Input v-model="addInner.weight"   style="margin-right: 3px;"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                    <FormItem label="原产地" prop="originAddress">
                        <Input v-model="addInner.originAddress"   style="margin-right: 3px;"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="香型" prop="odroType">
                        <Input v-model="addInner.odroType"   style="margin-right: 3px;"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                    <FormItem label="包装风格" prop="packaging">
                        <Input v-model="addInner.packaging"   style="margin-right: 3px;"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="容量" prop="capacity">
                        <Input v-model="addInner.capacity"   style="margin-right: 3px;"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                    <FormItem label="度数" prop="wineDegree">
                        <Input v-model="addInner.wineDegree"   style="margin-right: 3px;"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <div style="line-height: 58px;">
                    <label class="ivu-form-item-label" style="width:80px;text-align: right;vertical-align: middle;float: left;font-size: 12px;color: #495060;line-height:36px;padding: 10px 12px 10px 0;box-sizing: border-box;">上传封面</label>
                    <div class="demo-upload-list" v-if="titleImg" v-for="list in titleImg">
                        <img :src="list">
                        <div class="demo-upload-list-cover">
                            <Icon type="ios-eye-outline" @click.native="handleView()"></Icon>
                        </div>
                    </div>
                    <div class="ivu-upload" @click="files" style="display: inline-block; width: 58px;"><div class="ivu-upload ivu-upload-drag"><input type="file" multiple="multiple" class="ivu-upload-input"> <div style="width: 58px; height: 58px; line-height: 58px;"><i class="ivu-icon ivu-icon-camera" style="font-size: 20px;"></i></div></div>  <!----></div>
                </div>
                <input style="display: none" id="filed"  @change="imgs" type="file">
            </Form>
            <div slot="footer">
                <Button type="primary" @click="add('addValidate')">保存</Button>
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
                titleImg:[],
                columnsList: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 80,
                        align: 'center'
                    },
                    {
                        title: '关联商品ID',
                        align: 'center',
                        key: 'shoppingId',
                        editable: true
                    },
                    {
                        title: '品牌商标',
                        align: 'center',
                        key: 'trademark'
                    },
                    {
                        title: '商品名称',
                        align: 'center',
                        key: 'productName',
                        editable: true
                    },
                    {
                        title: '商品编号',
                        align: 'center',
                        key: 'productId',
                        editable: true
                    },
                    {
                        title: '商品毛重',
                        align: 'center',
                        key: 'weight',
                        editable: true
                    },
                    {
                        title: '原产地',
                        align: 'center',
                        key: 'originAddress',
                        editable: true
                    },
                    {
                        title: '香型',
                        align: 'center',
                        key: 'odroType',
                        editable: true
                    },
                    {
                        title: '包装风格',
                        align: 'center',
                        key: 'packaging',
                        editable: true
                    },
                    {
                        title: '容量',
                        align: 'center',
                        key: 'capacity',
                        editable: true
                    },
                    {
                        title: '度数',
                        align: 'center',
                        key: 'wineDegree',
                        editable: true
                    },
                    {
                        title: '操作',
                        align: 'center',
                        width: 140,
                        render: (h, params) => {
                            if(this.admin){
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.change(params)
                                            }
                                        }
                                    }, '编辑'),
                                    h('Button', {
                                        props: {
                                            type: 'error',
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
                                    }, '删除')
                                ]);
                            }
                        }
                    }
                ],
                initPage:1,
                openList:1,
                pageNum:1,
                addInner:{
                    id:'',
                    shoppingId:'',
                    trademark:'',
                    productName:'',
                    weight:'',
                    originAddress:'',
                    odroType:'',
                    packaging:'',
                    capacity:'',
                    wineDegree:'',
                    pic:''
                },
                addValidate: {
                    shoppingId: [
                        { required: true, message: '关联ID不得为空', trigger: 'blur' }
                    ],
                    trademark: [
                        { required: true, message: '品牌商标不得为空', trigger: 'blur' }
                    ],
                    productName: [
                        { required: true, message: '商品名称不得为空', trigger: 'blur' }
                    ],
                    shoppingIds: [
                        { required: true,  message: '关联商品ID为空', trigger: 'blur'}
                    ],
                    weight: [
                        { required: true, message: '商品毛重不得为空', trigger: 'blur' }
                    ],
                    originAddress: [
                        { required: true, message: '原产地不得为空', trigger: 'blur' }
                    ],
                    odroType: [
                        { required: true, message: '香型不得为空', trigger: 'blur' }
                    ],
                    packaging: [
                        { required: true, message: '包装风格不得为空', trigger: 'blur' }
                    ],
                    capacity: [
                        { required: true, message: '容量不得为空', trigger: 'blur' }
                    ],
                    wineDegree: [
                        { required: true, message: '度数不得为空', trigger: 'blur' }
                    ],
                    pic: [
                        { required: true, message: '图片不得为空', trigger: 'blur' }
                    ],
                    shoppingIds: [
                        { required: true, message: '品牌商标不得为空', trigger: 'blur' }
                    ]
                },
                titleStr:''
        }
        },
        created: function () {
            this.load()
        },
        methods: {
            load (){
                let _this = this
                let params = new URLSearchParams()
                params.append('pno',_this.initPage)
                $http.post('/shopping/listPresentation',params).then(function (res) {
                    _this.Message = res.result.list
                    _this.pageNum = res.result.totalRow
                    _this.loading = false
                    console.log(res)
                })
            },
            pageChange(index){
                this.initPage = index
                this.load ()
            },
            info(index){
                console.log(index)
                var _this = this
                let params = new URLSearchParams()
                params.append('id',index.row.id)
                $http.post('/shopping/deletePresentation',params,).then(function (res) {
                    if(res.suc){
                        _this.$Message.info('删除成功!')
                        _this.load()
                    }else{
                        _this.$Message.error('删除失败!')
                    }
                })
            },
            change(index){
                this.$refs['addValidate'].resetFields()
                this.openList = 1
                this.modal1 = true
                this.addInner.id = index.row.id
                this.addInner.shoppingId = index.row.shoppingId + ''
                this.addInner.trademark = index.row.trademark
                this.addInner.productName = index.row.productName
                this.addInner.weight = index.row.weight
                this.addInner.originAddress = index.row.originAddress
                this.addInner.odroType = index.row.odroType
                this.addInner.packaging = index.row.packaging
                this.addInner.capacity = index.row.capacity
                this.addInner.wineDegree = index.row.wineDegree
                console.log(index.row.presentationPicture)
                if(typeof index.row.presentationPicture  === 'string'){
                    this.titleImg = JSON.parse(index.row.presentationPicture )
                }else{
                    this.titleImg = index.row.presentationPicture
                }
            },
            add(name){
                let _this = this
                if(_this.titleImg){
                    _this.$refs[name].validate((valid) => {
                        if (valid) {
                            let params = new FormData()
                            params.append('shoppingId',_this.addInner.shoppingId)
                            params.append('trademark',_this.addInner.trademark)
                            params.append('productName',_this.addInner.productName)
                            params.append('weight',_this.addInner.weight)
                            params.append('originAddress',_this.addInner.originAddress)
                            params.append('odroType',_this.addInner.odroType)
                            params.append('packaging',_this.addInner.packaging)
                            params.append('capacity',_this.addInner.capacity)
                            params.append('wineDegree',_this.addInner.wineDegree)
                            if(_this.openList == 1){
                                params.append('id',_this.addInner.id)
                                params.append('presentationPicture', JSON.stringify(_this.titleImg))
                                $http.post('/shopping/updatePresentation',params,{
                                    headers:{
                                        'Content-Type':'multipart/form-data'
                                    }
                                }).then(function (res) {
                                   if(res.suc){
                                       _this.$Message.info('修改成功!')
                                       _this.modal1 = false
                                       _this.load()
                                   }else{
                                       _this.$Message.error(res.msg)
                                   }
                                })
                            }else{
                                params.append('presentationPicture',JSON.stringify(_this.titleImg))
                                $http.post('/shopping/addPresentation',params,{
                                    headers:{
                                        'Content-Type':'multipart/form-data'
                                    }
                                }).then(function (res) {
                                    if(res.suc){
                                        _this.$Message.info('添加成功!')
                                        _this.modal1 = false
                                        _this.load()
                                    }else{
                                        _this.$Message.error(res.msg)
                                    }
                                })
                            }
                        } else {
                            _this.$Message.error('信息填写有误!')
                        }
                    })
                }else{
                    _this.$Message.error('图片!')
                }
            },
            addUser(){
                this.$refs['addValidate'].resetFields()
                this.openList = 0
                this.addInner.shoppingId = ''
                this.addInner.trademark = ''
                this.addInner.productName = ''
                this.addInner.weight = ''
                this.addInner.originAddress = ''
                this.addInner.odroType = ''
                this.addInner.packaging = ''
                this.addInner.capacity = ''
                this.addInner.wineDegree = ''
                this.addInner.pic =''
                this.titleImg = []
                this.modal1 = true
            },
            files(){
                document.getElementById("filed").click()
            },
            imgs () {
                let _this = this
                let params = new FormData()
                params.append('pic', document.getElementById('filed').files[0])
                $http.post('/shopping/addFile', params, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(function (res) {
                    if (res.suc) {
                        _this.titleImg.push(res.result)
                        console.log(_this.titleImg)

                        _this.$Message.info('图片上传成功!')
                    } else {
                        _this.$Message.error('图片上传失败!')
                    }
                })
            }
        }
    }
</script>
<style>
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>

