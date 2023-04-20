// pages/dictionary/dictionary.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dictionaryId: 0,
    value: 0,
    showConfirm: false
  },
  onChange(e) {
    this.setData({
      value: e.detail.value,
      showConfirm: true
    });
  },

  changeDictionary() {
    let that = this
    wx.request({
      url: 'http://localhost:2346/user/changedic?openid=' + app.globalData.userInfo.id + '&dictionaryId=' + this.data.value,
      success: (res) => {
        app.onLaunch()
        that.setData({
          showConfirm: false
        })
        wx.navigateTo({
          url: '/pages/setting/setting',
        })
      }
    })
  },

  closeDialog() {
    this.setData({
      showConfirm: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      dictionaryId: app.globalData.userInfo.dictionaryId,
      value: app.globalData.userInfo.dictionaryId
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

  }
})