// pages/search/search.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: '',
    dictionaryId: 0,
    loading: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    this.setData({
      searchValue: options.searchValue,
      dictionaryId: app.globalData.userInfo.dictionaryId
    })
    wx.request({
      url: 'http://localhost:2346/word/searchword?word=' + options.searchValue + '&dictionaryId=' + this.data.dictionaryId,
      success: (res) => {
        console.log(res)
        that.setData({
          translation: JSON.parse(res.data.oxfordTranslations),
          translation1: JSON.parse(res.data.cambridgeTranslations),
          loading: 0
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