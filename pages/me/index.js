// logs.js
import * as echarts from '../../ec-canvas/echarts';

function initChart1(canvas, width, height, dpr) {
  const app = getApp()
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);
  const predict = getCurrentPages()[getCurrentPages().length - 1].data.predict
  const dateArray = getCurrentPages()[getCurrentPages().length - 1].data.dateArray
  const dailyCount = app.globalData.userInfo.dailyCount
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
      data: dateArray
    },
    series: [{
        name: '新学单词',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: [dailyCount, dailyCount, dailyCount, dailyCount, dailyCount, dailyCount, dailyCount]
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
        data: predict
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
    currentTab: 0,
    predict: [],
    dateArray: []
  },
  onLoad() {
    let date = new Date()
    let that = this
    date = date.getFullYear() + '-' + (date.getMonth() + 1)
    let today = new Date() //获取今天的日期
    let dateArray = []
    for (let i = 1; i <= 7; i++) {
      let today = new Date(); //每次循环将时间初始为当前时间
      let str = today.getDate() + i; //假设当前日期为4.28号
      today.setDate(str);
      console.log('日期', today);
      dateArray.push(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate());
    }
    console.log(dateArray)
    this.setData({
      name: app.globalData.userInfo.name,
      avatarUrl: app.globalData.userInfo.avatarUrl,
      yearMonth: date,
      dateArray: dateArray
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
    wx.request({
      url: 'http://localhost:2346/word/predict?openid=' + app.globalData.userInfo.id,
      success: (res) => {
        console.log(res)
        that.setData({
          predict: res.data
        })
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