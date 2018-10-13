import WxRequest from '/wx-request/index'
import Utils from '/wx-request/helpers/Utils'
class Api extends WxRequest {

  // var memberCard

  constructor(options) {
    super(options)
    // `$$prefix` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL
    // this.$$prefix = ''
    this.$$path = {
      uploadFile: '/ht/wechat/baseS/uploadFile',
      decodeUserInfo: "/ht/wechat/decodeUserInfo",
      searchConfig: "/ht/wechat/searchConfig",
      getMemberByOpenid: "/ht/wechat/getMemberByOpenid", //会员信息
      getMemberCard: "/ht/wechat/getMemberCard", //会员卡信息
      getMemberJsPlan: "/ht/wechat/getMemberJsPlan", //健身计划
    }
    this.$$const = {
      memberCard: null
    }
  }

  login(param) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    this._wxlogin(
      code => {
        var shareId = wx.getStorageSync('shareId');
        param.offerOpenid = shareId;
        if (code) {
          param.code = code;
          that.getRequest(that.$$path.decodeUserInfo, {
              data: param
            })
            .then(data => {
              if (data.data.status == 1) {
                var userInfo = data.data.userInfo;
                var openId = userInfo.openId; //返回openid
                wx.setStorageSync('openId', openId);

                that.getRequest(that.$$path.getMemberByOpenid, {
                  data: {
                    openid: openId
                  }
                }).then(res => {
                  var data = res.data;
                  if (data.retCode == "0000") {
                    getApp().globalData.userInfo = data.retVal
                    wx.setStorageSync('userInfo', data.retVal);
                    wx.navigateBack({
                      delta: 1
                    })
                  } else {
                    wx.showToast({
                      title: data.retDesc,
                    })
                  }

                }, fail => {
                  wx.showToast({
                    title: '登陆失败',
                  })
                })
                wx.hideLoading();
              } else {
                wx.showToast({
                  title: '解密失败',
                })
                wx.hideLoading();
              }
            })
        } else {
          wx.showToast({
            title: '微信登陆失败',
          })
          wx.hideLoading();
        }
      },
      fail => {
        wx.showToast({
          title: '微信登陆失败',
        })
        wx.hideLoading();
      }
    );

  }
  getFile(url) {
    return Utils.combineURLs(this.defaults.baseURL + 'uploadFile', url);
  }
  uploadFile(params) {
    return this.postRequest(this.$$path.uploadFile, params)
  }
  searchConfig() {
    return this.getRequest(this.$$path.searchConfig, {})
  }

  getMemberCard(id) {
    return this.getRequest(this.$$path.getMemberCard, {
      data: {
        memberId: id
      }
    })
  }
  getMemberByOpenid(success, error) {
    var openId = wx.getStorageSync('openId'); //返回openid
    if (openId == '') {
      error(-1)
    } else {
      that.getRequest(that.$$path.getMemberByOpenid, {
        data: {
          openid: openId
        }
      }).then(res => {
        var data = res.data;
        if (data.retCode == "0000") {
          getApp().globalData.userInfo = data.retVal
          wx.setStorageSync('userInfo', data.retVal);
          success(data.retVal)
        } else {
          error()
        }

      }, fail => {
        error()
      })
    }
  }
  //
  getStep(success, error) {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.werun']) {
          this._getWeRunData(success, error)
        } else {
          wx.authorize({
            scope: 'scope.werun',
            success: res => {
              this._getWeRunData(success, error)
            }
          })
        }
      }
    })
  }

  getMemberJsPlan(param) {
    return this.getRequest(this.$$path.getMemberJsPlan, param)
  }

  getJsDays() {　
    var sdate = this._convertDateFromString(getApp().globalData.userInfo.createTime);　　
    var now = new Date();　　
    var days = now.getTime() - sdate.getTime();　　
    var day = parseInt(days / (1000 * 60 * 60 * 24));　　
    return day;
  }

  //inner
  _convertDateFromString(dateString) {
    if (dateString) {
      var date = new Date(dateString.replace(/-/, "/"))
      return date;
    }
  }
  _getWeRunData(_success, _error) {
    wx.getWeRunData({
      success: _res => {
        console.log(_res)
        wx.login({
          success: res => {
            var param = {}
            param.code = res.code
            param.encryptedData = _res.encryptedData
            param.iv = _res.iv
            this.getRequest(this.$$path.decodeUserInfo, {
                data: param
              })
              .then(res => {
                console.log(res)
              })
          }
        })
      }
    })
  }
  _wxlogin(_success, _fail) {
    wx.checkSession({
      success: _res => {
        var code = wx.getStorageSync('wxcode')
        if (code && code != '') {
          _success(code)
        } else {
          wx.login({
            success: res => {
              var code = res.code; //登录凭证
              wx.setStorageSync('wxcode', code)
              _success(code)
            },
            fail: res => {
              _fail(res)
            }
          })
        }
      },
      fail: _res => {
        wx.login({
          success: res => {
            var code = res.code; //登录凭证
            wx.setStorageSync('wxcode', code)
            _success(code)
          },
          fail: res => {
            _fail(res)
          }
        })
      }
    })
  }
}

export default Api