// logs.js
import * as echarts from '../../ec-canvas/echarts';

function initChart1(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);
  var option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow' 
      }
    },
    legend: {},
    grid: {
      right: '10%',
      bottom: '3%',
      containLabel: true
    },
    yAxis: {
      type: 'value'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    series: [
      {
        name: '新学单词',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: [320, 302, 301, 334, 390, 330, 320]
      },
      {
        name: '复习单词',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: [820, 832, 901, 934, 1290, 1330, 1320]
      }
    ]
  };
  chart.setOption(option);
  return chart;
}

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr
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
  const range = getCurrentPages()[getCurrentPages().length - 1].data.yearMonth
  const data = getCurrentPages()[getCurrentPages().length - 1].data.data
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
      max: 500,
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
      range: range
    },
    series: {
      type: 'heatmap',
      coordinateSystem: 'calendar',
      data: data
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
      console.log(data)
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
    avatarUrl: '',
    name: '',
    ec: {
      onInit: initChart
    },
    ec1: {
      onInit: initChart1
    },
    yearMonth: '',
    data: [],
    currentTab: 0
  },
  onLoad() {
    let date = new Date()
    let that = this
    date = date.getFullYear() + '-' + (date.getMonth() + 1)
    this.setData({
      name: app.globalData.userInfo.name,
      avatarUrl: app.globalData.userInfo.avatarUrl,
      yearMonth: date
    })
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    wx.request({
      url: 'http://localhost:2346/record/getstatisics?openid=' + app.globalData.userInfo.id,
      success: (res) => {
        let arr = []
        for (let i = 0; i < res.data.length; i++) {
          arr.push([res.data[i].date, res.data[i].count])
        }
        that.setData({
          data: arr
        })
        console.log(this.data.data)
      }
    })
  },

  onShow: function () {
    this.onLoad()
    this.setData({
      name: app.globalData.userInfo.name,
      avatarUrl: app.globalData.userInfo.avatarUrl
    })
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        value: '/pages/me/index'
      })
    }
  },
  getUserProfile(e) {
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
          name: res.userInfo.nickName,
          hasUserInfo: true
        })
        app.globalData.userInfo = res
        wx.request({
          url: 'http://localhost:2346/user/saveinfo',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST",
          data: {
            avatarUrl: res.userInfo.avatarUrl,
            name: res.userInfo.nickName,
            openid: app.globalData.openid
          },
          success: (res) => {
            console.log(res)
          }
        })
      }
    })
  },
  onIconTap() {
    wx.navigateTo({
      url: '/pages/setting/setting',
    })
  },
  onTabsClick(e) {
    // console.log(e.detail)
    this.setData({
      currentTab: e.detail.value
    })
  }
})