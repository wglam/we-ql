// pages/sliderinfo/sliderinfo.js
var g = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this;
    if (options.shareId) {
      wx.setStorageSync('shareId', options.shareId);
    }
    if (options.id) {
      var id = JSON.parse(options.id);
      self.setData({
        id
      })
    }

    if (g.userInfo == null) {
      wx.navigateTo({
        url: '/pages/shouquan/shouquan',
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.showLoading({
      title: '加载中',
    })
    var self = this;
    g.api.getCarousel({
        data: {
          carouselId: self.data.id,
        }
      })
      .then(res => {
        wx.hideLoading()
        if (res.data.retCode == "0000") {
          self.setData({
            carsouselInfo: res.data.retVal,
            objContent: res.data.retVal.objContent.replace(/\<img/gi, '< img style="max-width:100%;height:auto" '),
          })
        }
      })
      .catch(e => {
        wx.hideLoading()
        console.log(e)
      })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(ops) {
    var self = this;
    if (ops.from === 'menu') {
      var item = self.data.carsouselInfo
      var shareObj = {
        title: '氢练',
        path: "/pages/sliderinfo/sliderinfo?id=" + item.carouselId + "&shareId=" + g.userInfo.openid,
        imageUrl: g.api.getFile(item.objImg),
        success: function(res) {}
      }
      return shareObj;
    }
  },
})