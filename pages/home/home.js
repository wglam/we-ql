// pages/index/index.js
var g = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    avatar: "",
    vip: false,
    vipname: '',
    vipIcon: '',
    swiper: [{
      video: 'http://1257742881.vod2.myqcloud.com/68edbcccvodgzp1257742881/d27560385285890782277992702/xB0Gtc1ECj0A.mp4',
      image: '/img/bg.jpg'
    }, {
      image: '/img/2.png'
    }, {
      image: '/img/3.png'
    }, {
      image: '/img/4.png'
    }],
    process: 0,
    step: 0,
    isque: false,
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (g.userInfo != null) {
      var val = {}
      val.name = g.userInfo.memberName
      val.avatar = g.userInfo.portrait
      var that = this;
      that.setData(val)

      var that = this;
      g.api.getMemberCard(g.userInfo.memberId)
        .then(res => {
          var data = res.data.retVal;
          if (data.cardId) {
            var val = {}
            val.vip = true;
            val.vipname = data.cardCategoryName;
            val.vipIcon = data.cardImg
            that.setData(val);
            if (val.vip) {
              that._checkMemberAnswer()
            }
          }
        })


      // g.api.getStep(res => {
      //   console.log(res)
      // }, fail => {

      // })

    }
  },
  _checkMemberAnswer() {
    var that = this;
    g.api.checkMemberAnswer({
        data: {
          memberId: g.userInfo.memberId
        }
      })
      .then(res => {
        var val = res.data.retCode == '2222'
        that.setData({
          isque: val
        });
      })
      .catch(res => {

      })
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
    // wx.showToast({
    //   title: 'join',
    // })
  }
})