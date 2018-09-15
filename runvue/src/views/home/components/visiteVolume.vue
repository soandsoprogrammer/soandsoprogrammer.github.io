<template>
    <div style="width:100%;height:100%;" id="visite_volume_con"></div>
</template>

<script>
import echarts from 'echarts';
import $http from '../../../utils/axiosWrap';
export default {
    name: 'visiteVolume',
    data () {
        return {
            alljf: '',
            allusdt : '',
            csaall : '',
            findAlllocke : '',
            findAllCSA : '',
            shopNum:'',
            renum:'',
            partnerNum:''
        };
    },
    mounted () {
        let _this = this
        let params = new URLSearchParams()
        $http.post('a/login/shopMinerUser', params).then(function (res) {
            _this.alljf = parseInt(res.result.alljf)
            _this.allusdt = parseInt(res.result.allusdt)
            _this.csaall = parseInt(res.result.csaall)
            _this.findAlllocke = parseInt(res.result.findAlllocke)
            _this.findAllCSA = parseInt(res.result.findAllCSA)
            _this.shopNum = parseInt(res.result.shopNum)
            _this.renum = parseInt(res.result.renum)
            _this.partnerNum = parseInt(res.result.partnerNum)

            _this.$nextTick(() => {
                let visiteVolume = echarts.init(document.getElementById('visite_volume_con'));
                let xAxisData = [];
                let data1 = [];
                let data2 = [];
                let Amount = _this.usdAmount
                console.log(Amount)
                for (let i = 0; i < 20; i++) {
                    xAxisData.push('类目' + i);
                    data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
                    data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
                }
                const option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        top: 0,
                        left: '2%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01]
                    },
                    yAxis: {
                        type: 'category',
                        data: ['购机用户数量','注册用户数量','合作伙伴数量','兑换积分','CSA总量','USDT充值','币产量', '锁仓量'],
                        nameTextStyle: {
                            color: '#c3c3c3'
                        }
                    },
                    series: [
                        {
                            name: '总量',
                            type: 'bar',
                            data: [
                                {value: _this.shopNum, name: '购机用户数量', itemStyle: {normal: {color: '#2d8cf0'}}},
                                {value: _this.renum, name: '注册用户数量', itemStyle: {normal: {color: '#2d8cf0'}}},
                                {value: _this.partnerNum, name: '合作伙伴数量', itemStyle: {normal: {color: '#2d8cf0'}}},
                                {value: _this.alljf / 1, name: ' 兑换积分', itemStyle: {normal: {color: '#2d8cf0'}}},
                                {value: _this.csaall, name: 'CSA总量', itemStyle: {normal: {color: '#2d8cf0'}}},
                                {value: _this.allusdt, name: 'USDT充值', itemStyle: {normal: {color: '#2d8cf0'}}},
                                {value: _this.findAllCSA, name: '币产量', itemStyle: {normal: {color: '#2d8cf0'}}},
                                {value: _this.findAlllocke, name: '锁仓量', itemStyle: {normal: {color: '#2d8cf0'}}}
                            ]
                        }
                    ]
                };

                visiteVolume.setOption(option);

                window.addEventListener('resize', function () {
                    visiteVolume.resize();
                });
            });
        })
    }
};
</script>
