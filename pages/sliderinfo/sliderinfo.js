// pages/sliderinfo/sliderinfo.js
var g = getApp().globalData;
var WxParse = require('../../wxParse/wxParse.js');
Page({
  onLoad: function(options) {
    var self = this;
    if (options.shareId) {
      wx.setStorageSync('shareId', options.shareId);
    }
    if (g.userInfo == null) {
      wx.navigateTo({
        url: '/pages/shouquan/shouquan',
      })
    }

    if (options.id) {
      var id = options.id;
      self.setData({
        id
      })
    }

    /**
     * 初始化emoji设置
     */
    WxParse.emojisInit('[]', "/wxParse/emojis/", {
      "00": "00.gif",
      "01": "01.gif",
      "02": "02.gif",
      "03": "03.gif",
      "04": "04.gif",
      "05": "05.gif",
      "06": "06.gif",
      "07": "07.gif",
      "08": "08.gif",
      "09": "09.gif",
      "09": "09.gif",
      "10": "10.gif",
      "11": "11.gif",
      "12": "12.gif",
      "13": "13.gif",
      "14": "14.gif",
      "15": "15.gif",
      "16": "16.gif",
      "17": "17.gif",
      "18": "18.gif",
      "19": "19.gif",
    })
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

          WxParse.wxParse('article', 'html', res.data.retVal.objContent, self, 5);
          self.setData({
            carsouselInfo: res.data.retVal
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