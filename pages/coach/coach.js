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
    g.api.searchConfig({
        data: {
          configType: "kfCodeImg"
        }
      })
      .then(res => {
        wx.hideLoading()
        if (res.data.retCode == "0000") {
          if (res.data.list.length > 0) {
            var val = {};
            for (let i = 0; i < res.data.list.length; i++) {
              if (res.data.list[i].configType == "kfCodeImg") {
                val.trainQrcode = g.api.getFile(res.data.list[i].configVal)
              }
            }
            var that = this;
            that.setData(val)
          }
        }
      })
      .catch(e => {
        wx.hideLoading()
        console.log(e)
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