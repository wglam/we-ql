
var g = getApp().globalData

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  formSubmit: function (e) {
    var _data = e.detail.value;
    console.log(_data)
    if (_data.refundPrice == '') {
      wx.showModal({
        content: "请输入退款金额",
        showCancel: false,
      })
      return false
    }
    if (_data.refundRemark == '') {
      wx.showModal({
        content: "请输入退款原因",
        showCancel: false,
      })
      return false
    }
    _data.memberId = g.userInfo.memberId

    wx.showLoading({
      title: '正在提交',
    })
    g.api.refund({
      data: {
        refundInfo: _data
      }
    })
      .then(res => {
        wx.hideLoading()
        if (res.data.retCode == '0000') {
          wx.showToast({
            title: '提交成功'
          })
          wx.navigateBack({
            delta: 1
          })
        } else {
          wx.showToast({
            title: res.data.retDesc,
            icon: 'none'
          })
        }
      })
      .catch(res => {
        wx.hideLoading()
        wx.showToast({
          title: '提交失败',
          icon: 'none'
        })
      })
  }

})