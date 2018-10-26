// pages/my/set/set.js
var g = getApp().globalData

Page({

  onLoad(opts) {


  },
  /**
   * 页面的初始数据
   */
  data: {
    genders: ['--', '男', '女']
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (g.userInfo != null) {
      var that = this;
      var val = g.userInfo;
      // that.setData(user)
      g.api.checkMemberCard(g.userInfo.memberId)
        .then(res => {
          val.vip = res.data.retCode == '0000'
          that.setData(val)
        })
        .catch(res => {
          val.vip = false
          that.setData(val)
        })
    }
  },
  bindSexChange: function(e) {
    var that = this
    that.setData({
      memberSex: e.detail.value
    })
  },
  chosePortrait: function() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.uploadDietFile(res.tempFilePaths[0]);
      }
    })
  },
  formSubmit: function(e) {
    wx.showLoading({
      title: '正在保存',
    })
    const params = e.detail.value
    g.api.updateMember({
        data: {
          memberInfo: params
        }
      })
      .then(res => {
        wx.hideLoading()
        if (res.data.retCode == '0000') {
          var user = g.userInfo
          user.memberName = params.memberName
          user.signature = params.signature
          user.portrait = params.portrait
          user.memberSex = params.memberSex
          user.memberPhone = params.memberPhone
          g.userInfo = user
          wx.setStorageSync('userInfo', user);

          wx.showToast({
            title: '保存成功',
          })
        } else {
          wx.showToast({
            title: res.data.retDesc ? res.data.retDesc : '保存失败',
            icon: 'none'
          })
        }
      }).catch(e => {
        console.log(e)
        wx.hideLoading()
        wx.showToast({
          title: '保存失败',
          icon: 'none'
        })
      })
  }
})