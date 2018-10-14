// pages/vip/buy/buy.js
var g = getApp().globalData

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [],
    vipkey: 0
  },
  tabChange: function(e) {
    const that = this;
    that.setData({
      vipkey: e.detail
    });
    console.log(e)
  },
  itemClick:function(e){
    console.log(e)
  },
  onReady() {
    wx.showLoading({
      title: '加载中',
    })
    var self = this
    g.api.searchCardCategory()
      .then(res => {
        wx.hideLoading()
        if (res.data.retCode == '0000') {
          var val = {}
          val.tabs = []
          for (var it of res.data.list) {
            val.tabs.push(it.cardCategoryName)
          }
          val.list = res.data.list
          self.setData(val)
        }
      })
      .catch(e => {
        wx.hideLoading()
        console.log(e)
      })
  }
})