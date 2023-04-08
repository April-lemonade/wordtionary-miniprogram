// logs.js
import * as echarts from '../../ec-canvas/echarts';

const util = require('../../utils/util.js')

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  // const option = {
  //   tooltip: {
  //     position: 'top',
  //     formatter: function (p) {
  //       const format = echarts.time.format(p.data[0], '{yyyy}-{MM}-{dd}', false);
  //       return format + ': ' + p.data[1];
  //     }
  //   },
  //   visualMap: {
  //     min: 0,
  //     max: 1000,
  //     calculable: true,
  //     orient: 'horizontal',
  //     top: '70px'
  //   },
  //   calendar: [
  //     {
  //       left: 50,
  //       top:100,
  //       cellSize: [30, 20],
  //       bottom: 0,
  //       orient: 'vertical',
  //       range: '2023',
  //       dayLabel: {
  //         margin: 5
  //       },
  //       yearLabel: { show: false }
  //     }
  //   ],
  //   series: [
  //     {
  //       type: 'heatmap',
  //       coordinateSystem: 'calendar',
  //       calendarIndex: 0,
  //       data: getVirtualData('2023'),
  //     }
  //   ]
  // };

  const option = {
    tooltip: {
      position: 'top',
      formatter: function (p) {
        const format = echarts.time.format(p.data[0], '{yyyy}-{MM}-{dd}', false);
        return format + ': ' + p.data[1];
      }
    },
    visualMap: {
      min: 0,
      max: 1000,
      calculable: true,
      orient: 'horizontal',
      left: 100,
      top: 20,
      show: false
    },
    calendar: {
      orient: 'vertical',
      yearLabel: {
        show: false
      },
      dayLabel: {
        firstDay: 1,
        nameMap: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      },
      monthLabel: {
        nameMap: 'cn',
        margin: 20
      },
      cellSize: 30,
      top: 90,
      left: 50,
      range: '2017-09'
    },
    series: {
      type: 'heatmap',
      coordinateSystem: 'calendar',
      data: getVirtualData('2017')
    }
  };

  function getVirtualData(year) {
    const date = +echarts.time.parse(year + '-01-01');
    const end = +echarts.time.parse(+year + 1 + '-01-01');
    const dayTime = 3600 * 24 * 1000;
    const data = [];
    for (let time = date; time < end; time += dayTime) {
      data.push([
        echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
        Math.floor(Math.random() * 1000)
      ]);
    }
    return data;
  }
  chart.setOption(option);
  return chart;
}
const app = getApp()
Page({
  data: {
    // logs: []
    image: 'https://tdesign.gtimg.com/miniprogram/images/avatar1.png',
    tabPanelstyle: '',
    avatarUrl: '',
    name: '',
    ec: {
      onInit: initChart
    }
  },
  onLoad() {
    this.setData({
      // logs: (wx.getStorageSync('logs') || []).map(log => {
      //   return {
      //     date: util.formatTime(new Date(log)),
      //     timeStamp: log
      //   }
      // })
      avatarUrl: app.globalData.userInfo.avatarUrl,
      name: app.globalData.userInfo.nickName
    })
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        // selected: 1,
        value: '/pages/me/index'
      })
    }
  }
})