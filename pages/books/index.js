// pages/books/index.js
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
    confirmBtn: {
      content: '确定',
      variant: 'base'
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
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

  },
  handleChange(e) {
    this.setData({
      activeValues: e.detail.value,
    });
  },

  countEdit() {
    console.log(this.data.countChange)
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
    this.setData({
      value: e.detail.value,
      value1: -1
    });
  },
  onChange1(e) {
    this.setData({
      value1: e.detail.value,
      value: -1
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
  }
})