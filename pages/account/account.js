// pages/account/account.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: '123',
    pwd: '123',
    disabled: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    if(!app.globalData.userInfo.account){
      this.setData({
        disabled: true
      })
    }
    this.setData({
      account: app.globalData.userInfo.account,
      pwd: app.globalData.userInfo.pwd
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
    // if(!app.globalData.userInfo.account){
    //   this.setData({
    //     disabled: true
    //   })
    // }
    // this.setData({
    //   account: app.globalData.userInfo.account,
    //   pwd: app.globalData.userInfo.pwd
    // })
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

  submit() {
    let that = this
    wx.request({
      url: 'http://localhost:2346/user/setaccount',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        openid: app.globalData.userInfo.id,
        account: that.data.account,
        pwd: that.data.pwd
      },
      success: (res) => {
        console.log(res)
        app.onLaunch()
        wx.switchTab({
          url: '/pages/me/index',
        })
      }
    })
  },

  edit() {
    this.setData({
      account: '',
      pwd: '',
      disabled: true
    })
  }
})