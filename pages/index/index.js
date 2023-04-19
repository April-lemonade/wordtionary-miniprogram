// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
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
    dictionaryId: 1,
    searchValue: '',
    allCount: 0,
    showCount: 1,
    note: '',
    newNote: '',
    showWithInput: false,
    noteEditStyle: 'height:200rpx'
  },
  editNote() {
    console.log(this.data.newNote)
    let that = this
    wx.request({
      url: 'http://localhost:2346/note/addnote',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        openid: app.globalData.userInfo.id,
        WordId: that.data.word.id,
        content: that.data.newNote
      },
      success: (res) => {
        console.log(res)
        that.setData({
          showWithInput: false,
          note: that.data.newNote
        })
      }
    })
  },
  closeDialog() {
    this.setData({
      showWithInput: false
    })
  },
  goEdit() {
    this.setData({
      showWithInput: true
    })
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
        count: 0,
        loading: 1
      })
      this.getInfo()
    }
    console.log(this.data.finish)
  },

  getInfo() {
    let that = this
    wx.request({
      url: 'http://localhost:2346/word/getwords?bookId=' + app.globalData.userInfo.bookId + "&wordId=" + app.globalData.userInfo.wordId + '&dictionaryId=' + app.globalData.userInfo.dictionaryId + '&openid=' + app.globalData.userInfo.id,
      success: (res) => {
        console.log(res)
        that.setData({
          bookId: app.globalData.userInfo.bookId,
          dictionaryId: app.globalData.userInfo.dictionaryId
        })
        if (res.data.length != 0) {
          app.globalData.wordList = res.data
          app.globalData.allCount = res.data.length
          var array = new Array(JSON.parse(res.data[0].oxfordTranslations).senses.length);
          var array1 = new Array(JSON.parse(res.data[0].oxfordTranslations).senses.length);
          if (app.globalData.dictionaryId == 0) {
            for (let i = 0; i < array.length; i++) {
              array1[i] = ''
              array[i] = -2
            }
            that.setData({
              familiar: array,
              class: array1
            })
          }
          if (app.globalData.dictionaryId == 1) {
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
          if (res.data[res.data.length - 1].id == -1) {
            that.setData({
              allCount: res.data.length - 1
            })
          } else {
            that.setData({
              allCount: res.data.length
            })
          }
          that.setData({
            wordList: res.data,
            // allCount: res.data.length,
            word: res.data[that.data.count],
            translation: JSON.parse(res.data[that.data.count].oxfordTranslations),
            translation1: JSON.parse(res.data[that.data.count].cambridgeTranslations),
            loading: 0,
            finish: 0,
            bookId: app.globalData.bookId,
            dictionaryId: app.globalData.dictionaryId
          })
          console.log(that.data.word)
          that.getNote(that.data.word.id)
        } else {
          console.log("直接开始重学")
          wx.request({
            url: 'http://localhost:2346/word/getrelearn?openid=' + app.globalData.userInfo.id,
            success: (res) => {
              app.globalData.wordList = res.data
              console.log(res)
              if (res.data.length != 0) {
                var array = new Array(JSON.parse(res.data[0].oxfordTranslations).senses.length);
                var array1 = new Array(JSON.parse(res.data[0].oxfordTranslations).senses.length);
                if (app.globalData.userInfo.dictionaryId == 0) {
                  for (let i = 0; i < array.length; i++) {
                    array1[i] = ''
                    array[i] = -2
                  }
                  that.setData({
                    familiar: array,
                    class: array1,
                    wordList: res.data
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
                    class: camarray1,
                    wordList: res.data,
                  })
                }
                if (res.data[res.data.length - 1].id == -1) {
                  that.setData({
                    allCount: res.data.length - 1
                  })
                } else {
                  that.setData({
                    allCount: res.data.length
                  })
                }
                that.setData({
                  wordList: res.data,
                  // allCount: res.data.length,
                  word: res.data[that.data.count],
                  translation: JSON.parse(res.data[that.data.count].oxfordTranslations),
                  translation1: JSON.parse(res.data[that.data.count].cambridgeTranslations),
                  loading: 0,
                  finish: 0,
                  bookId: app.globalData.userInfo.bookId,
                  dictionaryId: app.globalData.userInfo.dictionaryId
                })
                console.log(that.data.word)
                that.getNote(that.data.word.id)
              } else {
                that.setData({
                  finish: 1,
                  loading: 0
                })
              }
            }
          })
          that.setData({
            count: 0
          })
        }


        if (this.data.wordList == null) {
          that.setData({
            finish: 1
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
    console.log(this.data.count)
    var array1 = []
    let that = this
    let arr = this.data.familiar
    arr.sort()
    wx.request({
      url: 'http://localhost:2346/record/addrecord?openid=' + app.globalData.userInfo.id + '&wordId=' + that.data.word.id + '&familiar=' + arr[0] + '&listId=' + that.data.word.listid,
      success: (res) => {
        console.log(res)
        that.setData({
          count: that.data.count + 1,
          disabled: true
        })
        if (arr[0] != -1) {
          that.setData({
            showCount: that.data.showCount + 1
          })
        }
        if (that.data.count == app.globalData.wordList.length) {
          wx.request({
            url: 'http://localhost:2346/word/getrelearn?openid=' + app.globalData.userInfo.id,
            success: (res) => {
              app.globalData.wordList = res.data
              if (res.data.length != 0) {
                var array = new Array(JSON.parse(res.data[0].oxfordTranslations).senses.length);
                var array1 = new Array(JSON.parse(res.data[0].oxfordTranslations).senses.length);
                if (app.globalData.userInfo.dictionaryId == 0) {
                  for (let i = 0; i < array.length; i++) {
                    array1[i] = ''
                    array[i] = -2
                  }
                  that.setData({
                    familiar: array,
                    class: array1,
                    wordList: res.data
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
                    class: camarray1,
                    wordList: res.data
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
                that.getNote(that.data.word.id)
              } else {
                that.setData({
                  finish: 1
                })
              }
            }
          })
          that.setData({
            count: 0
          })
          // that.onLoad()
          // console.log("refresh")
        }
        if (this.data.wordList == null) {
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
  },

  goSearch() {
    console.log(this.data.searchValue)
    wx.navigateTo({
      url: '/pages/search/search?searchValue=' + this.data.searchValue,
    })
  },

  getNote(id) {
    let that = this
    wx.request({
      url: 'http://localhost:2346/note/getnote?openid=' + app.globalData.userInfo.id + '&wordId=' + id,
      success: (res) => {
        console.log(res)
        that.setData({
          note: res.data[0].content,
          newNote: res.data[0].content
        })
      }
    })
  },

  moreWord() {
    let that = this
    wx.request({
      url: 'http://localhost:2346/word/getoneword?bookId=' + app.globalData.userInfo.bookId + '&wordId=' + app.globalData.userInfo.wordId + '&dailyCount=' + app.globalData.userInfo.dailyCount + '&dictionaryId=' + app.globalData.userInfo.dictionaryId,
      success: (res) => {
        console.log(res)
        that.setData({
          bookId: app.globalData.userInfo.bookId,
          dictionaryId: app.globalData.userInfo.dictionaryId
        })
        if (res.data.length != 0) {
          app.globalData.wordList = res.data
          app.globalData.allCount = res.data.length
          var array = new Array(JSON.parse(res.data[0].oxfordTranslations).senses.length);
          var array1 = new Array(JSON.parse(res.data[0].oxfordTranslations).senses.length);
          if (app.globalData.dictionaryId == 0) {
            for (let i = 0; i < array.length; i++) {
              array1[i] = ''
              array[i] = -2
            }
            that.setData({
              familiar: array,
              class: array1
            })
          }
          if (app.globalData.dictionaryId == 1) {
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
          if (res.data[res.data.length - 1].id == -1) {
            that.setData({
              allCount: res.data.length - 1
            })
          } else {
            that.setData({
              allCount: res.data.length
            })
          }
          that.setData({
            wordList: res.data,
            // allCount: res.data.length,
            word: res.data[that.data.count],
            translation: JSON.parse(res.data[that.data.count].oxfordTranslations),
            translation1: JSON.parse(res.data[that.data.count].cambridgeTranslations),
            loading: 0,
            finish: 0,
            bookId: app.globalData.bookId,
            dictionaryId: app.globalData.dictionaryId
          })
          console.log(that.data.word)
          that.getNote(that.data.word.id)
        }
      }
    })
  }
})