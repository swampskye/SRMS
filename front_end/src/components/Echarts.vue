<template>

  <!--  <div id="main" class="main_container"></div>-->
  <!--    <div id="main" class="border" style="width: 1400px;height:750px;margin: auto"></div>-->

  <!--  full view-->
  <el-row class="row-bg" justify="space-evenly" >
    <el-col :span="2">
      <div class="grid-content ep-bg-purple"/>
    </el-col>
    <el-col :span="20">
      <!--      <div class="grid-content ep-bg-purple-light" style=" position: relative;"/>-->
      <div id="main" class="border" style="width: 1400px;height:750px;margin: auto"></div>
    </el-col>
    <el-col :span="2">
      <div class="grid-content ep-bg-purple"/>
    </el-col>
  </el-row>

  <!--  small views-->
    <el-row>
    <el-col :span="24">
      <div class="grid-content ep-bg-purple-dark" />
      <div id="pie" style="width: 800px;height:800px;margin: auto"></div>
    </el-col>
  </el-row>

<!--  <el-row class="row-bg" justify="space-evenly">-->
<!--    <el-col :span="2">-->
<!--      <div class="grid-content ep-bg-purple"/>-->
<!--    </el-col>-->
<!--    <el-col :span="20">-->
<!--      &lt;!&ndash;      <div class="grid-content ep-bg-purple-light" style=" position: relative;"/>&ndash;&gt;-->
<!--      &lt;!&ndash;      <div id="main" class="border" style="width: 1400px;height:750px;margin: auto"></div>&ndash;&gt;-->
<!--      <div id="pie" class="border" style="width: 800px;height:800px;margin: auto"></div>-->
<!--    </el-col>-->
<!--    <el-col :span="2">-->
<!--      <div class="grid-content ep-bg-purple"/>-->
<!--    </el-col>-->
<!--  </el-row>-->
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import {onMounted} from "vue";

type EChartsOption = echarts.EChartsOption;

onMounted(() => {

  var chartDom = document.getElementById('main')!;
  var myChart = echarts.init(chartDom);
  var option: EChartsOption;

  option = {
    backgroundColor: '#2c343c',
    tooltip: {},
    visualMap: {     //有下面两种写法
      show: false,
      min: 1000,
      max: 1100000,
      // splitNumber: 5,
      // color: ['#d94e5d', '#eac736', '#50a3ba'],     //此种写法是echart2的写法，不推荐使用，但是可以使用，能生效
      inRange: {     //这种写法才是目前主流的写法
        color: ['#9ACCFF', '#0091FE', '#0080FF', '#1751B2', '#013998'],
      },
    },

    series: [
      {
        name: 'Server Rooms',
        type: 'treemap',
        data: [
          {
            name: 'nodeA', // First tree
            value: 10,
            children: [
              {
                name: 'nodeA1', // First leaf of first tree
                value: 4,
                url: "/server_table",
              },
              {
                name: 'nodeA2', // Second leaf of first tree
                value: 6,
              }
            ]
          },
          {
            name: 'nodeA', // First tree
            value: 10,
            children: [
              {
                name: 'nodeA1', // First leaf of first tree
                value: 5,
                url: "/server_table",
              },
              {
                name: 'nodeA2', // Second leaf of first tree
                value: 5,
              }
            ]
          }
        ]
      }
    ]
  };

  option && myChart.setOption(option);


  var chartDom2 = document.getElementById('pie');
  var myChart2 = echarts.init(chartDom2);
  var option2;

  option2 = {
    backgroundColor: '#2c343c',
    title: {
      text: 'Customized Pie',
      left: 'center',
      top: 20,
      textStyle: {
        color: '#ccc'
      }
    },
    tooltip: {
      trigger: 'item'
    },
    visualMap: {
      show: false,
      min: 80,
      max: 600,
      inRange: {
        colorLightness: [0, 1]
      }
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '55%',
        center: ['50%', '50%'],
        data: [
          {value: 335, name: 'Direct'},
          {value: 310, name: 'Email'},
          {value: 274, name: 'Union Ads'},
          {value: 235, name: 'Video Ads'},
          {value: 400, name: 'Search Engine'}
        ].sort(function (a, b) {
          return a.value - b.value;
        }),
        roseType: 'radius',
        label: {
          color: 'rgba(255, 255, 255, 0.3)'
        },
        labelLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)'
          },
          smooth: 0.2,
          length: 10,
          length2: 20
        },
        itemStyle: {
          color: '#c23531',
          shadowBlur: 200,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        },
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return Math.random() * 200;
        }
      }
    ]
  };

  option2 && myChart2.setOption(option2);


  myChart.on('dblclick', function (parmas) {
    console.log(parmas.data)
    if (parmas.name == "nodeA1") {
      window.location.href = parmas.data.url;
    }
  })
})


</script>

<style scoped>
.main_container {
  height: 80%;
  width: 60%;
  border: 5px solid #181818;
}

.border {
  border: 5px solid #181818;
}

</style>