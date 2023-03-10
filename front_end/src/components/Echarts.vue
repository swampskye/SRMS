<template>
<!--  <div id="main" style="width: 1000px;height:1000px;"></div>-->
  <div id="main" class="main_container" ></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import {onMounted} from "vue";
import {useRouter} from "vue-router";

type EChartsOption = echarts.EChartsOption;

onMounted(() => {

  var chartDom = document.getElementById('main')!;
  var myChart = echarts.init(chartDom);
  var option: EChartsOption;

  option = {
    series: [
      {
        name:'Server Rooms',
        type: 'treemap',
        data: [
          {
            name: 'nodeA', // First tree
            value: 10,
            children: [
              {
                name: 'nodeA1', // First leaf of first tree
                value: 4,
                url:"/table"
              },
              {
                name: 'nodeA2', // Second leaf of first tree
                value: 6
              }
            ]
          },
          {
            name: 'nodeB', // Second tree
            value: 20,
            children: [
              {
                name: 'nodeBa', // Son of first tree
                value: 20,
                children: [
                  {
                    name: 'nodeBa1', // Granson of first tree
                    value: 20
                  },
                  {
                    name: 'nodeBa2', // Granson of first tree
                    value: 10
                  },
                ]
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
}
</style>