// pages/my/vip/vip.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vipname: "VIP会员",
    days: 84,
    start: "2018-09-01",
    end: "2018-10-30",
    vips: [{
        name: 'VIP会员',
        time: '一个月',
        date: '2018-10-01',
        menoy: 800,
        vip:true
      }, {
        name: 'VIP会员',
        time: '三个月',
        date: '2018-08-30',
        menoy: 1600
      },
      {
        name: '普通会员',
        time: '一个月',
        date: '2018-07-10',
        menoy: 169
      }
    ]
  },


})