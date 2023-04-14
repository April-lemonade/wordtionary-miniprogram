// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    animationType: "animated bounceInUp",
    right: [{
      text: '删除',
      className: 'btn delete-btn',
    }, ],
    left: [{
      text: '选择',
      className: 'btn favor-btn',
    }, ],
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
    translation: {},
    translation1: {},
    openid: '',
    loading: 1,
    memory: -2,
    familiar: [],
    disabled: true,
    style: '',
    wordList: [],
    count: 0,
    finish: 0,
    dictionaryId: 1
  },
  onLoad() {
    let that = this
    if (!app.globalData.userInfo) {
      app.userInfoReadyCallback = res => {
        if (app.globalData.userInfo.bookId != 0) {
          that.getInfo()
        }
      }
    } else {
      that.setData({
        count: 0
      })
      this.getInfo()
    }
    console.log(this.data.finish)
  },

  getInfo() {
    let that = this
    wx.request({
      url: 'http://localhost:2346/word/getwords?bookId=' + app.globalData.userInfo.bookId + "&wordId=" + app.globalData.userInfo.wordId + '&dictionaryId=' + app.globalData.userInfo.dictionaryId,
      success: (res) => {
        console.log(res)
        that.setData({
          bookId: app.globalData.userInfo.bookId,
          dictionaryId: app.globalData.userInfo.dictionaryId
        })
        if (res.data.length != 0) {
          app.globalData.wordList = res.data
          var array = new Array(JSON.parse(res.data[0].oxfordTranslations).senses.length);
          var array1 = new Array(JSON.parse(res.data[0].oxfordTranslations).senses.length);
          if (app.globalData.userInfo.dictionaryId == 0) {
            for (let i = 0; i < array.length; i++) {
              array1[i] = ''
              array[i] = -2
            }
            that.setData({
              familiar: array,
              class: array1
            })
          }
          if (app.globalData.userInfo.dictionaryId == 1) {
            var camarray = new Array(JSON.parse(res.data[0].cambridgeTranslations).length);
            var camarray1 = new Array(JSON.parse(res.data[0].cambridgeTranslations).length);
            for (let i = 0; i < camarray.length; i++) {
              camarray1[i] = ''
              camarray[i] = -2
            }
            that.setData({
              familiar: camarray,
              class: camarray1
            })
          }
          that.setData({
            wordList: res.data,
            word: res.data[that.data.count],
            translation: JSON.parse(res.data[that.data.count].oxfordTranslations),
            translation1: JSON.parse(res.data[that.data.count].cambridgeTranslations),
            loading: 0,
            finish: 0,
            bookId: app.globalData.userInfo.bookId,
            dictionaryId: app.globalData.userInfo.dictionaryId
          })
          console.log(this.data.translation1)
        } else {
          that.setData({
            finish: 1,
            loading: 0
          })
        }
      }
    })
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
  playbrisound() {
    const innerAudioContext = wx.createInnerAudioContext({
      useWebAudioImplement: true // 是否使用 WebAudio 作为底层音频驱动，默认关闭。对于短音频、播放频繁的音频建议开启此选项，开启后将获得更优的性能表现。由于开启此选项后也会带来一定的内存增长，因此对于长音频建议关闭此选项
    })
    innerAudioContext.src = this.data.translation.pronunciations[0].audioFile
    innerAudioContext.play() // 播放
  },
  playunisound() {
    const innerAudioContext = wx.createInnerAudioContext({
      useWebAudioImplement: true
    })
    innerAudioContext.src = this.data.translation.pronunciations[1].audioFile
    innerAudioContext.play() // 播放
  },
  onShow: function () {
    let that = this
    // this.onLoad()
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        value: '/pages/index/index'
      })
    }
  },
  // onKill() {
  //   wx.showToast({
  //     title: '你点击了删除',
  //     icon: 'none'
  //   });
  // },
  onStrange(e) {
    console.log(this.data.familiar)
    var arry = this.data.familiar
    arry[e.target.dataset.index] = -1
    this.setData({
      familiar: arry
    })
    if (!arry.includes(-2)) {
      this.setData({
        disabled: false
      })
    }
  },
  onBlur(e) {
    var arry = this.data.familiar
    arry[e.target.dataset.index] = 1
    this.setData({
      familiar: arry
    })
    if (!arry.includes(-2)) {
      this.setData({
        disabled: false
      })
    }
  },
  onFamiliar(e) {
    var arry = this.data.familiar
    arry[e.target.dataset.index] = 2
    this.setData({
      familiar: arry
    })
    if (!arry.includes(-2)) {
      this.setData({
        disabled: false
      })
    }
  },
  next() {
    console.log(this.data.word)
    var array1 = []
    let that = this
    let arr = this.data.familiar
    arr.sort()
    wx.request({
      url: 'http://localhost:2346/record/addrecord?openid=' + app.globalData.userInfo.id + '&wordId=' + that.data.word.id + '&familiar=' + arr[0],
      success: (res) => {
        console.log(res)
        that.setData({
          count: that.data.count + 1,
          disabled: true
        })
        if (that.data.count == 10) {
          that.setData({
            count: 0
          })
          that.onLoad()
          console.log("refresh")
        }
        if (this.data.wordList.length < 10 && this.data.count == this.data.wordList.length) {
          that.setData({
            finish: 1
          })
        } else {
          for (let i = 0; i < that.data.translation.length; i++) {
            array1[i] = ''
            array[i] = -2
          }
          that.setData({
            word: that.data.wordList[that.data.count],
            translation: JSON.parse(that.data.wordList[that.data.count].oxfordTranslations),
            familiar: array1
          })
          app.globalData.userInfo.wordId = that.data.word.id
        }
      }
    })
  }
})