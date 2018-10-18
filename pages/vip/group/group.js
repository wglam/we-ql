var g = getApp().globalData
Page({

  onLoad(options) {
    var self = this
    if (options.shareId) {
      wx.setStorageSync('shareId', options.shareId);
    }
 
    if (g.userInfo == null) {
      wx.navigateTo({
        url: '/pages/shouquan/shouquan',
      })
    }
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
    title: '普通会员 1个月',
    total: 0,
    groups: [],
    currentTime: 0,
    modal: false
  },
  startInterval: function() {
    var that = this;
    that.data.setInter = setInterval(function() {
      var numVal = that.data.currentTime + 500;
      that.setData({
        currentTime: numVal
      });
    }, 500);
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
    var that = this;
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
              var img = g.api.getFile(it)
              console.log(img)
              card.images.push(img)
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
        if (res.data.retCode == '0000') {
          var list = res.data.list
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
                groups.push(temp)
                temp.push(it)
              } else {
                temp.push(it)
              }
            }
            console.log(groups)
            self.setData({
              groups,
              total: res.data.total
            })
          }
        }
      })
      .catch(e => {
        wx.hideLoading()
        console.log(e)
      })
  },
  btnBuy(e) {
    console.log(e)
    var self = this
    var collageMemberId = e.currentTarget.dataset.collagememberid
    if (collageMemberId == g.userInfo.memberId) {
      wx.showToast({
        title: '这是您自己的拼团',
        icon: 'none'
      })
      return
    }

    var item = self.data.card
    var _url = '/pages/vip/jiesuan/jiesuan?cardid=' + item.cardId + '&name=' + item.cardName + '&logo=' + item.cardCategoryLogo + '&category=' + item.cardCategoryName + '&categoryid=' + item.cardCategoryId + '&price=' + e.currentTarget.dataset.price +
      '&orderType=group&isInitiator=' + e.currentTarget.dataset.isinitiator + '&collageEndTime=' + e.currentTarget.dataset.endtime + "&img=" + item.cardImg
    if (collageMemberId) {
      _url += "&collageMemberId=" + collageMemberId
    }
    wx.navigateTo({
      url: _url,
    })
  },
  moreClick(e) {
    this.setData({
      modal: true
    })
  },
  closeModal: function(e) {
    this.setData({
      modal: false
    })
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function (ops) {
    var self = this;
    if (ops.from === 'menu') {
      var item = self.data.card
      var shareObj = {
        title: '氢练',
        path: "/pages/vip/group/group?id=" + item.cardId + "&shareId=" + g.userInfo.openid,
        imageUrl: g.api.getFile(item.cardImg),
        success: function (res) { }
      }
      return shareObj;
    }
  },
})