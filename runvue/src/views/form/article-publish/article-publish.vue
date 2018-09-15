<style lang="less">
    @import '../../../styles/common.less';
    @import './article-publish.less';
</style>

<template>
    <div>
        <Row>
            <Col span="24">
            <Card>
                <Form  :label-width="80" style="height: 38px; width: 100%">
                    <FormItem label="商品分类" style="width: 300px;" >
                        <Select  v-model="name" style="margin-right: 3px;" >
                            <Option v-for="list in innerArrs" :value="list.catId">{{list.catName}}</Option>
                        </Select>
                    </FormItem>
                </Form>
                <Form :label-width="80">
                    <FormItem label="商品标题" :error="btError">
                        <Input v-model="bt" @on-blur="btBlur" icon="android-list"/>
                    </FormItem>
                </Form>
                <Form :label-width="80">
                    <FormItem label="商品规格" :error="ggError">
                        <Input v-model="gg" @on-blur="ggBlur" icon="android-list"/>
                    </FormItem>
                </Form>
                <Form :label-width="80">
                    <FormItem label="商品价格" :error="jgError">
                        <Input v-model="jg" @on-blur="jgBlur" icon="android-list"/>
                    </FormItem>
                </Form>
                <Form :label-width="80">
                    <FormItem label="商品库存" :error="kcError">
                        <Input v-model="kc" @on-blur="kcBlur" icon="android-list"/>
                    </FormItem>
                </Form>
                <Form :label-width="80" style="height: 40px;">
                    <Button type="info" style="float: right;margin-right: 5px" @click="addGg">添加此规格</Button>
                </Form>
                <table v-if="innerArr.length > 0" style="margin: 0 auto 20px;width: 100% !important;" class="ivu-table"  cellspacing="0" cellpadding="0" border="0">
                    <tr>
                        <th>规格名</th>
                        <th>规格价格</th>
                        <th>规格库存</th>
                        <th>操作</th>
                    </tr>
                    <tr v-for="(list,i) in innerArr">
                        <td>{{list.goodsgg}}</td>
                        <td>{{list.goodsggPrice}}</td>
                        <td>{{list.goodsggNum}}</td>
                        <td><Button type="error" style="" @click="delInnerArr(i)">删除</Button></td>
                    </tr>
                </table>
                <div style="line-height: 58px;">
                    <label class="ivu-form-item-label" style="width:80px;text-align: right;vertical-align: middle;float: left;font-size: 12px;color: #495060;line-height:36px;padding: 10px 12px 10px 0;box-sizing: border-box;">商品图片</label>
                    <div class="demo-upload-list" v-if="titleImg" v-for="(index,list) in titleImg">
                        <img :src="'http://www.chaincsa.com/viCoin/image/contractionImageFile/' + index">
                        <div class="demo-upload-list-cover">
                            <Icon type="ios-eye-outline" @click.native="handleView(list)"></Icon>
                            <Icon type="ios-trash-outline" @click.native="handleRemove(list)"></Icon>
                        </div>
                    </div>
                    <div class="ivu-upload" @click="fengmian" style="display: inline-block; width: 58px;"><div class="ivu-upload ivu-upload-drag"><input type="file" multiple="multiple" class="ivu-upload-input"> <div style="width: 58px; height: 58px; line-height: 58px;"><i class="ivu-icon ivu-icon-camera" style="font-size: 20px;"></i></div></div>  <!----></div>
                </div>
                <div style="line-height: 58px;">
                    <label class="ivu-form-item-label" style="width:80px;text-align: right;vertical-align: middle;float: left;font-size: 12px;color: #495060;line-height:36px;padding: 10px 12px 10px 0;box-sizing: border-box;">文本图片</label>
                    <div class="ivu-upload" @click="files" style="display: inline-block; width: 58px;"><div class="ivu-upload ivu-upload-drag"><input type="file" multiple="multiple" class="ivu-upload-input"> <div style="width: 58px; height: 58px; line-height: 58px;"><i class="ivu-icon ivu-icon-camera" style="font-size: 20px;"></i></div></div>  <!----></div>
                </div>
                <input style="display: none" id="fengmian" type="file"   @change="fengmianChange">
                <input style="display: none" id="filed" type="file"   @change="upFileChange">
                <div class="margin-top-20">
                    <textarea id="articleEditor" v-model="inner"></textarea>
                </div>
            </Card>
            </Col>
        </Row>
        <Col span="24">
        <Card>
            <p slot="title">
                <Icon type="paper-airplane"></Icon>
                发布
                </p>
            <Row class="">
                <span class="publish-button"><Button @click="handlePublish" :loading="publishLoading" icon="ios-checkmark" style="width:90px;" type="primary">发布</Button></span>
                <!--<span class="publish-button"><Button @click="handlePreview">预览</Button></span>-->
            </Row>
        </Card>
        </Col>
        <Modal title="图片预览" v-model="visible">
            <img :src="'http://www.chaincsa.com/viCoin/image/goodImageFile/' + imgName " v-if="visible" style="width: 100%">
        </Modal>
    </div>
</template>

