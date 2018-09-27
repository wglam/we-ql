import WxValidate from 'WxValidate'

export function Form(sfc) {

  sfc.onLoad = function() {
    this.initValidate();
  }
  // 验证字段的规则
  sfc.rules = {
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
  sfc.messages = {
    name: {
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

  sfc.initValidate = function() {
    var that = this;
    // 创建实例对象
    that.WxValidate = new WxValidate(that.rules, that.messages)
  }
  sfc.bindTextAreaBlur = function(e) {
    console.log(e.detail.value)
  }
  Page(sfc);
};