<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";
</style>
<template>
    <div class="home-main">
        <Row :gutter="10">
            <Col :md="24" :lg="8">
                <Row class-name="home-page-row1" :gutter="10">
                    <Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
                        <Card>
                            <Row type="flex" class="user-infor">
                                <Col span="24" style="padding-left:6px;">
                                    <Row class-name="made-child-con-middle" type="flex" align="middle">
                                        <div  style="width:100%;">
                                            <p style="text-align: center"><b class="card-user-infor-name">{{username}}</b></p>
                                            <p style="text-align: center">{{dengji}}</p>
                                        </div>
                                    </Row>
                                </Col>
                            </Row>
                            <div class="line-gray"></div>
                            <Row class="margin-top-8">
                                <Col span="8"><p class="notwrap">本次登录时间:</p></Col>
                                <Col span="16" class="padding-left-8">{{loginTime}}</Col>
                            </Row>
                            <Row class="margin-top-8">
                                <Col span="8"><p class="notwrap">本次登录IP:</p></Col>
                                <Col span="16" class="padding-left-8">{{loginAsd}}</Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
                        <Card>
                            <p slot="title" class="card-title">
                                <Icon type="android-checkbox-outline"></Icon>
                                登录日志</p>
                            <!--<a type="text" slot="extra" @click.prevent="addNewToDoItem">-->
                                <!--<Icon type="plus-round"></Icon>-->
                            <!--</a>-->
                            <!--<div class="to-do-list-con">-->
                                <!--<div v-for="(item, index) in toDoList" :key="'todo-item' + (toDoList.length - index)" class="to-do-item">-->
                                    <!--<to-do-list-item :content="item.title"></to-do-list-item>-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--<Table width="100%" :loading="loading" refs="table1"  :data="Message" :columns="columnsList"></Table>-->
                            <div style="width: 100%;height: 150px;overflow: auto">
                                <table  class="ivu-table"  cellspacing="0" cellpadding="0" border="0" width="100%;" >
                                    <tr >
                                        <th style="text-align: center">用户名</th>
                                        <th style="text-align: center">登录IP</th>
                                        <th style="text-align: center">登录时间</th>
                                    </tr>
                                    <tr v-for="list in Message">
                                        <td style="text-align: center">{{list.name}}</td>
                                        <td style="text-align: center">{{list.loginip}}</td>
                                        <td style="text-align: center">{{list.logintime}}</td>
                                    </tr>
                                </table>
                            </div>

                        </Card>
                    </Col>
                </Row>
            </Col>
            <Col :md="24" :lg="16">
                <Row :gutter="5">
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="asd"
                            :end-val="count.createUser"
                            iconType="cash"
                            color="#2d8cf0"
                            intro-text="今日产币"
                        ></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="visit_count"
                            :end-val="count.visit"
                            iconType="ios-eye"
                            color="#64d572"
                            :iconSize="50"
                            intro-text="今日注册 "
                        ></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="pricetag"
                            :end-val="count.collection"
                            iconType="arrow-swap"
                            color="#ffd572"
                            intro-text="今日充值USDT"
                        ></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="transfer_count"
                            :end-val="count.transfer"
                            iconType="shuffle"
                            color="#f25e43"
                            intro-text="今日兑换积分"
                        ></infor-card>
                    </Col>
                </Row>
                <Row>
                    <Card :padding="0">
                        <p slot="title" class="card-title">
                            <Icon type="map"></Icon>
                            矿机总览
                        </p>
                        <div class="map-con millBody">
                            <!--<Col span="10">-->
                                <!--<map-data-table :cityData="cityData" height="281" :style-obj="{margin: '12px 0 0 11px'}"></map-data-table>-->
                            <!--</Col>-->
                            <!--<Col span="14" class="map-incon">-->
                                <!--<Row type="flex" justify="center" align="middle">-->
                                    <!--<home-map :city-data="cityData"></home-map>-->
                                <!--</Row>-->
                            <!--</Col>-->
                            <div class="millWrap">
                                <p class="millTitle">
                                    V1
                                </p>
                                <div class="millMain">
                                    <p class="millInner">{{millObj.num1}}</p>
                                </div>
                                <p>剩余量</p>
                                <p class="millNum">{{millObj.v1}}</p>
                            </div>
                            <div class="millWrap">
                                <p class="millTitle">
                                    V2
                                </p>
                                <div class="millMain">
                                    <p class="millInner">{{millObj.num2}}</p>
                                </div>
                                <p>剩余量</p>
                                <p class="millNum">{{millObj.v2}}</p>
                            </div>
                            <div class="millWrap">
                                <p class="millTitle">
                                    V3
                                </p>
                                <div class="millMain">
                                    <p class="millInner">{{millObj.num3}}</p>
                                </div>
                                <p>剩余量</p>
                                <p class="millNum">{{millObj.v3}}</p>
                            </div>
                            <div class="millWrap">
                                <p class="millTitle">
                                    V4
                                </p>
                                <div class="millMain">
                                    <p class="millInner">{{millObj.num4}}</p>
                                </div>
                                <p>剩余量</p>
                                <p class="millNum">{{millObj.v4}}</p>
                            </div>
                            <div class="millWrap">
                                <p class="millTitle">
                                    总量
                                </p>
                                <div class="millMain">
                                    <p class="millInner">{{millObj.num4 /1+ millObj.num3 /1+millObj.num2 /1+ millObj.num1 /1}}</p>
                                </div>
                                <p>剩余量</p>
                                <p class="millNum">{{millObj.v4 /1+ millObj.v3 /1+ millObj.v2 /1+ millObj.v1 /1}}</p>
                            </div>
                        </div>
                    </Card>
                </Row>
            </Col>
        </Row>
        <Row :gutter="10" class="">
            <Col :md="24" :lg="8">
            <Card>
                <p slot="title">
                    <Icon type="paintbucket"></Icon>
                    今日开通矿机数量
                </p>
                <Row type="flex" justify="center" align="middle" class="countto-page-row" style="height:200px">
                    <div class="count-to-con">
                        <CountTo :endVal="sxf" :mainStyle="mainStyle" :countStyle="countStyle">
                            <!--<span slot="leftText">今日兑换积分:&nbsp;</span>-->
                            <span slot="rightText">&nbsp;</span>
                        </CountTo>
                    </div>
                </Row>
            </Card>
            </Col>
            <Col :md="24" :lg="16" :style="{marginBottom: '10px'}">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="android-map"></Icon>
                    平台总统计
                </p>
                <div class="data-source-row">
                    <visite-volume></visite-volume>
                </div>
            </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import cityData from './map-data/get-city-value.js';
