// pages/my/photo/photo.js

var g = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: '',
    photos: [],
  },
  onLoad(options) {
    if (g.userInfo == null) {
      wx.navigateTo({
        url: '/pages/shouquan/shouquan',
      })
      return
    }
    if (options.title) {
      wx.setNavigationBarTitle({
        title: options.title
      })
    }
    var _id = null
    if (options.id) {
      _id = options.id
      this.setData({
        isShare: true
      })
    }
    this.loadData(_id)
  },
  loadData(_id) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    if (!_id) {
      _id = g.userInfo.memberId
    }
    g.api.searchMemberDietPlan({
        data: {
          memberId: _id
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
                this.loadData()
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
        path: "/pages/my/photo/photo?shareId=" + g.userInfo.openid +
          "&title=" + g.userInfo.memberName + "的相册&id=" + g.userInfo.memberId
      }
      return shareObj;
    }
  }
})