<script>
    import tinymce from 'tinymce'
    import $http from '../../../utils/axiosWrap'
    let Base64 = require('js-base64').Base64;
    import Cookies from 'js-cookie'

    export default {
        name: 'artical-publish',
        data () {
            return {
                visible: false,
                innerArr:[],
                bt:'',
                jg:'',
                gg:'',
                kc:'',
                btError: '',
                jgError: '',
                ggError: '',
                kcError: '',
                showLink: false,
                fixedLink: '',
                articlePath: '',
                btPathHasEdited: false,
                ggPathHasEdited: false,
                jgPathHasEdited: false,
                kcPathHasEdited: false,
                publishTime: '',
                publishTimeType: 'immediately',
                editPublishTime: false, // 是否正在编辑发布时间
                classificationList: [],
                offenUsedClass: [],
                publishLoading: false,
                uploadList: [],
                imgName: '',
                imgUrl:[],
                name:'',
                titleImg: [],
                changeId: '',
                innerArrs:'',
                inner: ''
            };
        },
        created (){
            let innerIndex = JSON.parse(localStorage.getItem('changeInner'))
            this.articleTitle = innerIndex.biaoti
            this.articleZhaiyao = innerIndex.zhaiyao
            this.changeId = innerIndex.id
            if (innerIndex.pic) {
                this.titleImg = innerIndex.pic
            }
            this.inner = innerIndex.neirong
            var _this = this
            $http.post('/m/shop/good/findAllGoodsCat').then(function (res) {
                _this.innerArrs = res.data
            })
        },
        methods: {
            addGg(){
                this.innerArr.push({'goodsgg':this.gg,'goodsggPrice': this.jg, 'goodsggNum':this.kc})
            },
            delInnerArr(index){
                this.innerArr.splice(index,1)
            },
            btBlur () {
                if (this.bt.length !== 0) {
                    if (!this.btPathHasEdited) {
                        this.btPathHasEdited = true;
                        this.showLink = true;
                    }
                } else {
                    this.btError = '商品标题不可为空哦';
                    this.$Message.error('商品标题不可为空哦');
                }
            },
            ggBlur () {
                if (this.gg.length !== 0) {
                    if (!this.ggPathHasEdited) {
                        this.ggPathHasEdited = true;
                        this.showLink = true;
                    }
                } else {
                    this.ggError = '商品规格不可为空哦';
                    this.$Message.error('商品规格不可为空哦');
                }
            },
            jgBlur () {
                if (this.jg.length !== 0) {
                    if (!this.jgPathHasEdited) {
                        this.jgPathHasEdited = true;
                        this.showLink = true;
                    }
                } else {
                    this.jgError = '商品价格不可为空哦';
                    this.$Message.error('商品价格不可为空哦');
                }
            },
            kcBlur () {
                if (this.kc.length !== 0) {
                    if (!this.kcPathHasEdited) {
                        this.kcPathHasEdited = true;
                        this.showLink = true;
                    }
                } else {
                    this.kcError = '商品库存不可为空哦';
                    this.$Message.error('商品库存不可为空哦');
                }
            },
            handleEditOpenness () {
                this.editOpenness = !this.editOpenness;
            },
            handleSaveOpenness () {
                this.Openness = this.currentOpenness;
                this.editOpenness = false;
            },
            cancelEditOpenness () {
                this.currentOpenness = this.Openness;
                this.editOpenness = false;
            },
            handleEditPublishTime () {
                this.editPublishTime = !this.editPublishTime;
            },
            handleSavePublishTime () {
                this.publishTimeType = 'timing';
                this.editPublishTime = false;
            },
            cancelEditPublishTime () {
                this.publishTimeType = 'immediately';
                this.editPublishTime = false;
            },
            setPublishTime (datetime) {
                this.publishTime = datetime;
            },
            setClassificationInAll (selectedArray) {
                this.classificationFinalSelected = selectedArray.map(item => {
                    return item.title;
                });
            },
            setClassificationInOffen (selectedArray) {
                this.classificationFinalSelected = selectedArray;
            },
            handleAddNewTag () {
                this.addingNewTag = !this.addingNewTag;
            },
            canPublish () {
                if (!this.name) {
                    this.$Message.error('请选择分类');
                    return false;
                }
                if (!this.bt) {
                    this.$Message.error('请输入标题');
                    return false;
                }

                if (!this.titleImg) {
                    if (!document.getElementById('fengmian').files[0] ) {
                        this.$Message.error('请选择商品图片');
                        return false;
                    }
                }
                if (!this.innerArr) {
                    this.$Message.error('请输入规格');
                    return false;
                }
                if (!tinymce.activeEditor.getContent()) {
                    this.$Message.error('请输入内容');
                    return false;
                } else {
                    return true;
                }
            },
            handlePreview () {
                if (this.canPublish()) {
                    if (this.publishTimeType === 'immediately') {
                        let date = new Date();
                        let year = date.getFullYear();
                        let month = date.getMonth() + 1;
                        let day = date.getDate();
                        let hour = date.getHours();
                        let minute = date.getMinutes();
                        let second = date.getSeconds();
                        localStorage.publishTime = year + ' 年 ' + month + ' 月 ' + day + ' 日 -- ' + hour + ' : ' + minute + ' : ' + second;
                    } else {
                        localStorage.publishTime = this.publishTime; // 本地存储发布时间
                    }
                    localStorage.articleTitle = this.articleTitle;
                    localStorage.content = tinymce.activeEditor.getContent();
                    this.$router.push({
                        name: 'preview'
                    });
                }
            },
            handleSaveDraft () {
                if (!this.canPublish()) {
                    //
                }
            },
            handlePublish () {
                let _this = this
                if (_this.canPublish()) {
                    _this.publishLoading = true;
                    let params = new URLSearchParams()
                    params.append('goodCat', _this.name)
                    params.append('goodId','')
                    params.append('img', _this.titleImg)  //商品图片
                    params.append('goodName', _this.bt) //商品标题
                    params.append('goodIntro', tinymce.activeEditor.getContent())//内容
                    params.append('productss', JSON.stringify(_this.innerArr))//规格
                    params.append('adminid', Cookies.get('superId'))
                    $http.post('a/login/addGoods', params).then(function (res) {
                        if (res.suc) {
                            setTimeout(() => {
                                _this.publishLoading = false;
                                _this.$router.push({
                                    name: 'goodsList'
                                })
                                _this.$Notice.success({
                                    title: '保存成功',
                                    desc: '保存成功'
                                });
                            }, 1000);
                        } else {
                            _this.publishLoading = false;
                            _this.$Notice.error({
                                title: '保存失败',
                                desc: '保存失败'
                            });
                        }
                    })
                }
            },
            handleSelectTag () {
                localStorage.tagsList = JSON.stringify(this.articleTagSelected); // 本地存储文章标签列表
            },
            upFileChange () {
                var picStr = document.getElementById('filed').files[0].name.split('.')[1].toUpperCase()
                if(picStr != 'JPG' && picStr !='PNG'){
                    this.$Message.error('请上传图片!')
                }else{
                    var imgFile = new FileReader();
                    imgFile.readAsDataURL(document.getElementById('filed').files[0]);
                    imgFile.onload = function () {
                        var urls = this.result;   //base64数据
                        $("<img style='max-width:80%' src=" + urls + ">").appendTo(document.getElementById('articleEditor_ifr').contentWindow.document.getElementById('tinymce'))
                    }
                }
            },
            handleView (index) {
                this.imgName = this.titleImg[index];
                this.visible = true;
            },
            handleRemove (index) {
                console.log(index)
                this.titleImg.splice(index,1)
                this.imgUrl.splice(index,1)
            },
            files () {
                document.getElementById("filed").click()
            },
            fengmian () {
                document.getElementById("fengmian").click()
            },
            fengmianChange () {
                let _this = this
                if(_this.titleImg.length < 4){
                    let params = new FormData()
                    var picStr = document.getElementById('fengmian').files[0].name.split('.')[1].toUpperCase()
                    if(picStr != 'JPG' && picStr !='PNG') {
                        this.$Message.error('请上传图片!')
                    }else{
                        alert(1)
                        params.append('file',document.getElementById('fengmian').files[0])
                        $http.post('m/shop/good/ajaxUploadGoodImage', params).then(function (res) {
                            if (res.status == '200') {
//                                var imgFile = new FileReader();
//                                imgFile.readAsDataURL(document.getElementById('fengmian').files[0]);
//                                imgFile.onload = function () {
//                                    var urls = this.result; //base64数据
//                                    _this.titleImg.push(urls)
//                                }
                                _this.titleImg.push(res.data)
                                _this.$Message.info('图片上传成功!')
                            } else {
                                _this.$Message.error('图片上传失败!')
                            }
                        })
                    }

                }else{
                    this.$Message.error('最多上传4张图片！');
                }

            }
        },
        computed: {
            completeUrl () {
                let finalUrl = this.fixedLink + this.articlePath;
                localStorage.finalUrl = finalUrl; // 本地存储完整文章路径
                return finalUrl;
            }
        },
        mounted () {
            tinymce.init({
                selector: '#articleEditor',
                branding: false,
                elementpath: false,
                height: 600,
                language: 'zh_CN.GB2312',
                menubar: 'edit insert view format table tools',
                theme: 'modern',
                plugins: [
                    'advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools',
                    'searchreplace visualblocks visualchars code fullscreen fullpage',
                    'insertdatetime media nonbreaking save table contextmenu directionality',
                    'emoticons paste textcolor colorpicker textpattern imagetools codesample'
                ],
                toolbar1: ' newnote print fullscreen preview | undo redo | insert | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons media codesample',
                autosave_interval: '20s',
                image_advtab: true,
                table_default_styles: {
                    width: '100%',
                    borderCollapse: 'collapse'
                }
            });
        },
        destroyed () {
            tinymce.get('articleEditor').destroy();
        }
    };
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
    tr{
        line-height: 24px;
    }
    td,th{
        text-align: center !important;
        width: 160px;
    }
</style>
