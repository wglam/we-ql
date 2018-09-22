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
      image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537262844254&di=78e033e0836ad431ead59adb7e5a6464&imgtype=0&src=http%3A%2F%2Fpic.35pic.com%2Fnormal%2F08%2F35%2F11%2F3637404_163333224000_2.jpg'
    }, {
      image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537262844254&di=04ec763529a73d671aa03ab32730372d&imgtype=0&src=http%3A%2F%2Fwww.jituwang.com%2Fuploads%2Fallimg%2F121027%2F234808-12102H3453020.jpg'
    }, {
      image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537262844252&di=82d6f27ffb69e501cab25eb1473caf8a&imgtype=0&src=http%3A%2F%2Fscimg.jb51.net%2Fallimg%2F161216%2F102-161216112014531.jpg'
    }, {
      image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537262850940&di=19c04f38fb61236f689b6d7b9b120574&imgtype=0&src=http%3A%2F%2Fimg02.tooopen.com%2Fproducts%2F20150425%2Ftooopen_89347611.jpg'
    }],
    process: 60,
    image: 'http://image.weilanwl.com/img/4x3-1.jpg'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  eatingClick: function () {
    wx.showToast({
      title: 'eating',
    })
  }
})