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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.searchRefund()
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


  searchRefund: function() {
    var self = this;
    self.setData({
      isLoading: true,
      nodata: false,
    })
    var param = {}
    param.page = self.data.page + 1
    param.size = self.data.pageSize
    param.memberId = g.userInfo.memberId

    g.api.searchRefund({
        data: param
      })
      .then(res => {
        if (res.data.retCode == "0000") {
          var couponList
          if (param.page == 1) {
            couponList = []
          } else {
            couponList = self.data.couponList
          }
          if (res.data.list) {
            for (var it of res.data.list) {
              if (it.refundStatus == 3) {
                it.statusName = "审核中"
                it.style='doing'
              } else if (it.refundStatus == 4) {
                it.statusName = "已通过"
                it.style = 'success'
              } else if (it.refundStatus == 5) {
                it.statusName = "失败"
                it.style = 'fail'
              }
              couponList.push(it)
            }
          }

          self.setData({
            couponList,
            isLoading: false,
            nodata: (couponList < param.size),
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
        console.log(e)
        self.setData({
          isLoading: false,
        })
      })
  },
})