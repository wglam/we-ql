// pages/vip/customplan/index.js
import WxValidate from '../../../plugins/WxValidate'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image: 'http://image.weilanwl.com/img/4x3-1.jpg',
    gender: 0,
    genders: ['男', '女']
  },
  onLoad() {
    this.initValidate()
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
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  initValidate() {
    // 验证字段的规则
    const rules = {
      name: {
        required: true
      },
      gender: {
        required: true,
      },
      phone: {
        required: true,
        tel: true,
      },
      wx: {
        required: true
      },
      tops: {
        required: true
      },
      weight: {
        required: true
      }
    }

    const messages = {
      name:{
        required: '请输入姓名',
      },
      gender: {
        required: '请选择性别',
      },
      phone: {
        required: '请输入手机号',
        tel: '请输入正确的手机号',
      },
      wx: {
        required: '请输入微信号',
      },
      tops: {
        required: '请输入身高',
        minlength: '密码长度不少于6位',
        maxlength: '密码长度不多于15位',
      },
      weight: {
        required: '请输入体重',
      }
    }

    // 创建实例对象
    this.WxValidate = new WxValidate(rules, messages)
  }
})