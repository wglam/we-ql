// pages/eating/eating.js

var g = getApp().globalData

Page({

  /**
   * 页面的初始数据
   */
  data: {
    colors: ["#A6CBA0", "#ebb774", "#FF856E"],
    nodata: false,
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
    if (g.userInfo == null) {
      wx.navigateTo({
        url: '/pages/shouquan/shouquan',
      })
      return
    }
    var that = this
    if (!(that.data.items && that.data.items.length >= 1)) {
      g.api.checkMemberCard(g.userInfo.memberId)
        .then(res => {
          if (res.data.retCode == '0000') {
            that._getDietPlan();
          } else {
            wx.navigateTo({
              url: '/pages/vip/info/info',
            })
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
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
          wx.hideLoading()
          var val = {}
          if (res.data.retCode == '0000') {
            var s = res.data.retVal.planContent.replace(/\s+/g, '');
            val.items = JSON.parse(s)
            console.log(val.items)
            val.nodata = false

          } else {
            val.nodata = true
          }
          that.setData(val)

        }
      )
      .catch(res => {
        wx.hideLoading()
        that.setData({
          nodata: true
        })
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
  },
  onShareAppMessage: function(ops) {
    var self = this;
    if (ops.from === 'menu') {
      var shareObj = {
        title: '氢练',
        path: "/pages/home/home?shareId=" + g.userInfo.openid,
        imageUrl: '/img/bg.jpg'
      }
      return shareObj;
    }
  }
})