var g = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nodata: true,
    authed: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var val = {}
    console.log("二维码", options)
    // options.orderCode ='ORD1811000130'
    if (options.scene) {
      val.orderCode = options.scene
    }
    var that = this
    if (g.userInfo) {
      that.setData({
        authed: true
      })
    }
    wx.showLoading({
      title: '加载中',
    })
    g.api.getOrder({
        data: {
          orderCode: val.orderCode
        }
      })
      .then(res => {
        if (res.data.retCode == '0000') {
          var val = res.data.retVal
          val.nodata = false
          that.setData(val)

          g.api.getCard(val.cardId)
            .then(res => {
              wx.hideLoading()
              if (res.data.retCode == '0000') {
                var ival = {}
                if (res.data.retVal.cardCategoryLogo) {
                  ival.logo = g.api.getFile(res.data.retVal.cardCategoryLogo)
                }

                if (res.data.retVal.cardImg) {
                  ival.img = g.api.getFile(res.data.retVal.cardImg)
                }
                ival.cardName = res.data.retVal.cardName
                that.setData(ival)
              }
            })
            .catch(e => {
              wx.hideLoading()
            })
        } else {
          wx.hideLoading()
          wx.showToast({
            title: res.data.retDesc,
            icon: 'none'
          })
        }
      })
      .catch(e => {
        wx.hideLoading()
        wx.showToast({
          title: '加载错误',
          icon: 'none'
        })
      })
  },
  bindGetUserInfo: function(event) {
    var that = this
    var param = {}
    param.encryptedData = event.detail.encryptedData
    param.iv = event.detail.iv;
    wx.showLoading({
      title: '正在绑定',
    })
    g.api._wxlogin(code => {
      var shareId = wx.getStorageSync('shareId');
      param.offerOpenid = shareId;
      if (code) {
        param.code = code;
        g.api.decodeUserInfo({
            data: param
          })
          .then(res => {
            if (res.data.status == 1) {
              var userInfo = res.data.userInfo;
              var openId = userInfo.openId; //返回openid
              wx.setStorageSync('openId', openId);
              g.api.memberByOpenid({
                  data: {
                    openid: openId
                  }
                })
                .then(res => {
                  if (res.data.retCode == "0000") {
                    getApp().globalData.userInfo = res.data.retVal
                    wx.setStorageSync('userInfo', res.data.retVal);
                    that.bindOrder()
                  } else {
                    wx.hideLoading()
                    wx.showToast({
                      title: res.data.retDesc,
                    })
                  }
                })
                .catch(e => {
                  wx.hideLoading()
                  wx.showToast({
                    title: '绑定失败',
                    icon: 'none'
                  })
                })
            } else {
              wx.hideLoading()
              wx.showToast({
                title: res.data.msg,
                icon: 'none'
              })
            }
          })
          .catch(e => {
            wx.hideLoading()
            wx.showToast({
              title: '绑定失败',
              icon: 'none'
            })
          })
      } else {
        wx.hideLoading()
        wx.showToast({
          title: '绑定失败',
          icon: 'none'
        })
      }
    }, e => {
      wx.hideLoading()
      wx.showToast({
        title: '绑定失败',
        icon: 'none'
      })
    })
  },
  bindClick: function(e) {
    wx.showLoading({
      title: '正在绑定',
    })
    this.bindOrder()
  },
  bindOrder: function() {
    var that = this
    var parm = {}
    parm.orderCode = that.data.orderCode
    parm.memberId = g.userInfo.memberId
    parm.openid = g.userInfo.openid
    g.api.bindOrder({
        data: parm
      })
      .then(res => {
        wx.hideLoading()
        if (res.data.retCode == "0000") {
          wx.switchTab({
            url: '/pages/home/home',
          })
        } else {
          wx.hideLoading()
          wx.showToast({
            title: res.data.retDesc,
            icon: 'none'
          })
        }
      })
      .catch(e => {
        wx.hideLoading()
        wx.showToast({
          title: '绑定失败',
          icon: 'none'
        })
      })
  }
})