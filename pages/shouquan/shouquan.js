var g = getApp().globalData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    routineName: '', //小程序名称
    logoImg: '', //小程序图片
    imgURL: '',
    phone: '',
  },
  bindGetUserInfo: function(event) {
    var param = {};
    param.encryptedData = event.detail.encryptedData;
    param.iv = event.detail.iv;
    g.api.login(param);
  },
  /*小程序的logo名称和图片 */
  searchConfig: function() {
    g.api.searchConfig()
      .then(res => {
        if (res.data.retCode == "0000") {
          if (res.data.list.length > 0) {
            var val = {};
            for (let i = 0; i < res.data.list.length; i++) {
              if (res.data.list[i].configType == "logoImg") {
                val.logoImg = g.api.getFile(res.data.list[i].configVal)
              }
              if (res.data.list[i].configType == "routineName") {
                val.routineName = res.data.list[i].configVal
              }
            }
            var that = this;
            that.setData(val)
          }
        } else {
          wx.showToast({
            title: res.data.retDesc,
            icon: 'none',
            duration: 2000
          })
        }
      });
  },

  getPhoneNumber: function(e) {
    var that = this;
    wx.login({
      success: res => {
        console.log(res.code);
        wx.request({
          url: commonURL + '/wechat/decodeUserPhone',
          data: {
            'encryptedData': e.detail.encryptedData,
            'iv': e.detail.iv,
            'code': res.code
          },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            'content-type': 'application/json'
            //'content-type': 'application/x-www-form-urlencoded'
          }, // 设置请求的 header
          success: function(res) {
            if (res.data.status == 1) { //我后台设置的返回值为1是正确
              //存入缓存即可           
              var phone = res.data.phoneNumber; //phone
              wx.setStorageSync('phone', res.data.phoneNumber);
              that.setData({
                phone: phone
              });
              wx.navigateBack({
                delta: 1
              })

            } else {

            }
          },
          fail: function(err) {
            console.log(err);
          }
        })
      }
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.searchConfig();
  },
  getWeRunData: function(code) {
    wx.getWeRunData({
      success(resRun) {
        g.api.decodeUserInfo({
            data: {
              encryptedData: resRun.encryptedData,
              iv: resRun.iv,
              code: code
            }
          })
          .then(res => {
            console.log(res);
          }, fail => {

          })
      },
      fail(val) {

      }
    })

  }
})