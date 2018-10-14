// pages/my/body/body.js
var g = getApp().globalData

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (g.userInfo != null) {
      var that = this;
      var loadDefault = function() {
        var user = g.userInfo;
        user.bmiStatus = g.api.getBmiStatus(user.bodyStatus)
        that.setData(user)
      }
      g.api.getBody(g.userInfo.memberId, loadDefault, loadDefault)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
})