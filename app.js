import Api from '/utils/Api'

//app.js
App({
  onLaunch: function() {

  },
  getUserInfo: function(cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function() {
          wx.getUserInfo({
            success: function(res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo)
              console.log(that.globalData.userInfo);
            }
          })
        }
      });
    }
  },
  globalData: {
    userInfo: null,
    api: new Api({
      baseURL: 'https://xcx.jetem.cn/',
    })
  }
})