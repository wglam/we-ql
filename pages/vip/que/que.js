import {
  Form
} from '../../../utils/form';
Form({

  /**
   * 页面的初始数据
   */
  data: {
    current: 10,
    sum: 10,
    forms: [
      [{
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
      }],
      [{
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
      }]
    ],
    form: {
      name: 'xxx1',
      value: ''
    }

  },
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  }
})