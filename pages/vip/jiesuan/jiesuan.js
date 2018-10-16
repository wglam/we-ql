// pages/vip/jiesuan/jiesuan.js
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

    var that = this
    that.setData(val)
    console.log(val)
  },
  addOrder: function(e) {
    var that = this
    if (that.data.orderType == "renew") {

    } else {
      that.addNewOrder()
    }
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
    // param.payment = self.data.payment
    param.payment = 0.001
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
              console.log(res);

              wx.switchTab({
                url: '/pages/home/home',
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