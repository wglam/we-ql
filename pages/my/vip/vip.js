// pages/my/vip/vip.js

var g = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    card: '',
    page: 0,
    pageSize: 10,
    isLoading: false,
    nodata: false,
    vips: []
  },
  onShow: function() {
    wx.showLoading({
      title: '加载中...',
    })
    if (g.userInfo != null) {
      var that = this
      g.api.getMemberCard(g.userInfo.memberId)
        .then(res => {
          wx.hideLoading()
          that.setData({
            card: data
          })
        })
        .catch(res => {
          wx.hideLoading()
        })

    }
  },
  searchOrder() {
    var self = this;
    self.setData({
      isLoading: true,
      nodata: false,
    })
    var param = {}
    param.page = self.data.page + 1
    param.size = self.data.pageSize
    param.openid = g.userInfo.openid
    param.payStatus = 2
    param.orderStatus = 1

    g.api.searchOrder({
        data: param
      })
      .then(res => {
        var vips = self.data.vips
        if (param.page == 1) {
          vips = {}
        }
        if (res.data.list) {
          for (var it of res.data.list) {
            vips.push(it)
          }
        }
        self.setData({
          vips,
          isLoading: false,
          nodata: (data.list.length < param.size),
          page: param.page
        })
      })
      .catch(e => {
        self.setData({
          isLoading: false,
        })
      })
  },
  onReachBottom() {
    this.searchOrder()
  }
})