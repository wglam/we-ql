import WxRequest from '/wx-request/index'
import Utils from '/wx-request/helpers/Utils'
class Api extends WxRequest {

  // var memberCard

  constructor(options) {
    super(options)
    // `$$prefix` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL
    // this.$$prefix = ''
    this.$$path = {
      uploadFile: 'ht/baseS/uploadFile',
      decodeUserInfo: "ht/wechat/decodeUserInfo",
      searchConfig: "ht/wechat/searchConfig",
      getMemberByOpenid: "ht/wechat/getMemberByOpenid", //会员信息
      getMemberCard: "ht/wechat/getMemberCard", //会员卡信息
      getMemberJsPlan: "ht/wechat/getMemberJsPlan", //健身计划
      addMemberJsPlan: "ht/wechat/addMemberJsPlan", //提交健身计划
      getDietPlan: "ht/wechat/getDietPlan", //获取饮食计划
      addMemberDietPlan: "ht/wechat/addMemberDietPlan", //饮食打卡
      addCustomPlan: "ht/wechat/addCustomPlan", //定制计划
      getCustomPlan: "ht/wechat/getCustomPlan", //获取定制计划
      checkMemberAnswer: "ht/wechat/checkMemberAnswer", //检查问卷
      addMemberAnswer: "ht/wechat/addMemberAnswer", //提交问卷
      getMemberAnswer: "ht/wechat/getMemberAnswer", //获取问卷
      updateMember: "ht/wechat/updateMember", //修改个人信息
    }
    this.$$const = {
      memberCard: null
    }
  }
  uploadFile(path, _success, _fail) {
    wx.uploadFile({
      url: this.defaults.baseURL + this.$$path.uploadFile,
      filePath: path,
      name: 'file',
      formData: {
        'imgIndex': 0
      },
      header: {
        'Accept': 'application/json',
        "Content-Type": "multipart/form-data"
      },
      success: _success,
      fail: _fail
    })
  }
  getBmiStatus(staus) {
    var bmi = {}
    if (staus == 1) {
      bmi.name = '过轻'
      bmi.color = '#6699FF';
    } else if (staus == 2) {
      bmi.name = '正常'
      bmi.color = '#00CC99';
    } else if (staus == 3) {
      bmi.name = '过重'
      bmi.color = '#FF9900';
    } else if (staus == 4) {
      bmi.name = '肥胖'
      bmi.color = '#FF6600';
    } else if (staus == 5) {
      bmi.name = '非常肥胖'
      bmi.color = '#FF0000';
    }
    return bmi
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
                  })
                  .then(res => {
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
                    wx.hideLoading();
                  })
                  .catch(res => {
                    wx.hideLoading();
                  })

              } else {
                wx.showToast({
                  title: '解密失败',
                })
                wx.hideLoading();
              }
            })
            .catch(res => {
              wx.hideLoading();
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

  addMemberJsPlan(param) {
    return this.getRequest(this.$$path.addMemberJsPlan, param)
  }
  getDietPlan(param) {
    return this.getRequest(this.$$path.getDietPlan, param)
  }
  addMemberDietPlan(param) {
    return this.getRequest(this.$$path.addMemberDietPlan, param)
  }
  addCustomPlan(param) {
    return this.getRequest(this.$$path.addCustomPlan, param)
  }
  getCustomPlan(param) {
    return this.getRequest(this.$$path.getCustomPlan, param)
  }

  checkMemberAnswer(param) {
    return this.getRequest(this.$$path.checkMemberAnswer, param)
  }

  addMemberAnswer(param) {
    return this.getRequest(this.$$path.addMemberAnswer, param)
  }

  getMemberAnswer(param) {
    return this.getRequest(this.$$path.getMemberAnswer, param)
  }
  updateMember(param) {
    return this.getRequest(this.$$path.updateMember, param)
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
              .catch(res => {
                _error()
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