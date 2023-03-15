<template>

  <!--  main charts  -->
  <el-row class="row-bg" justify="space-evenly">
    <!--    <el-col :span="2">-->
    <!--      <div class="grid-content ep-bg-purple"/>-->
    <!--    </el-col>-->
    <el-col :span="24">
      <!--      <div class="grid-content ep-bg-purple-light" style=" position: relative;"/>-->
      <div id="main" class="border" style="width: 1400px;height:750px;margin: auto"></div>
    </el-col>
    <!--    <el-col :span="2">-->
    <!--      <div class="grid-content ep-bg-purple"/>-->
    <!--    </el-col>-->
  </el-row>

  <!--  pie charts  -->
  <el-row>
    <el-col :span="24">
      <div class="grid-content ep-bg-purple-dark"/>
      <div id="pie" style="width: 800px;height:800px;margin: auto"></div>
    </el-col>
  </el-row>

  <!--  calendar charts-->
  <el-row>
    <el-col :span="24">
      <div class="grid-content ep-bg-purple-dark"/>
      <div id="calendar" style="width: 800px;height:800px;margin: auto"></div>
    </el-col>
  </el-row>

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
    tooltip: {
      trigger: 'item',
      alwaysShowContent: true,
      formatter: function (a) {
        var str = 'Index:';
        return str.concat(
            a.name + '.\n\n' + ' Server Number:',
            a.value + '\n\n'
        );
      }
    },
    title: {
      text: 'Server Rooms Status',
      left: 'center',
      top: 0,
      textStyle: {
        color: 'white',
        fontFamily: '黑体',
        fontSize: 28
      }
    },
    visualMap: {
      show: false,
      min: 1000,
      max: 1100000,
      // splitNumber: 5,
      color: ['#d94e5d', '#eac736', '#50a3ba'],     //此种写法是echart2的写法，不推荐使用，但是可以使用，能生效
      // inRange: {     //这种写法才是目前主流的写法
      //   // color: ['#9ACCFF', '#0091FE', '#0080FF', '#1751B2', '#013998'],
      //   color: ['#de348f', '#56a92d', '#9a4f1a', '#074dbb', '#013998'],
      // },
    },
    series: [
      {
        // name: 'Server Rooms',
        type: 'treemap',
        label: {
          show: true,
          position: 'inside',
          color: 'white',
          fontSize: 20
        },
        color: [
          '#FFC0CB',
          '#D8BFD8',
          '#B0C4DE',
          '#87CEEB',
        ],
        data: [
          {
            name: 'ROOM',
            value: 1,
            children: [
              {
                name: 'room1',
                value: 240,
                url: "/server_table",
              },
              {
                name: 'room2',
                value: 200,
                url: "/server_table",
              },
              {
                name: 'room3',
                value: 150,
                url: "/server_table",
              },
              {
                name: 'room4',
                value: 100,
                url: "/server_table",
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
      text: 'Server Room Pie',
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


  type EChartsOption = echarts.EChartsOption;

  var chartDom3 = document.getElementById('calendar')!;
  var myChart3 = echarts.init(chartDom3);
  var option3: EChartsOption;

  function getVirtualData(year: string) {
    const date = +echarts.time.parse(year + '-01-01');
    const end = +echarts.time.parse(+year + 1 + '-01-01');
    const dayTime = 3600 * 24 * 1000;
    const data: [string, number][] = [];
    for (let time = date; time < end; time += dayTime) {
      data.push([
        echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
        Math.floor(Math.random() * 1000)
      ]);
    }
    return data;
  }

  const graphData = [
    ['2017-02-01', 260],
    ['2017-02-04', 200],
    ['2017-02-09', 279],
    ['2017-02-13', 847],
    ['2017-02-18', 241],
    ['2017-02-23', 411],
    ['2017-02-27', 985]
  ];

  const links = graphData.map(function (item, idx) {
    return {
      source: idx,
      target: idx + 1
    };
  });
  links.pop();

  option3 = {
    tooltip: {
      position: 'top'
    },

    visualMap: [
      {
        min: 0,
        max: 1000,
        calculable: true,
        seriesIndex: [2, 3, 4],
        orient: 'horizontal',
        left: '55%',
        bottom: 20
      },
      {
        min: 0,
        max: 1000,
        inRange: {
          color: ['grey'],
          opacity: [0, 0.3]
        },
        controller: {
          inRange: {
            opacity: [0.3, 0.6]
          },
          outOfRange: {
            color: '#ccc'
          }
        },
        seriesIndex: [1],
        orient: 'horizontal',
        left: '10%',
        bottom: 20
      }
    ],

    calendar: [
      {
        orient: 'vertical',
        yearLabel: {
          margin: 40
        },
        monthLabel: {
          nameMap: 'cn',
          margin: 20
        },
        dayLabel: {
          firstDay: 1,
          nameMap: 'cn'
        },
        cellSize: 40,
        range: '2017-02'
      },
      {
        orient: 'vertical',
        yearLabel: {
          margin: 40
        },
        monthLabel: {
          margin: 20
        },
        cellSize: 40,
        left: 460,
        range: '2017-01'
      },
      {
        orient: 'vertical',
        yearLabel: {
          margin: 40
        },
        monthLabel: {
          margin: 20
        },
        cellSize: 40,
        top: 350,
        range: '2017-03'
      },
      {
        orient: 'vertical',
        yearLabel: {
          margin: 40
        },
        dayLabel: {
          firstDay: 1,
          nameMap: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        },
        monthLabel: {
          nameMap: 'cn',
          margin: 20
        },
        cellSize: 40,
        top: 350,
        left: 460,
        range: '2017-04'
      }
    ],

    series: [
      {
        type: 'graph',
        edgeSymbol: ['none', 'arrow'],
        coordinateSystem: 'calendar',
        links: links,
        symbolSize: 10,
        calendarIndex: 0,
        data: graphData
      },
      {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: getVirtualData('2017')
      },
      {
        type: 'effectScatter',
        coordinateSystem: 'calendar',
        calendarIndex: 1,
        symbolSize: function (val) {
          return val[1] / 40;
        },
        data: getVirtualData('2017')
      },
      {
        type: 'scatter',
        coordinateSystem: 'calendar',
        calendarIndex: 2,
        symbolSize: function (val) {
          return val[1] / 60;
        },
        data: getVirtualData('2017')
      },
      {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        calendarIndex: 3,
        data: getVirtualData('2017')
      }
    ]
  };

  option3 && myChart3.setOption(option3);


  myChart.on('dblclick', function (parmas) {
    console.log(parmas.data)
    if (parmas.name == "room1") {
      window.location.href = parmas.data.url;
    }
    if (parmas.name == "room2") {
      window.location.href = parmas.data.url;
    }
    if (parmas.name == "room3") {
      window.location.href = parmas.data.url;
    }
    if (parmas.name == "room4") {
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
  border: 2px solid #181818;
}

</style>