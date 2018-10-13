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
            var val = res.data.retVal.planContent
            that.setData(val)
          }
          // var val = {
          //   items: [{
          //     title: "补水情况",
          //     ttips: "运动中补水：",
          //     tips: "可以随时小口补水，但是不要一下子喝太多;",
          //     texamples: "平时补水：",
          //     examples: "每天8杯水为好，大概在1.5-2升，一天均匀补水"
          //   }, {
          //     title: "早餐推荐",
          //     ttips: "饮食结构：",
          //     tips: "鸡蛋白1-2个 脂肪 坚果20g 小番茄5个",
          //     texamples: "搭配示例：",
          //     examples: "鸡蛋白1-2个脂肪坚果20g小番茄5个鸡蛋白1-2个脂肪坚果20g小番茄5个鸡蛋白1-2个脂肪坚果20g小番茄5个"
          //   }, {
          //     title: "中餐推荐",
          //     ttips: "饮食结构：",
          //     tips: "碳水 米饭（糙米100克或红薯拳头大小 ）蛋白质 120g即食鸡胸肉（牛肉或者去皮鸡腿肉）",
          //     texamples: "搭配示例：",
          //     examples: "鸡蛋白1-2个脂肪坚果20g小番茄5个鸡蛋白1-2个脂肪坚果20g小番茄5个鸡蛋白1-2个脂肪坚果20g小番茄5个"
          //   }, {
          //     title: " 晚餐推荐",
          //     ttips: "饮食结构：",
          //     tips: "鸡蛋白1-2个 脂肪 坚果20g 小番茄5个",
          //     texamples: "搭配示例：",
          //     examples: "鸡蛋白1-2个脂肪坚果20g小番茄5个鸡蛋白1-2个脂肪坚果20g小番茄5个鸡蛋白1-2个脂肪坚果20g小番茄5个"
          //   }]
          // }
          // that.setData(val)
          wx.hideLoading()
        }
      )
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
                imgStr: pic,
                memberId: g.userInfo.memberId
              }
            })
            .then(res => {
              wx.hideLoading()
              if (res.data.retCode == '0000') {
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