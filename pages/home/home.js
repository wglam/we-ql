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
    process: 0,
    step: 0,
    isque: false,
    isJs: false,
    iseating: false,
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
    var self = this
    g.api.searchCarousel()
      .then(res => {
        if (res.data.retCode == '0000') {
          var sliders = []
          for (var it of res.data.list) {
            it.objImg = g.api.getFile(it.objImg)
            sliders.push(it)
          }
          self.setData({
            sliders
          })
        }
      })
      .catch(e => {

      })
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
            val.vipIcon = g.api.getFile(data.cardCategoryLogo)
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
      if (!that.data.isJs) {
        var data = {}
        data.memberId = g.userInfo.memberId
        data.timeStr = new Date().Format("yyyy-MM-dd")

        g.api.getMemberJsPlan({
            data
          })
          .then(res => {
            if (res.data.retCode == '0000') {

              that.setData({
                isJs: true,
                process: res.data.retVal.completeRate
              })
            }
            wx.hideLoading()
          })
          .catch(res => {
            wx.hideLoading()
          })

      }
      if (!that.data.iseating) {
        g.api.getDietPlan({
            data: {
              memberId: g.userInfo.memberId
            }
          })
          .then(
            res => {
              if (res.data.retCode == '0000') {
                that.setData({
                  iseating: true
                })
              }
              wx.hideLoading()
            }
          )
          .catch(res => {
            wx.hideLoading()
          })
      }
    }
  },
  _checkMemberAnswer() {
    var that = this;
    if (!that.data.isque) {
      g.api.checkMemberAnswer({
          data: {
            memberId: g.userInfo.memberId
          }
        })
        .then(res => {
          if (res.data.retCode == '2222') {
            that.setData({
              isque: true
            });
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  sliderClick: function(e) {
    var item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: "/pages/sliderinfo/sliderinfo?id=" + item.carouselId,
    })
  }
})