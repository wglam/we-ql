// pages/vip/buy/buy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ['普通会员', 'VIP会员1', 'VIP会员2'],
    vipkey: 0
  },
  tabChange: function(e) {
    console.log(e);
    const that = this;
    that.setData({
      vipkey: e.detail
    });
  }
})