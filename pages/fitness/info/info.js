// pages/fitness/info/info.js
var g = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: "",
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
    wx.showLoading({
      title: '请稍后',
    })
    g.api.getAction({
        data: {
          actionName: options.title
        }
      })
      .then(res => {
        wx.hideLoading()
        if (res.data.retCode == '0000') {
          that.setData({
            url: res.data.retVal.actionUrl
          })
        }

      })
      .catch(e => {
        console.log(e)
        wx.hideLoading()
      })
  },

})