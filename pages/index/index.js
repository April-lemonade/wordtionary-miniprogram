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
    bookId: 0,
    wordId: 0,
    word: {
      word: 'Test',
      bri: '/saʊnd/',
      uni: '/saʊnd/'
    },
    openid: '',
    loading: 1
  },
  onLoad() {
    // console.log(app.globalData.userInfo.bookId)
    let that = this
    if (!app.globalData.userInfo) {

      app.userInfoReadyCallback = res => {
        console.log(app.globalData.userInfo.bookId)
        that.setData({
          loading: 0,
          bookId: app.globalData.userInfo.bookId
        })
        if (app.globalData.userInfo.bookId != 0) {
          wx.request({
            url: 'http://localhost:2346/word/getwords?bookId=' + app.globalData.userInfo.bookId + "&wordId=" + app.globalData.userInfo.bookId,
            success: (res) => {
              console.log(res)
              app.globalData.wordList = res.data
              that.setData({
                word: res.data[0]
              })
            }
          })
        }
      }
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
        // wx.login({
        //   success(res) {
        //     if (res.code) {
        //       //发起网络请求
        //       wx.request({
        //         url: 'http://localhost:2346/user/login',
        //         header: {
        //           "Content-Type": "application/x-www-form-urlencoded"
        //         },
        //         method: "POST",
        //         data: {
        //           code: res.code
        //         },
        //         success(res) {
        //           console.log(res)
        //           app.globalData.wordId = res.data.wordId,
        //             app.globalData.bookId = res.data.bookId
        //         }
        //       })
        //     } else {
        //       console.log('登录失败！' + res.errMsg)
        //     }
        //   }
        // })
      }
    })
  },
  playbrisound(){
    const innerAudioContext = wx.createInnerAudioContext({
      useWebAudioImplement: true // 是否使用 WebAudio 作为底层音频驱动，默认关闭。对于短音频、播放频繁的音频建议开启此选项，开启后将获得更优的性能表现。由于开启此选项后也会带来一定的内存增长，因此对于长音频建议关闭此选项
    })
    innerAudioContext.src = this.data.word.audioFile[0]
    innerAudioContext.play() // 播放
  },
  playunisound(){
    const innerAudioContext = wx.createInnerAudioContext({
      useWebAudioImplement: true // 是否使用 WebAudio 作为底层音频驱动，默认关闭。对于短音频、播放频繁的音频建议开启此选项，开启后将获得更优的性能表现。由于开启此选项后也会带来一定的内存增长，因此对于长音频建议关闭此选项
    })
    innerAudioContext.src = this.data.word.audioFile[1]
    innerAudioContext.play() // 播放
  },
  onShow: function () {
    let that = this
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        value: '/pages/index/index'
      })
    }
    // console.log(app.globalData.userInfo.bookId)

  }
})