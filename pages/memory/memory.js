// pages/memory/memory.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 4,
    memoryTrace: [2, 4, 7, 15],
    showDialog: false,
    current: 0,
    num: 0,
    confirmDelete: false,
    showAdd: false
  },
  toNext() {
    this.setData({
      showAdd: true
    });
  },
  goDelete(e) {
    this.setData({
      confirmDelete: true,
      current: e.target.dataset.index + 1
    })
  },
  addFamiliar() {
    let that = this
    let arr = this.data.memoryTrace
    arr.push(this.data.num)
    // console.log(arr)
    wx.request({
      url: 'http://localhost:2346/user/changefamiliar?openid=' + app.globalData.userInfo.id + '&familiar=' + arr.toString(),
      success: (res) => {
        console.log(res)
        that.setData({
          showDialog: false,
          showAdd: false,
          num: 0,
          memoryTrace: arr
        })
      }
    })
  },

  deleteFamiliar() {
    let that = this
    let arr = this.data.memoryTrace
    arr.splice(this.data.current - 1, 1)
    wx.request({
      url: 'http://localhost:2346/user/changefamiliar?openid=' + app.globalData.userInfo.id + '&familiar=' + arr.toString(),
      success: (res) => {
        console.log(res)
        that.setData({
          showDialog: false,
          confirmDelete:false,
          memoryTrace:arr,
          num: 0
        })
      }
    })
    console.log(arr)
  },

  cancelDelete() {
    this.setData({
      confirmDelete: false
    })
  },

  goEdit(e) {
    this.setData({
      showDialog: true,
      current: e.target.dataset.index + 1
    })
  },

  closeDialog() {
    this.setData({
      showDialog: false,
      showAdd: false
    })
  },

  changeFamiliar() {
    let that = this
    let arr = this.data.memoryTrace
    arr[this.data.current - 1] = this.data.num
    this.setData({
      memoryTrace: arr,
    })
    wx.request({
      url: 'http://localhost:2346/user/changefamiliar?openid=' + app.globalData.userInfo.id + '&familiar=' + this.data.memoryTrace.toString(),
      success: (res) => {
        console.log(res)
        that.setData({
          showDialog: false,
          num: 0
        })
        app.onLaunch()
      }
    })
    console.log(this.data.memoryTrace)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      memoryTrace: app.globalData.userInfo.familiar.split(",")
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