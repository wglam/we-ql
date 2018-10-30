var g = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderType: '',
    cardid: '',
    name: '一个月',
    price: 0,
    logo: '',
    category: '普通会员',
    categoryid: '',
    youhui: {},
    payment: 0,
    home: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var val = {}
    if (options.orderType) {
      val.orderType = options.orderType
    }
    if (options.cardid) {
      val.cardid = options.cardid
    }
    if (options.name) {
      val.name = options.name
    }
    if (options.logo) {
      val.logo = g.api.getFile(options.logo)
    }
    if (options.category) {
      val.category = options.category
    }
    if (options.categoryid) {
      val.categoryid = options.categoryid
    }
    if (options.price) {
      val.price = options.price
      val.payment = val.price
    }
    if (options.isInitiator) {
      val.isInitiator = options.isInitiator
    }
    if (options.collageMemberId) {
      val.collageMemberId = options.collageMemberId
    }

    if (options.collageEndTime) {
      val.collageEndTime = options.collageEndTime
    }
    if (options.img) {
      val.img = g.api.getFile(options.img)
    }
    if (options.home) {
      val.home = options.home
    }
    var that = this
    that.setData(val)
    console.log(val)
  },
  addOrder: function(e) {
    var that = this
    if (that.data.orderType == "renew") {
      that.renewOrder()
    } else if (that.data.orderType == "upgrade") {
      that.upgradeOrder()
    } else if (that.data.orderType == "group") {
      that.groupOrder()
    } else {
      that.addNewOrder()
    }
  },
  groupOrder: function() {
    wx.showLoading({
      title: '正在提交',
    })
    var self = this
    var param = {}
    param.memberId = g.userInfo.memberId
    param.openid = g.userInfo.openid
    param.cardCategoryId = self.data.categoryid
    param.couponId = self.data.youhui.couponId
    param.cardId = self.data.cardid
    param.orderPrice = self.data.price
    param.couponPay = self.data.youhui.couponPrice
    param.payment = self.data.payment
    // param.payment = 0.01
    // param.orderPrice = 0.01
    param.isInitiator = self.data.isInitiator
    if (self.data.collageMemberId) {
      param.collageMemberId = self.data.collageMemberId
      param.collageEndTime = self.data.collageEndTime
    } else {
      param.collageMemberId = param.memberId
    }
    console.log(param)
    g.api.collageOrder({
        data: {
          memberOrder: param
        }
      })
      .then(res => {
        wx.hideLoading()
        if (res.data.retCode == '0000') {
          self.orderPay(res.data.retVal)
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
          title: '生成订单失败',
          icon: 'none'
        })
      })
  },
  upgradeOrder: function() {
    wx.showLoading({
      title: '正在提交',
    })
    var self = this
    var param = {}
    param.memberId = g.userInfo.memberId
    param.openid = g.userInfo.openid
    param.cardCategoryId = self.data.categoryid
    param.couponId = self.data.youhui.couponId
    param.cardId = self.data.cardid
    param.orderPrice = self.data.price
    param.couponPay = self.data.youhui.couponPrice
    param.payment = self.data.payment
    console.log(param)
    g.api.upgradeOrder({
        data: {
          memberOrder: param
        }
      })
      .then(res => {
        wx.hideLoading()
        if (res.data.retCode == '0000') {
          self.orderPay(res.data.retVal)
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
          title: '生成订单失败',
          icon: 'none'
        })
      })
  },
  renewOrder: function() {
    wx.showLoading({
      title: '正在提交',
    })
    var self = this
    var param = {}
    param.memberId = g.userInfo.memberId
    param.openid = g.userInfo.openid
    param.cardCategoryId = self.data.categoryid
    param.couponId = self.data.youhui.couponId
    param.cardId = self.data.cardid
    param.orderPrice = self.data.price
    param.couponPay = self.data.youhui.couponPrice
    param.payment = self.data.payment
    console.log(param)
    g.api.renewOrder({
        data: {
          memberOrder: param
        }
      })
      .then(res => {
        wx.hideLoading()
        if (res.data.retCode == '0000') {
          self.orderPay(res.data.retVal)
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
          title: '生成订单失败',
          icon: 'none'
        })
      })
  },
  addNewOrder: function() {
    wx.showLoading({
      title: '正在提交',
    })
    var self = this
    var param = {}
    param.memberId = g.userInfo.memberId
    param.openid = g.userInfo.openid
    param.cardCategoryId = self.data.categoryid
    param.couponId = self.data.youhui.couponId
    param.cardId = self.data.cardid
    param.orderPrice = self.data.price
    param.couponPay = self.data.youhui.couponPrice
    param.payment = self.data.payment
    console.log(param)
    g.api.addOrder({
        data: {
          memberOrder: param
        }
      })
      .then(res => {
        wx.hideLoading()
        if (res.data.retCode == '0000') {
          self.orderPay(res.data.retVal)
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
          title: '生成订单失败',
          icon: 'none'
        })
      })
  },
  orderPay(order) {
    wx.showLoading({
      title: '正在提交',
    })
    var that = this
    g.api.wechatPay(order.orderCode, g.userInfo.openid)
      .then(res => {
        wx.hideLoading()
        if (res.data.retCode == '0000') {
          var timeStamp = res.data.retVal.timeStamp;
          var nonceStr = res.data.retVal.nonceStr;
          var packageStr = res.data.retVal.packageString;
          var signType = res.data.retVal.signType;
          var paySign = res.data.retVal.paySign;
          var orderCode = res.data.retVal.orderCode;
          wx.requestPayment({
            'timeStamp': timeStamp,
            'nonceStr': nonceStr,
            'package': "prepay_id=" + packageStr,
            'signType': signType,
            'paySign': paySign,
            'success': function(res) {
              var str = ""
              str = res;
              // console.log(res);

              if (that.data.home == '1') {
                wx.switchTab({
                  url: '/pages/home/home',
                })
              } else if (that.data.home == '2') {
                wx.switchTab({
                  url: '/pages/fitness/plan/plan',
                })
              } else if (that.data.home == '3') {
                wx.switchTab({
                  url: '/pages/eating/eating',
                })
              } else {
                wx.navigateBack({
                  delta: 2
                })
              }
              wx.navigateTo({
                url: '/pages/coach/coach',
              })
              wx.showToast({
                title: "支付成功！",
                icon: 'none',
              })
            },
            fail: function(res) {
              var str = ""
              str = res;
              console.log(res);
              wx.showToast({
                title: "支付失败！",
                icon: 'none',
              })
            },
            complete: function(res) {
              var str = ""
              str = res;
              console.log(res);
            }
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
          title: '订单支付提交失败',
          icon: 'none'
        })
      })
  }

})