import WxValidate from 'WxValidate'

export function Form(sfc) {
  if (sfc.pageLoad) {
    sfc.onLoad = function(op) {
      this.initValidate()
      sfc.pageLoad(op)
    };
  }else{
    sfc.onLoad = function (op) {
      this.initValidate()
    };
  }
  // 验证字段的规则
  sfc.rules = {
    memberName: {
      required: true
    },
    memberSex: {
      required: true,
    },
    memberPhone: {
      required: true,
      tel: true,
    },
    wechatNo: {
      required: true
    },
    height: {
      required: true
    },
    weight: {
      required: true
    }
  }
  sfc.messages = {
    memberName: {
      required: '请输入姓名',
    },
    memberSex: {
      required: '请选择性别',
    },
    memberPhone: {
      required: '请输入手机号',
      tel: '请输入正确的手机号',
    },
    wechatNo: {
      required: '请输入微信号',
    },
    height: {
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