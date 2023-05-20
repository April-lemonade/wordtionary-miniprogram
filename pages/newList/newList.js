// pages/newList/newList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: {
      id: 0,
      name: '',
      words: ''
    },
    disable: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    wx.request({
      url: 'url',
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
  onShow(options) {
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

  submit(e) {
    let that = this
    console.log(e.detail.value.words.split('\n'))
    this.setData({
      list: e.detail.value,
      disable: true
    })
    wx.request({
      url: 'http://121.40.140.72:2346/wordlist/addlist',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        name: that.data.list.name,
        word: that.data.list.words,
        openid: app.globalData.userInfo.id
      },
      success: (res) => {
        console.log(res)
        app.onLaunch()
        wx.switchTab({
          url: '/pages/books/index',
        })
      }
    })
  }
})