// pages/vip/group/group.js
var g = getApp().globalData
Page({

  onLoad(options) {
    var self = this
    if (options.id) {
      self.setData({
        cardId: options.id
      })
    }
  },
  onReady() {
    var self = this
    self.loadData()
  },
  /**
   * 页面的初始数据
   */
  data: {
    cardId: 0,
    nowDate: new Date(),
    title: '普通会员 1个月',
    total: 0,
    groups: [],
    currentTime: 0,

  },
  startInterval: function() {
    var that = this;
    var numtime = new Date().getTime();
    that.setData({
      currentTime: numtime
    });
    that.data.setInter = setInterval(function() {
      var numVal = new Date().getTime();
      that.setData({
        currentTime: numVal
      });
    }, 199);
  },
  endSetInter: function() {
    varthat = this;
    clearInterval(that.data.setInter)
  },
  onShow: function() {
    var that = this;
    that.startInterval();
  },
  onHide: function() {
    varthat = this;
    clearInterval(that.data.setInter)
  },
  loadData() {
    wx.showLoading({
      title: '加载中',
    })
    var self = this
    g.api.getCard(self.data.cardId)
      .then(res => {
        wx.hideLoading()
        if (res.data.retCode == '0000') {
          var card = res.data.retVal
          if (card.rightsContent) {
            card.images = []
            for (var it of card.rightsContent.split(',')) {
              card.images.push(g.api.getFile(it))
            }
          }
          self.setData({
            card
          })
          self.loadGroup()
        }
      })
      .catch(e => {
        wx.hideLoading()
        console.log(e)
      })
  },
  loadGroup() {
    var self = this
    wx.showLoading({
      title: '加载中',
    })
    g.api.searchCollageInitiator({
        data: {
          cardCategoryId: self.data.card.cardCategoryId,
          cardId: self.data.card.cardId,
          page: 1,
          size: 10
        }
      })
      .then(res => {
        wx.hideLoading()
        // if (res.data.retCode == '0000') {
          var list = res.data.list
          list = [{
            memberName: 'z1111',
            portrait: g.userInfo.portrait,
            cgSeconds: 569,
            diffNum: 1,
          }]
          var groups = []
          if (list && list.length >= 1) {
            var temp
            var it
            for (var i = 0; i <= list.length - 1; i++) {
              it = list[i]
              it.minSeconds = it.cgSeconds * 1000
              it.portrait = it.portrait
              if (i % 2 == 0) {
                temp = []
                temp.push(it)
              } else {
                temp.push(it)
                groups.push(temp)
              }
            }
            console.log(groups)
            self.setData({
              groups,
              total: res.data.total
            })
          }
        // }
      })
      .catch(e => {
        wx.hideLoading()
        console.log(e)
      })
  }
})