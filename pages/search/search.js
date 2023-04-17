// pages/search/search.js
const app = getApp()
import ActionSheet, {
  ActionSheetTheme
} from 'tdesign-miniprogram/action-sheet/index';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: '',
    dictionaryId: 0,
    loading: 1,
    userbook: []
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
        wx.request({
          url: 'http://localhost:2346/wordlist/getuser?openid=' + app.globalData.userInfo.id,
          success: (res) => {
            console.log(res)
            that.setData({
              userbook: res.data,
            })
          }
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

  },
  showDescAction() {
    let data = []
    for (let i = 0; i < this.data.userbook.length; i++) {
      let temp = {
        index: this.data.userbook[i].id,
        label: this.data.userbook[i].name
      }
      data.push(temp)
    }
    console.log(data)
    ActionSheet.show({
      theme: ActionSheetTheme.List,
      selector: '#t-action-sheet',
      context: this,
      description: '添加到单词表',
      items: data
    });
  },
  handleSelected(e) {
    console.log(e.detail);
    wx.request({
      url: 'http://localhost:2346/word/addword?word=' + this.data.searchValue + '&listid=' + e.detail.selected.index,
      success: (res) => {
        console.log(res)
      }
    })
  }
})