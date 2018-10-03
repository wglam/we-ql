// pages/fitness/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    video: "",
    dzyl: "",
    hxyl: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: options.title,
    })
    if (options.video) {
      options.video = "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
    }
    console.log(options)
    var that = this;
    that.setData(options)
  },

})