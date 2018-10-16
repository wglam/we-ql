var g = getApp().globalData

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    avatar: "",
    vip: false,
    vipname: '普通会员',
    signature: "一句话讲述自己的健身宣言",
    day: 0,
    bmi: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (g.userInfo != null) {
      var that = this;
      var user = g.userInfo;
      user.bmiStatus = g.api.getBmiStatus(user.bodyStatus)
      user.vip = false
      that.setData(user)

      g.api.checkMemberCard(g.userInfo.memberId)
        .then(res => {
          that.setData({
            vip: res.data.retCode == '0000'
          })
        })
        .catch(res => {

          that.setData({
            vip: true
          })
        })

    }
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

  }
})