<template>
    <div style="width:100%;height:100%;" id="qwevisite_volume_con"></div>
</template>

<script>
    import echarts from 'echarts';
    import $http from '../../../utils/axiosWrap';
    export default {
        name: 'userFlow',
        data () {
            return {
                usdAmount: 0,
                aitcLockAmount: 0,
                aitcUnlockAmount: 0,
                oreLockAmount: 0,
                oreUnlockAmount: 0,
                oreConsumeAmount: 0,
                integralConsumeAmount:0
            };
        },
        mounted () {
            let _this = this
            let params = new URLSearchParams()
            $http.post('a/login/shopMinerUser', params).then(function (res) {
                _this.usdAmount = res.result.usdAmount / 1
                _this.$nextTick(() => {
                    let visiteVolume = echarts.init(document.getElementById('qwevisite_volume_con'));
                    let xAxisData = [];
                    let data1 = [];
                    let data2 = [];
                    let Amount = _this.usdAmount
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
                            data: ['兑换积分','消费矿石','矿石释放','矿石锁仓','AITC释放', 'AITC锁仓','USD总量'],
                            nameTextStyle: {
                                color: '#c3c3c3'
                            }
                        },
                        series: [
                            {
                                name: '总量',
                                type: 'bar',
                                data: [
                                    {value: _this.usdAmount / 1, name: ' 兑换积分', itemStyle: {normal: {color: '#2d8cf0'}}},
                                    {value: _this.aitcLockAmount, name: '消费矿石', itemStyle: {normal: {color: '#2d8cf0'}}},
                                    {value: _this.aitcUnlockAmount, name: '矿石释放', itemStyle: {normal: {color: '#2d8cf0'}}},
                                    {value: _this.oreLockAmount, name: '矿石锁仓', itemStyle: {normal: {color: '#2d8cf0'}}},
                                    {value: _this.oreUnlockAmount, name: 'AITC释放', itemStyle: {normal: {color: '#2d8cf0'}}},
                                    {value: _this.oreConsumeAmount, name: ' AITC锁仓', itemStyle: {normal: {color: '#2d8cf0'}}},
                                    {value: _this.integralConsumeAmount, name: 'USD总量 ', itemStyle: {normal: {color: '#2d8cf0'}}}
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

