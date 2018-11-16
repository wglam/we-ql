// pages/youhuiquanMy/youhuiquanMy.js
const app = getApp();
var g = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    pageSize: 10,
    isLoading: false,
    nodata: false,
    couponList: [],
    price: -1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var val = {
      pageCount: "",
      currentPage: 1,
    }
    this.setData(val)
  },
  loadCoupon() {
    console.log("loadCoupon")
    var self = this;
    self.setData({
      isLoading: true,
      nodata: false,
    })
    var param = {}
    param.page = self.data.page + 1
    param.size = self.data.pageSize
    param.openid = g.userInfo.openid
    param.couponType = 3

    g.api.searchCoupon({
        data: param
      })
      .then(res => {
        if (res.data.retCode == "0000") {
          var couponList = self.data.couponList
          if (param.page == 1) {
            couponList = []
          }
          if (res.data.list) {
            for (var it of res.data.list) {
              couponList.push(it)
            }
          }
          self.setData({
            couponList,
            isLoading: false,
            nodata: (res.data.list.length < param.size),
            page: param.page
          })
        } else {
          self.setData({
            isLoading: false,
            nodata: true,
          })

        }
      })
      .catch(e => {
        self.setData({
          isLoading: false,
        })
      })

  },
  onReady: function() {
    this.loadCoupon();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.loadCoupon();
  },

  /*跳到首页 */
  goToHome: function() {
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  useClick: function(e) {
    var self = this
    var item = e.currentTarget.dataset.item
    console.log(e.currentTarget.dataset.item);
    wx.showLoading({
      title: '请稍后',
    })
    var param = {}
    param.openid = g.userInfo.openid
    param.couponId = item.couponId
    g.api.addMemberCoupon({
        data: param
      })
      .then(res => {
        wx.hideLoading()
        if (res.data.retCode == '0000') {
          wx.showToast({
            title: '优惠券领取成功!',
          })
        } else {
          wx.showToast({
            title: res.data.retDesc,
            icon: 'none'
          })
        }
      })
      .catch(e => {
        wx.hideLoading()
        wx.showToast({
          title: '优惠券领取失败!',
          icon: 'none'
        })
      })
  }
})