<template>

<!--  <div id="main" class="main_container"></div>-->
    <div id="main" class="border" style="width: 1400px;height:750px;margin: auto"></div>

<!--    <el-row class="row-bg" justify="space-evenly">-->
<!--    <el-col :span="2">-->
<!--      <div class="grid-content ep-bg-purple"/>-->
<!--    </el-col>-->
<!--    <el-col :span="20">-->
<!--&lt;!&ndash;      <div class="grid-content ep-bg-purple-light" style=" position: relative;"/>&ndash;&gt;-->
<!--    <div id="main" class="border" style="width: 1400px;height:750px;margin-left: auto"></div>-->
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
.border{
    border: 5px solid #181818;
}
</style>