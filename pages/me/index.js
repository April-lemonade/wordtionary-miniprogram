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
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    tabPanelstyle: '',
    avatarUrl: 'https://tdesign.gtimg.com/miniprogram/images/avatar1.png',
    name: '',
    ec: {
      onInit: initChart
    }
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },

  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        // selected: 1,
        value: '/pages/me/index'
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          avatarUrl:res.userInfo.avatarUrl,
          name:res.userInfo.nickName,
          hasUserInfo: true
        })
      }
    })
  },
})