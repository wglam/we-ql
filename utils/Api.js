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
      getBody: "ht/wechat/getBody", //身体信息查询
      getBodyTarget: "ht/wechat/getBodyTarget", //身体目标信息查询
      searchBody: "ht/wechat/searchBody", //查询身体数据
      setBodyTarget: "ht/wechat/setBodyTarget", //设置身体目标数据
      addMemberBody: "ht/wechat/addMemberBody", //设置身体当前数据
      searchMemberDietPlan: "ht/wechat/searchMemberDietPlan", //饮食打卡相册
      getMember: "ht/wechat/getMember", //获取绑定账户信息
      bindMember: "ht/wechat/bindMember", //绑定账户
      searchCardCategory: "ht/wechat/searchCardCategory", //获取所有会员卡信息
      searchOrder: "ht/wechat/searchOrder", //查询订单
      checkMemberCard: "ht/wechat/checkMemberCard", //检查是否是会员
      searchMemberCoupon: 'ht/wechat/searchMemberCoupon', //优惠券信息
      searchOrderCoupon: 'ht/wechat/searchOrderCoupon', //订单可使用优惠券信息查询
      addOrder: "ht/wechat/addOrder", //生成订单
      wechatPay: "ht/wechat/wechatPay", //订单微信支付
      decodeRunData: 'ht/wechat/decodeRunData', //解析微信步数
      getCard: 'ht/wechat/getCard', //获取会员卡信息
      renewOrder: 'ht/wechat/renewOrder', //会员升级生成订单
      searchUpgradeCard: 'ht/wechat/searchUpgradeCard', //会员当前会员卡排序值
      getUpgradePrice: 'ht/wechat/getUpgradePrice', // 获取升级支付金额
      upgradeOrder: 'ht/wechat/upgradeOrder', //会员升级订单生成
      searchCollageInitiator: 'ht/wechat/searchCollageInitiator', //团购人员查询
      collageOrder: 'ht/wechat/collageOrder', //团购订单
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

  bind(param) {
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
                param.openId = userInfo.openId; //返回openid
                wx.setStorageSync('openId', openId);

                delete param.encryptedData
                delete param.iv
                delete param.code

                that.getRequest(that.$$path.bindMember, {
                    data: {
                      memberInfo: param
                    }
                  })
                  .then(res => {
                    var data = res.data;
                    if (data.retCode == "0000") {
                      getApp().globalData.userInfo = data.retVal
                      wx.setStorageSync('userInfo', data.retVal);

                      wx.switchTab({
                        url: '/pages/home/home',
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
  getFileBase() {
    return Utils.combineURLs(this.defaults.baseURL, 'uploadFile');
  }
  searchConfig(param) {
    return this.getRequest(this.$$path.searchConfig, param)
  }

  getMemberCard(id) {
    return this.getRequest(this.$$path.getMemberCard, {
      data: {
        memberId: id
      }
    })
  }
  getMemberByOpenid(success, error) {
    var that = this
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
          error(data.retDesc)
        }
      }).catch(e => {
        error(e)
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
  getBody(memberId, success, fail) {
    this.getRequest(this.$$path.getBody, {
        data: {
          memberId: memberId
        }
      })
      .then(res => {
        if (res.data.retCode == '0000') {
          var item = res.data.retVal
          var user = getApp().globalData.userInfo;
          if (item.memberName) user.memberName = item.memberName
          if (item.height) user.height = item.height
          if (item.weight) user.weight = item.weight
          if (item.BMI) user.BMI = item.BMI
          if (item.bust) user.bust = item.bust
          if (item.waist) user.waist = item.waist
          if (item.thigh) user.thigh = item.thigh
          if (item.bodyStatus) user.bodyStatus = item.bodyStatus
          wx.setStorageSync("userInfo", user)
          success(res)
        } else {
          fail(res)
        }
      })
      .catch(res => {
        fail(res)
      })

  }

  getBodyTarget(memberId, success, fail) {
    this.getRequest(this.$$path.getBodyTarget, {
        data: {
          memberId: memberId
        }
      })
      .then(res => {
        if (res.data.retCode == '0000') {
          var item = res.data.retVal
          var user = getApp().globalData.userInfo;
          if (item.memberName) user.memberName = item.memberName
          if (item.height) user.toheight = item.height
          if (item.weight) user.toweight = item.weight
          if (item.BMI) user.toBMI = item.BMI
          if (item.bust) user.tobust = item.bust
          if (item.waist) user.towaist = item.waist
          if (item.thigh) user.tothigh = item.thigh
          wx.setStorageSync("userInfo", user)

          success(res)
        } else {
          fail(res)
        }
      })
      .catch(res => {
        fail(res)
      })
  }
  searchBody(param) {
    return this.getRequest(this.$$path.searchBody, param)
  }
  addMemberBody(param) {
    return this.getRequest(this.$$path.addMemberBody, param)
  }
  setBodyTarget(param) {
    return this.getRequest(this.$$path.setBodyTarget, param)
  }
  searchMemberDietPlan(param) {
    return this.getRequest(this.$$path.searchMemberDietPlan, param)
  }
  getMember(param) {
    return this.getRequest(this.$$path.getMember, param)
  }
  searchCardCategory() {
    return this.getRequest(this.$$path.searchCardCategory, {})
  }

  searchOrder(param) {
    return this.getRequest(this.$$path.searchOrder, param)
  }
  checkMemberCard(id) {
    return this.getRequest(this.$$path.checkMemberCard, {
      data: {
        memberId: id
      }
    })
  }
  searchMemberCoupon(param) {
    return this.getRequest(this.$$path.searchMemberCoupon, param)
  }
  searchOrderCoupon(param) {
    return this.getRequest(this.$$path.searchOrderCoupon, param)
  }

  addOrder(param) {
    return this.getRequest(this.$$path.addOrder, param)
  }
  renewOrder(param) {
    return this.getRequest(this.$$path.renewOrder, param)
  }

  wechatPay(id, _openid) {
    return this.getRequest(this.$$path.wechatPay, {
      data: {
        orderCode: id,
        openid: _openid
      }
    })
  }

  getCard(id) {
    return this.getRequest(this.$$path.getCard, {
      data: {
        cardId: id
      }
    })
  }

  renewOrder(param) {
    return this.getRequest(this.$$path.renewOrder, param)
  }

  searchUpgradeCard(param) {
    return this.getRequest(this.$$path.searchUpgradeCard, param)
  }
  getUpgradePrice(param) {
    return this.getRequest(this.$$path.getUpgradePrice, param)
  }
  upgradeOrder(param) {
    return this.getRequest(this.$$path.upgradeOrder, param)
  }

  searchCollageInitiator(param) {
    return this.getRequest(this.$$path.searchCollageInitiator, param)
  }

  collageOrder(param) {
    return this.getRequest(this.$$path.collageOrder, param)
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
            this.getRequest(this.$$path.decodeRunData, {
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
    wx.login({
      success: res => {
        var code = res.code; //登录凭证
        _success(code)
      },
      fail: res => {
        _fail(res)
      }
    })
    // wx.checkSession({
    //   success: _res => {

    //     var code = wx.getStorageSync('wxcode')
    //     if (code && code != '') {
    //       _success(code)
    //     } else {

    //     }
    //   },
    //   fail: _res => {
    //     console.log('checkSession success', _res, new Date())
    //     wx.login({
    //       success: res => {
    //         console.log('login', res)
    //         var code = res.code; //登录凭证
    //         wx.setStorageSync('wxcode', code)
    //         _success(code)
    //       },
    //       fail: res => {
    //         _fail(res)
    //       }
    //     })
    //   }
    // })
  }
}

export default Api