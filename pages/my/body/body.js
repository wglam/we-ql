// pages/my/body/body.js
var g = getApp().globalData

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onShow: function() {
    if (g.userInfo != null) {
      var that = this;
      var loadDefault = function() {
        var user = g.userInfo;
        user.bmiStatus = g.api.getBmiStatus(user.bodyStatus)
        that.setData(user)
      }
      g.api.getBody(g.userInfo.memberId, loadDefault, loadDefault)
    }
  }
})