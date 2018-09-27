// pages/vip/customplan/index.js
import { Form } from '../../../utils/form';
Form({
  
  /**
   * 页面的初始数据
   */
  data: {
    image: 'http://image.weilanwl.com/img/4x3-1.jpg',
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
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  }
})