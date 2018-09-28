// common/xform/xform.js
Component({
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    bindsubmit:null,
    bottom:Number,
    form:null
  },

  /**
   * 组件的初始数据
   */
  data: {
    forms: [{
      template: 'single',
      title: '姓名',
      holder: '请输入姓名',
      form: 'name',
      cur: true
    }, {
      template: 'picker-single',
      title: '性别',
      value: 0,
      range: ['男', '女'],
      form: 'gender',
      cur: true
    }, {
      template: 'single',
      title: '手机号',
      holder: '请输入手机号',
      form: 'phone',
      type: 'number',
      cur: true,
      maxlength: 11
    }, {
      template: 'single',
      title: '微信',
      holder: '请输入微信',
      form: 'wx',
      cur: true,
    }, {
      template: 'single',
      title: '城市',
      holder: '请输入城市',
      form: 'city',
      cur: true,
    }, {
      template: 'single',
      title: '年龄',
      holder: '请输入年龄',
      form: 'age',
      type: 'number',
      cur: true,
      maxlength: 3
    }, {
      template: 'single',
      title: '身高',
      holder: '请输入身高',
      form: 'city',
      cur: true,
      type: 'digit',
      unit: 'cm'
    }, {
      template: 'single',
      title: '体重',
      holder: '请输入体重',
      form: 'city',
      cur: true,
      type: 'digit',
      unit: 'kg'
    }, {
      template: 'single',
      title: '胸围',
      holder: '请输入胸围',
      form: 'city',
      cur: true,
      type: 'digit',
      unit: 'cm'
    }, {
      template: 'single',
      title: '腰围',
      holder: '请输入腰围',
      form: 'city',
      cur: true,
      type: 'digit',
      unit: 'cm'
    }, {
      template: 'single',
      title: '腿围',
      holder: '请输入腿围',
      form: 'city',
      cur: true,
      type: 'digit',
      unit: 'cm'
    }, {
      template: 'textarea',
      title: '如果你在家肌健身，现在有哪些器材？如果没有器材，是否愿意再在教练的指导下采购？',
      form: 'texta',
      holder: '请输入',
      cur: true
    }]

  },

  /**
   * 组件的方法列表
   */
  methods: {

    formSubmit: function (e) {

      console.log('form发生了submit事件，携带数据为：', e.detail.value)
    }
  }
})
