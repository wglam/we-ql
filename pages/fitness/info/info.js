// pages/fitness/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    video: "",
    dzyl: "",
    hxyl: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: options.title,
    })
    var that = this;
    that.setData(options)
  },

})