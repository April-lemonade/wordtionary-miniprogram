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
    selectedBookId: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    if (app.globalData.userInfo.bookId != 0) {
      that.setData({
        selectedBookId: app.globalData.userInfo.bookId
      })
      wx.request({
        url: 'http://localhost:2346/wordlist/getname?bookId=' + app.globalData.userInfo.bookId,
        success: (res) => {
          console.log(res)
          that.setData({
            bookName: res.data
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
      url: 'http://localhost:2346/wordlist/getadmin',
      success: (res) => {
        console.log(res)
        that.setData({
          systembook: res.data
        })
      }
    })
    wx.request({
      url: 'http://localhost:2346/wordlist/getuser?openid=' + app.globalData.userInfo.id,
      success: (res) => {
        console.log(res)
        that.setData({
          userbook: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log("shuaxin")
    this.setData({
      selectedBookId: app.globalData.bookId
    })
    let that = this
    if (app.globalData.userInfo.bookId != 0) {
      that.setData({
        selectedBookId: app.globalData.userInfo.bookId
      })
      wx.request({
        url: 'http://localhost:2346/wordlist/getname?bookId=' + app.globalData.userInfo.bookId,
        success: (res) => {
          console.log(res)
          that.setData({
            bookName: res.data
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
      url: 'http://localhost:2346/wordlist/change?bookId=' + finalvalue + '&openid=' + app.globalData.openid,
      success: (res) => {
        console.log(res)
        wx.request({
          url: 'http://localhost:2346/word/getwords?bookId=' + finalvalue + "&wordId=" + app.globalData.wordId,
          success: (res) => {
            console.log(res)
            app.globalData.wordList = res.data
            that.setData({
              selectedBookId: finalvalue
            })
            wx.request({
              url: 'http://localhost:2346/wordlist/getname?bookId=' + finalvalue,
              success: (res) => {
                console.log(res)
                that.setData({
                  bookName: res.data
                })
              }
            })
            // app.globalData.userInfo.bookId = finalvalue
            // app.globalData.userInfo
            that.closeDialog()
            that.onShow()
            wx.switchTab({
              url: '/pages/index/index',
              success: function (e) {
                var page = getCurrentPages().pop();
                if (page == undefined || page == null) return;
                page.onLoad();
              }
            })
            app.onLaunch()
          }
        })
      }
    })
  },

  goNew() {
    wx.navigateTo({
      url: '/pages/newList/newList?id=0',
    })
  },

  goEdit() {
    console.log("???" + this.data.userbook[this.data.value].id)
    wx.navigateTo({
      url: '/pages/newList/newList?id=' + this.data.userbook[this.data.value].id,
    })
  }
})