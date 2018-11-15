// pages/my/set/set.js
var g = getApp().globalData

Page({
  onLoad(options) {
    if (options.id) {
      wx.showLoading({
        title: '加载中',
      })
      var that = this
      g.api.getMember({
          data: {
            memberId: options.id
          }
        }).then(res => {
          wx.hideLoading()
          var val = res.data.retVal
          if (!val) {
            val = {}
          }
          if (res.data.retCode == "0000") {
            val.binded = false;
          } else {
            val.binded = true;
            wx.showToast({
              title: res.data.retDesc,
              icon: 'none'
            })
          }

          that.setData(val)
        })
        .catch(res => {
          wx.hideLoading()
          wx.showToast({
            title: '加载错误',
            icon: 'none'
          })
        })
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
    genders: ['--', '男', '女']
  },
  bindGetUserInfo: function(event) {
    var that = this
    var param = {}
    param.encryptedData = event.detail.encryptedData
    param.iv = event.detail.iv;
    param.memberName = that.data.memberName
    param.memberSex = that.data.memberSex
    param.memberPhone = that.data.memberPhone
    param.wechatNo = that.data.wechatNo
    param.height = that.data.height
    param.weight = that.data.weight

    g.api.bind(param);
  }
})