// pages/vip/buy/buy.js
var g = getApp().globalData

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [],
    list: [],
    tabIndex: 0,
    itemIndexs: []
  },
  tabChange: function(e) {
    const that = this;
    that.setData({
      tabIndex: e.detail.current
    });
  },
  itemClick: function(e) {
    const that = this;
    var val = that.data.itemIndexs
    val[that.data.tabIndex] = e.detail
    that.setData({
      itemIndexs: val
    });
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
          val.itemIndexs = []
          for (var it of res.data.list) {
            val.tabs.push(it.cardCategoryName)
            val.itemIndexs.push(0)
          }
          val.list = res.data.list
          self.setData(val)
        }
      })
      .catch(e => {
        wx.hideLoading()
        console.log(e)
      })
  },
  btnBuy(e) {
    var self = this

    var category = self.data.list[self.data.tabIndex]
    var itemIndex = self.data.itemIndexs[self.data.tabIndex]
    var item = category.cardInfos[itemIndex]
    console.log(item)
    wx.redirectTo({
      url: '/pages/vip/jiesuan/jiesuan?id=' + item.cardId + '&name=' + item.cardName + '&logo=' + category.cardCategoryLogo + '&category=' + category.cardCategoryName + '&price=' + item.cardPrice,
    })
  }
})