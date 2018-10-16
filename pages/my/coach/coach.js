// pages/my/coach/coach.js
var g = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onReady() {
    wx.showLoading({
      title: '加载中',
    })
    var self = this
    g.api.getMemberByOpenid(res => {
      wx.hideLoading()
      var val = {}
      val.trainer = res.trainer
   
      if (res.trainQrcode) {
        val.trainQrcode = g.api.getFile(res.trainQrcode)
      }
      if (res.adminPic) {
        val.adminPic = res.adminPic
      }

      self.setData(val)
    }, e => {
      wx.hideLoading()
    })
  },
  downLoadFile(e) {
    var self = this
    wx.showLoading({
      title: '下载中',
    })
    wx.downloadFile({
      url: self.data.trainQrcode,
      success: function(res) {

        if (res.statusCode === 200) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res) {
              wx.hideLoading()
              console.log(res);
              wx.showToast({
                title: '保存成功',
              });
            },
            fail(res) {
              wx.hideLoading()
              console.log(res);
              wx.showToast({
                title: '保存失败',
                icon: 'none'
              })
            } 
          })
        } else {
          wx.hideLoading()
          wx.showToast({
            title: '保存失败',
            icon: 'none'
          })
        }

      },
      fail: function() {
        wx.hideLoading()
        wx.showToast({
          title: '保存失败',
          icon: 'none'
        })
      }
    })
  }

})