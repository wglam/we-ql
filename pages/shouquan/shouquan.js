// pages/shouquan/shouquan.js
// const app = getApp();
// var commonURL = app.globalData.commonURL;
// var imgURL = app.globalData.imgURL;
// var util = require('../../utils/util.js');

var qlApi = getApp().globalData.api;

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
    wx.showLoading({
      title: '加载中',
    })
    // console.log(event.detail.encryptedData)
    // console.log(event.detail.iv)
    // console.log(event.detail.rawData)
    // console.log(event.detail.signature)
    console.log(event.detail.userInfo)
    var param = {};

    param.encryptedData = event.detail.encryptedData;
    param.iv = event.detail.iv;

    var that = this;
    console.log(that)
    var shareId = wx.getStorageSync('shareId');
    param.offerOpenid = shareId;
    //使用
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框


    //     } else {
    //       console.log('获取用户信息失败')
    //       wx.hideLoading();
    //     }
    //   }
    // })

    wx.login({
      success: function(res) {
        var code = res.code; //登录凭证
        if (code) {
          param.code = code;
          console.log(param)
          qlApi.decodeUserInfo({
              data: param
            })
            .then(data => {
              if (data.data.status == 1) {
                var userInfo = data.data.userInfo;
                console.log(userInfo)
                that.setData({
                  userInfo: data.data.userInfo,
                  hasUserInfo: true
                });
                var openId = userInfo.openId; //返回openid

                wx.setStorageSync('openId', openId);
                that.setData({
                  openId: openId
                });
                wx.navigateBack({
                  delta: 1
                })
                console.log('that.data')
                console.log(that.data)
              } else {
                console.log('解密失败')
              }
              wx.hideLoading();
            }, fail => {
              console.log(fail)
              wx.hideLoading();
            });

        } else {
          console.log('获取用户登录态失败！' + r.errMsg)
          wx.hideLoading();
        }
      },
      fail: function() {
        console.log('登陆失败')
        wx.hideLoading();
      }
    })

  },

  /*小程序的logo名称和图片 */
  searchConfig: function() {
    qlApi.searchConfig()
      .then(res => {
        if (res.data.retCode == "0000") {
          if (res.data.list.length > 0) {
            var val = {};
            for (let i = 0; i < res.data.list.length; i++) {
              if (res.data.list[i].configType == "logoImg") {
                val.logoImg = qlApi.getPic(res.data.list[i].configVal)
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

})