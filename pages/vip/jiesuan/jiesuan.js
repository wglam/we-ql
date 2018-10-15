// pages/vip/jiesuan/jiesuan.js
var g = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    name: '一个月',
    price: 0,
    logo: '',
    category: '普通会员',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var val = {}
    if (options.id) {
      val.id = options.id
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
    if (options.price) {
      val.price = options.price
    }

    var that = this
    that.setData(val)
  },


})