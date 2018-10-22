// pages/eating/eating.js

var g = getApp().globalData

Page({

  /**
   * 页面的初始数据
   */
  data: {
    colors: ["#A6CBA0", "#ebb774", "#FF856E"],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (g.userInfo == null) {
      wx.navigateTo({
        url: '/pages/shouquan/shouquan',
      })
      return
    }
    this._getDietPlan()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  _getDietPlan: function() {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    g.api.getDietPlan({
        data: {
          memberId: g.userInfo.memberId
        }
      })
      .then(
        res => {
          if (res.data.retCode == '0000') {
            var s = res.data.retVal.planContent.replace(/\s+/g, '');
            var val = {}
            val.items = JSON.parse(s)
            that.setData(val)
          }
          wx.hideLoading()
        }
      )
      .catch(res => {
        wx.hideLoading()
      })
  },
  submitDiet: function() {
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
  uploadDietFile: function(f) {
    wx.showLoading({
      title: '正在提交',
    })
    g.api.uploadFile(f,
      res => {
        console.log(res)
        var val = JSON.parse(res.data)
        if (val.retCode == "0000") {
          var pic = val.list[0]
          g.api.addMemberDietPlan({
              data: {
                memberDietPlan: {
                  imgStr: pic,
                  memberId: g.userInfo.memberId
                }
              }
            })
            .then(res => {
              wx.hideLoading()
              if (res.data.retCode == '0000') {
                wx.navigateTo({
                  url: '/pages/my/photo/photo',
                })
                wx.showToast({
                  title: '打卡成功'
                });
              } else {
                wx.showToast({
                  title: '打卡失败',
                  icon: 'none'
                });
              }

            })
            .catch(res => {
              wx.hideLoading()
              wx.showToast({
                title: '打卡失败',
                icon: 'none'
              });

            })
        } else {
          wx.hideLoading()
          wx.showToast({
            title: '打卡失败',
            icon: 'none'
          });
        }
      },
      fail => {
        wx.hideLoading()
        wx.showToast({
          title: '打卡失败，请重试'
        });
      })
  }
})