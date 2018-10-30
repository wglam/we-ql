// pages/vip/info/info.js
var WxParse = require('../../../wxParse/wxParse.js');
var g = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    html: '',
    home: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
  onLoad: function(options) {
    if (options.shareId) {
      wx.setStorageSync('shareId', options.shareId);
    }
    if (g.userInfo == null) {
      wx.navigateTo({
        url: '/pages/shouquan/shouquan',
      })
    }
    if (options.home) {
      this.setData({
        home: options.home
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
    var self = this
    g.api.searchConfig({
        data: {
          configType: 'memberDetail'
        }
      })
      .then(res => {
        wx.hideLoading()
        if (res.data.retCode) {
          WxParse.wxParse('article', 'html', res.data.list[0].configVal, self, 5);
        }
      })
      .catch(e => {
        console.log(e)
        wx.hideLoading()
      })
  },
  onShareAppMessage: function(ops) {
    var self = this;
    if (ops.from === 'menu') {
      var shareObj = {
        title: '氢练',
        path: "/pages/vip/info/info?shareId=" + g.userInfo.openid + "&home=1",
      }
      return shareObj;
    }
  }
})