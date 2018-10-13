import {
  Form
} from '../../../utils/form'

Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "h+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
var g = getApp().globalData
Form({
  onReady: function () {
    this.loadMemberAnswer()
  },
  /**
   * 页面的初始数据
   */
  data: {
    end: new Date().Format('yyyy-MM-dd'),
    birthDay: '1996-01-01',
    region: ['--', '--', '--'],
    memberSex: 0,
    genders: ['男', '女'],
    ydtime: 0,
    ydtimes: ['早餐前或后', '中餐前或后', '晚餐前或后'],
    images: [],
  },
  formSubmit: function (e) {

    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var that = this
    const params = e.detail.value
    if (!that.WxValidate.checkForm(params)) {
      const error = that.WxValidate.errorList[0]
      wx.showModal({
        content: error.msg,
        showCancel: false,
      })
      return false
    }
    wx.showLoading({
      title: '正在提交',
    })
    params.memberSex++;
    params.images = that.data.images
    g.api.addMemberAnswer({
      data: {
        memberId: g.userInfo.memberId,
        answerContent: params
      }
    }).then(res => {
      wx.hideLoading()
      if (res.data.retCode == '0000') {
        wx.showToast({
          title: '提交成功',
        })
      } else {
        wx.showToast({
          title: '提交失败',
          icon: 'none'
        })
      }
    })
      .catch(res => {
        wx.hideLoading()
        wx.showToast({
          title: '提交失败',
          icon: 'none'
        })
      })

  },
  bindSexChange: function (e) {
    var that = this
    that.setData({
      memberSex: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    var that = this
    that.setData({
      region: e.detail.value
    })
  },
  bindDateChange: function (e) {

    var that = this
    that.setData({
      birthDay: e.detail.value
    })
  },
  bindYdTimesChange: function (e) {
    var that = this
    that.setData({
      ydtime: e.detail.value
    })
  },
  addImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['compressed'],
      success(res) {
        var val = that.data.images;
        for (var item of res.tempFilePaths) {
          val.push(item)
        }
        that.setData({
          images: val
        })
      }
    })
  },
  delImage: function (e) {
    var that = this;
    var val = that.data.images;
    val.splice(e.currentTarget.dataset.index, 1);
    that.setData({
      images: val
    })
  },
  loadMemberAnswer() {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    g.api.getMemberAnswer({
      data: {
        memberId: g.userInfo.memberId
      }
    })
      .then(res => {
        wx.hideLoading()
        var val
        if (res.data.retCode == '0000') {
          val = res.data.retVal
        } else {
          val = g.userInfo
        }
        val.memberSex--;
        that.setData(val)
      })
      .catch(res => {
        wx.hideLoading()
        var val = g.userInfo
        val.memberSex--;
        that.setData(val)
      })
  },
})