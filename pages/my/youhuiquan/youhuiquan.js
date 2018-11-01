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

    if (options.price) {
      val.price = options.price
    }
    this.setData(val)
    // this.searchMemberCoupon();
  },
  loadCoupon() {
    console.log("loadCoupon")
    var self = this;
    if (self.data.price >= 1) {
      self.searchOrderCoupon();
    } else {
      self.searchMemberCoupon();
    }
  },
  //列表信息
  searchMemberCoupon: function() {

    var self = this;
    self.setData({
      isLoading: true,
      nodata: false,
    })
    var param = {}
    param.page = self.data.page + 1
    param.size = self.data.pageSize
    param.openid = g.userInfo.openid

    g.api.searchMemberCoupon({
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
  searchOrderCoupon: function() {

    var self = this;
    self.setData({
      isLoading: true,
      nodata: false,
    })
    var param = {}
    param.page = self.data.page + 1
    param.size = self.data.pageSize
    param.openid = g.userInfo.openid
    param.orderPrice = self.data.price

    g.api.searchOrderCoupon({
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
            nodata: (couponList.length < param.size),
            page: param.page
          })
        } else {
          self.setData({
            isLoading: false,
            nodata: true,
          })
          // wx.showToast({
          //   title: res.data.retDesc,
          //   icon: 'none',
          //   duration: 2000
          // })
          // setTimeout(function() {
          //   wx.navigateBack({
          //     delta: 1
          //   })
          // }, 1000)
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
    if (self.data.price > 0) {
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1]; //当前页面
      var prevPage = pages[pages.length - 2]; //上一个页面
      var item = e.currentTarget.dataset.item
      var tp = self.data.price - item.couponPrice
      tp = tp <= 0 ? 0 : tp
      prevPage.setData({
        payment: tp,
        youhui: item
      })
      wx.navigateBack({
        delta: 1
      })
    } else {
      wx.navigateTo({
        url: '/pages/vip/buy/buy',
      })
    }
    console.log(e.currentTarget.dataset.item);
  }
})