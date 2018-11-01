// pages/my/mydata/mydata.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    normal: '#726C7A',
    active: 'white',
    chartsHide:false,
    opts: {
      lazyLoad: true,
    },
    chats: [{
      name: "体重",
      unit: "kg",
      target: -1,
      bodyType: 1
    }, {
      name: "胸围",
      unit: "cm",
      target: -1,
      bodyType: 4

    }, {
      name: "腰围",
      unit: "cm",
      target: -1,
      bodyType: 5
    }, {
      name: "腿围",
      unit: "cm",
      target: -1,
      bodyType: 6
    }, {
      name: "身高",
      unit: "cm",
      target: -1,
      bodyType: 2
    }, {
      name: "BMI",
      target: -1,
      bodyType: 3
    }],
    loadComplete: false
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
  tabClick(e) {
    this.onTabChange(e.currentTarget.id);
  },
  onTabChange(i) {
    this.setData({
      current: i
    });
  }
})