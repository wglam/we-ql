// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {
      name: "张三丰",
      avatarUrl: "http://image.weilanwl.com/img/square-3.jpg",
      vip: true,
      vipname: '普通会员'
    },
    swiper: [{
      video: 'https://pic.ibaotu.com/00/78/86/31w888piC8Pc.mp4',
      image: '/img/bg.jpg'
    }, {
      image: '/img/2.png'
    }, {
      image: '/img/3.png'
    }, {
      image: '/img/4.png'
    }],
    process: 60,
    image: 'http://image.weilanwl.com/img/4x3-1.jpg',
    step: 313245
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  join: function() {
    wx.showToast({
      title: 'join',
    })
  }
})