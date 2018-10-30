// pages/my/body/body.js
var g = getApp().globalData

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onLoad(options) {
    var val = {}
    if (options.id) {
      val.id = options.id
      val.isShare = g.userInfo ? (val.id != g.userInfo.memberId) : true
      if (val.isShare && options.title) {
        val.title = options.title
        wx.setNavigationBarTitle({
          title: options.title
        })
      }
    }

    this.setData(val)
    if (g.userInfo == null) {
      wx.navigateTo({
        url: '/pages/shouquan/shouquan',
      })
    }
  },
  onShow: function() {
    var _id = null
    var that = this;
    if (that.data.id) {
      _id = that.data.id
    }
    if (!_id && g.userInfo != null) {
      _id = g.userInfo.memberId
    }
    if (_id) {
      var loadDefault = function() {
        var user = g.userInfo;
        user.bmiStatus = g.api.getBmiStatus(user.bodyStatus)
        that.setData(user)
      }

      g.api.getBody(_id)
        .then(res => {
          if (res.data.retCode == '0000') {
            var item = res.data.retVal
            var user;
            if (that.data.isShare) {
              user = {}
            } else {
              user = getApp().globalData.userInfo;
            }
            if (item.memberName) user.memberName = item.memberName
            if (item.height) user.height = item.height
            if (item.weight) user.weight = item.weight
            if (item.BMI) user.BMI = item.BMI
            if (item.bust) user.bust = item.bust
            if (item.waist) user.waist = item.waist
            if (item.thigh) user.thigh = item.thigh
            if (item.bodyStatus) user.bodyStatus = item.bodyStatus
            if (!that.data.isShare) wx.setStorageSync("userInfo", user)
            user.bmiStatus = g.api.getBmiStatus(user.bodyStatus)
            that.setData(user)
          } else {
           loadDefault()
          }

        })
        .catch(res => {
          console.log(res)
          loadDefault()
        })
    }
  },
  onShareAppMessage: function(ops) {
    var self = this;
    if (ops.from === 'menu') {
      var shareObj = {
        title: '氢练',
        path: "/pages/my/body/body?shareId=" + g.userInfo.openid + "&title=" + g.userInfo.memberName + "的数据&id=" + g.userInfo.memberId,
      }
      return shareObj;
    }
  }
})