import homeMap from './components/map.vue';
import dataSourcePie from './components/dataSourcePie.vue';
import visiteVolume from './components/visiteVolume.vue';
import serviceRequests from './components/serviceRequests.vue';
import userFlow from './components/userFlow.vue';
import countUp from './components/countUp.vue';
import CountTo from '../my-components/count-to/CountTo.vue';


import inforCard from './components/inforCard.vue';
import mapDataTable from './components/mapDataTable.vue';
import toDoListItem from './components/toDoListItem.vue';
import $http from '../../utils/axiosWrap';
import Cookies from 'js-cookie';
export default {
    name: 'home',
    components: {
        homeMap,
        dataSourcePie,
        visiteVolume,
        serviceRequests,
        userFlow,
        countUp,
        CountTo,
        inforCard,
        mapDataTable,
        username:'',
        dengji:'',
        toDoListItem,
        loginAsd:''
    },
    data () {
        return {
            loginTime:'',
            toDoList: [
                {
                    title: '去iView官网学习完整的iView组件'
                },
                {
                    title: '去iView官网学习完整的iView组件'
                },
                {
                    title: '去iView官网学习完整的iView组件'
                },
                {
                    title: '去iView官网学习完整的iView组件'
                },
                {
                    title: '去iView官网学习完整的iView组件'
                }
            ],
            count: {
                createUser: 0,
                visit: 0,
                collection: 0,
                transfer: 39503498
            },
            Message : [],
            millObj:{},
            cityData: cityData,
            showAddNewTodo: false,
            newToDoItemValue: '',
            mainStyle: {
                fontSize: '30px'
            },
            countStyle: {
                fontSize: '50px',
                color: '#dc9387'
            },
            mainStyle2: {
                fontSize: '22px'
            },
            countStyle2: {
                fontSize: '30px',
                color: '#dc9387'
            },
            sxf:''
        };
    },
    created () {
        let _this = this
        _this.username = Cookies.get('user')
           if (Cookies.get('access') == 0) {
               _this.dengji = '超级管理员'
           }else{
             _this.dengji = '普通管理员'
         }
        _this.loginTime =  Cookies.get('logintime')
        _this.loginAsd =  Cookies.get('address')

        let params = new URLSearchParams()
        params.append('pageNo','1')
        $http.post('a/login/getAdminLogin',params).then(function (res) {
            console.log(res)
            if(res.suc){
                _this.Message = res.result.content
            }else{

            }
        })
        $http.post('a/login/shopMinerUser',params).then(function (res) {
            //今日产币
            _this.count.createUser = res.result.dateCSA /1
            //今日注册
            _this.count.visit = res.result.dayNum /1
            //今日充值USDT
            _this.count.collection = res.result.dayusdt /1
            //今日兑换积分
            _this.count.transfer = res.result.dayjf / 1
            //今日开通矿机数量
            _this.sxf = res.result.dayMiner / 1

        })
        $http.post('a/login/Miner',params).then(function (res) {
//            console.log(res)
            _this.millObj = res.result

        })

    },
    computed: {
        avatorPath () {
            return localStorage.avatorImgPath;
        }
    },
    methods: {
        addNewToDoItem () {
            this.showAddNewTodo = true;
        },
        addNew () {
            if (this.newToDoItemValue.length !== 0) {
                this.toDoList.unshift({
                    title: this.newToDoItemValue
                });
                setTimeout(() => {
                    this.newToDoItemValue = '';
                }, 200);
                this.showAddNewTodo = false;
            } else {
                this.$Message.error('请输入待办事项内容');
            }
        },
        cancelAdd () {
            this.showAddNewTodo = false;
            this.newToDoItemValue = '';
        }
    }
};
</script>
<style>
    .millBody{
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .millWrap{
        width: 100px;
        height: 200px;
        /*background: red;*/
    }
    .millWrap p{
        text-align: center;
    }
    .millTitle{
        font-size: 20px;
        margin-bottom: 5px;
    }
    .millMain{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        line-height: 100px;
        border: 2px dashed rgb(45, 140, 240);
        margin-bottom: 10px;
    }
    .millInner{
        color: rgb(45, 140, 240);
        font-size: 20px;
    }
    .millNum{
        font-size: 20px;
    }

</style>
