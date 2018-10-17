// pages/vip/info/info.js
var g = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    html: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.showLoading({
      title: '加载中',
    })
    var self = this
    g.api.searchConfig({
        data: {
          configType: 'memberDetail'
        }
      })
      .then(res => {
        wx.hideLoading()
        if (res.data.retCode) {
          self.setData({
            html: res.data.list[0].configVal
          })
        }
      })
      .catch(e => {
        console.log(e)
        wx.hideLoading()
      })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
})