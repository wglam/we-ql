// pages/my/photo/photo.js

var g = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: '',
    photos: []
  },
  onReady(options) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    g.api.searchMemberDietPlan({
        data: {
          memberId: g.userInfo.memberId
        }
      })
      .then(res => {
        if (res.data.retCode == '0000') {
          that.setData({
            baseUrl: g.api.getFileBase(),
            photos: res.data.list
          })
        }
        wx.hideLoading()
      })
      .catch(e => {
        console.log(e)
        wx.hideLoading()
      })
  }
})