// pages/youhuiquanMy/youhuiquanMy.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageCount: "",
    currentPage: 1,
    couponList: [],
    imgURL: '',

    price: -1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var val = {
      pageCount: "",
      currentPage: 1,
      couponList: [{
        couponId: "50",
        couponName: "满50减10",
        couponPrice: "10.00",
        reductionPrice: "50.00",
        albDay: "30",
        isUsed: "1", //使用状态：1（未使用）；2（已使用）
        createTime: "2018-07-26"
      }, {
        couponId: "60",
        couponName: "满60减20",
        couponPrice: "20.00",
        reductionPrice: "60.00",
        albDay: "30",
        isUsed: "1", //使用状态：1（未使用）；2（已使用）
        createTime: "2018-07-26"
      }],
    }

    if (options.price) {
      val.price = options.price
    }
    this.setData(val)
    // this.searchMemberCoupon();
  },
  //列表信息
  searchMemberCoupon: function() {
    var that = this;
    wx.request({
      url: '/wechat/searchMemberCoupon',
      method: 'GET',
      data: {
        openid: util.getOpenId(),
        page: that.data.currentPage,
        size: 20,
      },
      header: {
        'Accept': 'application/json',
      },
      success: function(res) {
        if (res.data.retCode == "0000") {
          var couponList = that.data.couponList;
          for (let i = 0; i < res.data.list.length; i++) {
            couponList.push(res.data.list[i])
          }
          that.setData({
            couponList: couponList,
            pageCount: res.data.pageCount
          })
          if (that.data.currentPage == that.data.pageCount) {
            that.setData({
              loadMoreData: '没有数据了',
              isMore: true
            })
          }
        } else {
          wx.showToast({
            title: res.data.retDesc,
            icon: 'none',
            duration: 2000
          })
          that.setData({
            couponList: []
          })
        }
      }
    })
  },
  loadMore: function() {
    var that = this;
    // 当前页是最后一页
    if (that.data.currentPage == that.data.pageCount) {
      that.setData({
        loadMoreData: '已经到底了',
        isMore: true
      })
      return;
    }
    setTimeout(function() {
      that.searchMemberCoupon();
      var tempCurrentPage = that.data.currentPage;
      tempCurrentPage = tempCurrentPage + 1;
      that.setData({
        currentPage: tempCurrentPage,
        isMore: false
      })

    }, 300);
  },

  addMemberCoupon: function(e) {
    //先判断有没有授权。如果没有授权要先跳到授权页面
    var openId = wx.getStorageSync('openId');
    if (openId == "" || openId == undefined || openId == null) {
      wx.navigateTo({
        url: '/pages/shouquan/shouquan',
      })
      return;
    }
    var couponId = e.currentTarget.dataset.couponid;
    var that = this;
    wx.request({
      url: commonURL + '/wechat/addMemberCoupon',
      method: 'GET',
      data: {
        openid: util.getOpenId(),
        couponId: couponId,
      },
      header: {
        'Accept': 'application/json',
      },
      success: function(res) {
        if (res.data.retCode == "0000") {
          wx.showToast({
            title: '领取成功',
            icon: 'none',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: res.data.retDesc,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /*跳到首页 */
  goToHome: function() {
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  useClick: function(e) {
    var self = this
    if (self.data.price >= 1) {
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1]; //当前页面
      var prevPage = pages[pages.length - 2]; //上一个页面
      var item = e.currentTarget.dataset.item
      var tp = self.data.price - item.couponPrice
      tp = tp <= 0 ? 0 : tp
      prevPage.setData({
        tprice: tp,
        youhui: item
      })
      wx.navigateBack({
        delta: 1
      })
    } else {

    }
    console.log(e.currentTarget.dataset.item);
  }
})