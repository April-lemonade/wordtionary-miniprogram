// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    let that = this
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://121.40.140.72:2346/user/login',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
              code: res.code
            },
            success(res) {
              console.log(res)
              that.globalData.openid = res.data.id,
                that.globalData.wordId = res.data.wordId,
                that.globalData.bookId = res.data.bookId,
                that.globalData.dictionaryId = res.data.dictionaryId,
                that.globalData.userInfo = res.data
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    bookId: 0,
    wordId: 0,
    openid: '',
    wordList: [],
    allCount: 0,
    dictionaryId: 0
  },

})