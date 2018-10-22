var g = getApp().globalData

Page({

  /**
   * 页面的初始数据
   */
  data: {
    vip: false,
    signature: "一句话讲述自己的健身宣言",
    day: 0,
    bmi: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (g.userInfo == null) {
      wx.navigateTo({
        url: '/pages/shouquan/shouquan',
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (g.userInfo != null) {
      var that = this;
      var val = {}
      val.dietNum = g.userInfo.dietNum
      val.portrait = g.userInfo.portrait
      val.memberName = g.userInfo.memberName
      val.BMI = g.userInfo.BMI
      val.bmiStatus = g.api.getBmiStatus(g.userInfo.bodyStatus)

      if (g.userInfo.signature && g.userInfo.signature != '') {
        val.signature = g.userInfo.signature
      }
      console.log(val)
      that.setData(val)

      g.api.checkMemberCard(g.userInfo.memberId)
        .then(res => {
          that.setData({
            vip: res.data.retCode == '0000'
          })
        })
        .catch(res => {
          that.setData({
            vip: false
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

})