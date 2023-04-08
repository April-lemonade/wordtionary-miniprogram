// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    animationType: "animated bounceInUp",
    showConfirm: true,
    confirmBtn: {
      content: '确定',
      variant: 'base'
    },
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    word: {
      word: 'Test',
      bri: '/saʊnd/',
      uni: '/saʊnd/'
    }
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    let that = this
    wx.getUserProfile({
      desc: '展示用户信息',
      success: (res) => {
        console.log(res)
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        wx.login({
          success(res) {
            if (res.code) {
              //发起网络请求
              wx.request({
                url: 'http://localhost:2346/user/login',
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "POST",
                data: {
                  code: res.code
                },
                success(res) {
                  console.log(res)
                  app.globalData.wordId = res.data.wordId,
                    app.globalData.bookId = res.data.bookId
                }
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      }
    })
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        value: '/pages/index/index'
      })
    }
  }
})