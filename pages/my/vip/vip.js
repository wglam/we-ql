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
  onLoad(options) {
    this.searchOrder()
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
          if (res.data.retCode == '0000') {
            var item = res.data.retVal
            if (item.beginTime) {
              item.beginTime = item.beginTime.substring(0, 10)
            }
            if (item.endTime) {
              item.endTime = item.endTime.substring(0, 10)
            }
            that.setData({
              card: item
            })
          }
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
    param.openid = g.userInfo.openid
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
          vips = []
        }
        if (res.data.list) {
          for (var it of res.data.list) {
            vips.push(it)
          }
        }

        self.setData({
          vips,
          isLoading: false,
          nodata: (res.data.list.length < param.size),
          page: param.page
        })
      })
      .catch(e => {
        console.log(e)
        self.setData({
          isLoading: false,
        })
      })
  },
  onReachBottom() {
    this.searchOrder()
  },
  renewOrder(e) {
    wx.showLoading({
      title: '加载中',
    })
    var self = this
    g.api.getCard(self.data.card.cardId)
      .then(res => {
        wx.hideLoading()
        if (res.data.retCode == '0000') {
          var item = res.data.retVal
          wx.redirectTo({
            url: '/pages/vip/jiesuan/jiesuan?cardid=' + item.cardId + '&name=' + item.cardName + '&logo=' + item.cardCategoryLogo + '&category=' + item.cardCategoryName + '&price=' + item.cardPrice + '&categoryid=' + item.cardCategoryId + '&orderType=renew',
          })
        } else {
          wx.showToast({
            title: res.data.retDesc,
            icon: 'none'
          })
        }
      })
      .catch(e => {
        wx.hideLoading()
        wx.showToast({
          title: '加载会员卡信息失败',
          icon: 'none'
        })
      })
  },
  upgradeOrder(e) {
    var that = this
    wx.redirectTo({
      url: '/pages/vip/buy/buy?sort=' + that.data.card.sort,
    })
  }
})