import Api from '/utils/Api'

//app.js
App({
  onLaunch: function() {
    var user = wx.getStorageSync('userInfo');
    if (user != '') {
      this.globalData.userInfo = user;
    }
  },
  globalData: {
    userInfo: null,
    api: new Api({
      baseURL: 'https://xcx.jetem.cn/',
    })
  }
})