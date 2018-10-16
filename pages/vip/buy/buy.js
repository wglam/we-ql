// pages/vip/buy/buy.js
var g = getApp().globalData

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTabs: false,
    tabs: [],
    list: [],
    tabIndex: 0,
    itemIndexs: [],
    sort: -1
  },
  onLoad(options) {
    var that = this
    if (options.sort) {
      that.setData({
        sort: options.sort
      })
    }
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
  loadData() {
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
          val.isTabs = val.tabs.length >= 2
          self.setData(val)
        }
      })
      .catch(e => {
        wx.hideLoading()
        console.log(e)
      })
  },
  loadSort(_sort) {
    wx.showLoading({
      title: '加载中',
    })
    var self = this
    g.api.searchUpgradeCard({
        data: {
          sort: _sort
        }
      })
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
          val.isTabs = val.tabs.length >= 2
          self.setData(val)
        }
      })
      .catch(e => {
        wx.hideLoading()
        console.log(e)
      })
  },
  onReady() {
    var self = this
    if (self.data.sort == -1) {
      self.loadData()
    } else {
      self.loadSort(self.data.sort)
    }
  },
  btnBuy(e) {
    var self = this
    var category = self.data.list[self.data.tabIndex]
    var itemIndex = self.data.itemIndexs[self.data.tabIndex]
    var item = category.cardInfos[itemIndex]
    console.log(item)
    var _url = '/pages/vip/jiesuan/jiesuan?cardid=' + item.cardId + '&name=' + item.cardName + '&logo=' + category.cardCategoryLogo + '&category=' + category.cardCategoryName + '&categoryid=' + category.cardCategoryId
    if (self.data.sort != -1) {
      _url += '&orderType=upgrade'
      wx.showLoading({
        title: '加载中',
      })
      g.api.getUpgradePrice({
          data: {
            memberId: g.userInfo.memberId,
            cardPrice: item.cardPrice
          }
        })
        .then(res => {
          wx.hideLoading()
          if (res.data.retCode == '0000') {
            _url += '&price=' + res.data.retVal
            wx.navigateTo({
              url: _url,
            })
          } else {
            wx.showToast({
              title: '加载失败',
              icon: 'none'
            })
          }
        })
        .catch(e => {
          console.log(e)
          wx.hideLoading()
          wx.showToast({
            title: '加载失败',
            icon: 'none'
          })
        })

    } else {
      _url += '&price=' + item.cardPrice
      wx.navigateTo({
        url: _url,
      })
    }
  }
})