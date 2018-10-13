// pages/vip/customplan/index.js
import {
  Form
} from '../../../utils/form'

var g = getApp().globalData

Form({

  /**
   * 页面的初始数据
   */
  data: {
    image: '/img/bg.jpg',
    gender: 0,
    genders: ['男', '女']
  },
  formSubmit: function(e) {
    const params = e.detail.value
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      wx.showModal({
        content: error.msg,
        showCancel: false,
      })
      return false
    }
    wx.showLoading({
      title: '正在提交',
    })
    var _data = e.detail.value;
    _data.memberSex++
      _data.memberId = g.userInfo.memberId
    g.api.addCustomPlan({
        data: _data
      })
      .then(res => {
        wx.hideLoading()
        if (res.data.retCode == '0000') {
          wx.showToast({
            title: '提交成功',
          })
        } else {
          wx.showToast({
            title: res.data.retDesc,
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
  }
})