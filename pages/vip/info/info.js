// pages/vip/buy/buy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ['普通会员', 'VIP会员'],
    current: 0
  },
  tabChange: function(e) {
    this.setData({
      current: e.detail
    });
  }
})