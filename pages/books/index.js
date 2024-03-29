// pages/books/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  options: {
    styleIsolation: 'apply-shared',
  },
  data: {
    loading: 1,
    loading1: 1,
    countChange: false,
    value: -1,
    value1: -1,
    dialogKey: '',
    showConfirm: false,
    bookId: 0,
    confirmBtn: {
      content: '确定',
      variant: 'base'
    },
    systembook: [],
    userbook: [],
    bookName: '',
    selectedBookId: -1,
    deleteConfirm: false,
    showWithInput: false,
    changeName: '',
    dailyCount: 0,
    progress: '',
    finishDate: '',
    progress: 0,
    num: 0,
    leftCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    that.setData({
      selectedBookId: app.globalData.userInfo.bookId,
      dailyCount: app.globalData.userInfo.dailyCount,
      num: app.globalData.userInfo.dailyCount,
    })
    if (app.globalData.userInfo.bookId != 0) {
      that.setData({
        selectedBookId: app.globalData.userInfo.bookId,
        dailyCount: app.globalData.userInfo.dailyCount,
        num: app.globalData.userInfo.dailyCount,
      })
      wx.request({
        url: 'http://121.40.140.72:2346/wordlist/getname?bookId=' + app.globalData.userInfo.bookId,
        success: (res) => {
          console.log("重新获取名称")
          console.log(res)
          that.setData({
            bookName: res.data
          })
        }
      })
      wx.request({
        url: 'http://121.40.140.72:2346/wordlist/getprogress?bookid=' + app.globalData.userInfo.bookId + '&openid=' + app.globalData.userInfo.id,
        success: (res) => {
          console.log(res)
          that.setData({
            progress: res.data.progress,
            finishDate: res.data.finishDate,
            progress: parseFloat(res.data.progress * 100).toFixed(4),
            leftCount: res.data.leftCount
          })
        }
      })
    }
    if (!app.globalData.userInfo) {
      app.userInfoReadyCallback = res => {
        // console.log(app.globalData.userInfo.bookId + "huu")
        if (app.globalData.userInfo.bookId != 0) {
          that.setData({
            selectedBookId: app.globalData.userInfo.bookId
          })
        }
      }
    }
    wx.request({
      url: 'http://121.40.140.72:2346/wordlist/getuser?openid=' + app.globalData.userInfo.id,
      success: (res) => {
        console.log(res)
        that.setData({
          userbook: res.data,
          loading: 0
        })
      }
    })
    wx.request({
      url: 'http://121.40.140.72:2346/wordlist/getadmin',
      success: (res) => {
        console.log(res)
        that.setData({
          systembook: res.data,
          loading1: 0
        })
      }
    })
  },

  changeDailyCount() {
    console.log(this.data.num)
    let that = this
    // that.setData({
    //   countChange: false,
    //   dailyCount: that.data.num
    // })
    wx.request({
      url: 'http://121.40.140.72:2346/user/changedailycount?openid=' + app.globalData.userInfo.id + '&dailyCount=' + this.data.num,
      success: (res) => {
        app.globalData.userInfo.dailyCount = that.data.num
        console.log(res)
        app.onLaunch()
        that.onLoad()
        wx.switchTab({
          url: '/pages/index/index',
        })
        that.setData({
          dailyCount: that.data.num,
          countChange: false
        })

      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    let that = this
    that.setData({
      selectedBookId: app.globalData.userInfo.bookId,
      dailyCount: app.globalData.userInfo.dailyCount,
      num: app.globalData.userInfo.dailyCount,
    })
    if (app.globalData.userInfo.bookId != 0) {
      that.setData({
        selectedBookId: app.globalData.userInfo.bookId,
        dailyCount: app.globalData.userInfo.dailyCount,
        num: app.globalData.userInfo.dailyCount,
      })
      wx.request({
        url: 'http://121.40.140.72:2346/wordlist/getname?bookId=' + app.globalData.userInfo.bookId,
        success: (res) => {
          console.log(res)
          that.setData({
            bookName: res.data
          })
        }
      })
      wx.request({
        url: 'http://121.40.140.72:2346/wordlist/getprogress?bookid=' + app.globalData.userInfo.bookId + '&openid=' + app.globalData.userInfo.id,
        success: (res) => {
          console.log(res)
          that.setData({
            progress: res.data.progress,
            finishDate: res.data.finishDate,
            progress: parseFloat(res.data.progress)
          })
        }
      })
    }
    if (!app.globalData.userInfo) {
      app.userInfoReadyCallback = res => {
        // console.log(app.globalData.userInfo.bookId + "huu")
        if (app.globalData.userInfo.bookId != 0) {
          that.setData({
            selectedBookId: app.globalData.userInfo.bookId
          })
        }
      }
    }
    wx.request({
      url: 'http://121.40.140.72:2346/wordlist/getuser?openid=' + app.globalData.userInfo.id,
      success: (res) => {
        console.log(res)
        that.setData({
          userbook: res.data,
          loading: 0
        })
      }
    })
    wx.request({
      url: 'http://121.40.140.72:2346/wordlist/getadmin',
      success: (res) => {
        console.log(res)
        that.setData({
          systembook: res.data,
          loading1: 0
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // this.onLoad()

    this.setData({
      selectedBookId: app.globalData.bookId,
      dailyCount: app.globalData.userInfo.dailyCount
    })
    let that = this
    if (app.globalData.userInfo.bookId != 0) {
      that.setData({
        selectedBookId: app.globalData.userInfo.bookId
      })
      // let that = this
      that.setData({
        selectedBookId: app.globalData.userInfo.bookId,
        dailyCount: app.globalData.userInfo.dailyCount,
        num: app.globalData.userInfo.dailyCount,
      })
      if (app.globalData.userInfo.bookId != 0) {
        that.setData({
          selectedBookId: app.globalData.userInfo.bookId,
          dailyCount: app.globalData.userInfo.dailyCount,
          num: app.globalData.userInfo.dailyCount,
        })
        wx.request({
          url: 'http://121.40.140.72:2346/wordlist/getname?bookId=' + app.globalData.userInfo.bookId,
          success: (res) => {
            console.log("重新获取名称")
            that.setData({
              bookName: res.data
            })
          }
        })
        wx.request({
          url: 'http://121.40.140.72:2346/wordlist/getprogress?bookid=' + app.globalData.userInfo.bookId + '&openid=' + app.globalData.userInfo.id,
          success: (res) => {
            console.log(res)
            that.setData({
              progress: res.data.progress,
              finishDate: res.data.finishDate,
              progress: parseFloat(res.data.progress)
            })
          }
        })
      }
      if (!app.globalData.userInfo) {
        app.userInfoReadyCallback = res => {
          // console.log(app.globalData.userInfo.bookId + "huu")
          if (app.globalData.userInfo.bookId != 0) {
            that.setData({
              selectedBookId: app.globalData.userInfo.bookId
            })
          }
        }
      }
      wx.request({
        url: 'http://121.40.140.72:2346/wordlist/getuser?openid=' + app.globalData.userInfo.id,
        success: (res) => {
          console.log(res)
          that.setData({
            userbook: res.data,
            loading: 0
          })
        }
      })
      wx.request({
        url: 'http://121.40.140.72:2346/wordlist/getadmin',
        success: (res) => {
          console.log(res)
          that.setData({
            systembook: res.data,
            loading1: 0
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  handleChange(e) {
    this.setData({
      activeValues: e.detail.value,
    });
  },

  countEdit() {
    let that = this
    let data = !this.countChange
    this.setData({
      countChange: !that.data.countChange
    })
    console.log(data)
  },

  onShow: function () {
    this.onLoad()
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        value: '/pages/books/index'
      })
    }
  },
  onChange(e) {
    console.log(this.data.userbook[e.detail.value].id)
    this.setData({
      value: e.detail.value,
      value1: -1
    });
    console.log(e)
  },
  onChange1(e) {
    console.log(this.data.systembook[e.detail.value])
    this.setData({
      value1: e.detail.value,
      value: -1,
    });
  },
  handleClick(e) {
    const {
      key
    } = e.currentTarget.dataset;
    this.setData({
      [key]: true,
      dialogKey: key
    });
  },

  closeDialog() {
    const {
      dialogKey
    } = this.data;
    this.setData({
      [dialogKey]: false
    });
  },

  changeBook() {
    let that = this
    let finalvalue = -1
    if (this.data.value != -1)
      finalvalue = this.data.userbook[this.data.value].id
    else
      finalvalue = this.data.systembook[this.data.value1].id
    // console.log("改变词书id为" + finalvalue)
    this.setData({
      value1: -1,
      value: -1
    })
    wx.request({
      url: 'http://121.40.140.72:2346/wordlist/change?bookId=' + finalvalue + '&openid=' + app.globalData.openid,
      success: (res) => {
        console.log(res)
        app.globalData.userInfo.bookId = finalvalue
        that.onLoad()
        wx.request({
          url: 'http://121.40.140.72:2346/wordlist/getname?bookId=' + app.globalData.userInfo.bookId,
          success: (res) => {
            console.log(res)
            that.setData({
              bookName: res.data
            })
          }
        })
        wx.request({
          url: 'http://121.40.140.72:2346/wordlist/getprogress?bookid=' + app.globalData.userInfo.bookId + '&openid=' + app.globalData.userInfo.id,
          success: (res) => {
            console.log(res)
            that.setData({
              progress: res.data.progress,
              finishDate: res.data.finishDate,
              progress: parseFloat(res.data.progress * 100).toFixed(4)
            })
          }
        })
        app.onLaunch()
        that.closeDialog()
      }
    })
  },

  goNew() {
    wx.navigateTo({
      url: '/pages/newList/newList?id=0',
    })
  },

  goEdit() {
    this.setData({
      showWithInput: true
    })
  },
  deleteCancel() {
    this.setData({
      deleteConfirm: false
    })
  },
  goDelete() {
    this.setData({
      deleteConfirm: true
    })
  },
  deleteList() {
    let that = this
    let finalvalue = -1
    if (this.data.value != -1)
      finalvalue = this.data.userbook[this.data.value].id
    else
      finalvalue = this.data.systembook[this.data.value1].id
    // console.log("改变词书id为" + finalvalue)
    this.setData({
      value1: -1,
      value: -1
    })
    wx.request({
      url: 'http://121.40.140.72:2346/wordlist/deletelist?bookid=' + finalvalue,
      success: (res) => {
        console.log(res)
        that.setData({
          userbook: [],
          deleteConfirm: false
        })
        app.onLaunch()
        that.onLoad()
      }
    })
  },
  closeshowWithInput() {
    this.setData({
      showWithInput: false
    })
  },
  changName() {
    console.log(this.data.changeName)
    let that = this
    let finalvalue = -1
    if (this.data.value != -1)
      finalvalue = this.data.userbook[this.data.value].id
    else
      finalvalue = this.data.systembook[this.data.value1].id
    // console.log("改变词书id为" + finalvalue)
    this.setData({
      value1: -1,
      value: -1
    })
    wx.request({
      url: 'http://121.40.140.72:2346/wordlist/changelistname?bookid=' + finalvalue + '&name=' + this.data.changeName,
      success: (res) => {
        that.setData({
          showWithInput: false
        })
        that.onLoad()
      }
    })
  }
})