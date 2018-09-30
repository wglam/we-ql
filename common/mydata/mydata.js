import F2 from '../../components/f2-canvas/lib/f2';


//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
      break;
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      break;
    default:
      return 0;
      break;
  }
}
Date.prototype.Format = function(fmt) {
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

// 
let chart = null;

function initChars(canvas, width, height) {
  chart = new F2.Chart({
    el: canvas,
    width,
    height
  });

  chart.tooltip(false);
  chart.interaction('pan');
  // 定义进度条
  chart.scrollBar({
    mode: 'x',
    xStyle: {
      backgroundColor: 'rgba(0, 0, 0, .0)',
      fillerColor: 'rgba(0, 0, 0, .0)',
      offsetY: -5
    }
  });

  chart.axis('y', {
    line: null
  });
  chart.axis('x', {
    line: null
  });

  drawCharts(minx, maxx, miny, maxy, target, unit, charts)
  return chart;
}

function drawCharts(minx, maxx, miny, maxy, target, unit, src) {
  chart.clear();
  var yticks = new Array
  if (target == null || target < 0 || target == miny || target == maxy) {
    yticks = [miny, maxy];
  } else if (target < miny) {
    yticks.push(target)
    yticks.push(miny)
    yticks.push(maxy)
  } else if (target > maxy) {
    yticks.push(miny)
    yticks.push(maxy)
    yticks.push(target)
  } else if (target > miny && target < maxy) {
    yticks.push(miny)
    yticks.push(target)
    yticks.push(maxy)
  }
  console.log(yticks)

  chart.source(src, {
    x: {
      tickCount: 4,
      formatter(val) {
        var temp = new Date(val)
        return temp.Format("MM/dd");
      },
      min: minx,
      max: maxx
    },
    y: {
      ticks: yticks,
      formatter(val) {
        return val + unit;
      }
    }
  });

  chart.axis('y', {
    grid: (text, index, total) => {
      if (text == (target + unit)) {
        return {
          stroke: '#726C7A',
          lineDash: [8, 8]
        };
      }
      return {
        stroke: 'rgba(0, 0, 0, .0)'
      }
    }
  });
  //  {
  //   sortable: false // 数据已在外部排序，提升性能
  // }
  chart.line({
    sortable: true
  }).position('x*y').color('type', (type) => {
    return "#e88b12";
  });
  chart.render();
}

let unit = null;
let charts = null;
let minx = null;
let maxx = null;

let target = null;

let miny = null;
let maxy = null;

Component({

  attached: function() {

    charts = this.data.datas;
    unit = this.data.unit;
    target = this.data.target;
    minx = 1527401498000;
    maxx = 1538287898000;

    maxy = 61;
    miny = 50;

  },
  ready: function() {

  },
  /**
   * 组件的属性列表
   */
  properties: {
    unit: String,
    name: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    inputHide: true,
    opts: {
      onInit: initChars
    },
    target: -1,
    datas: [

      {
        x: 1538287898000,
        y: 55.0,
        time: "2018-09-30"
      }, {
        x: 1537769498000,
        y: 58.0,
        time: "2018-09-24"
      }, {
        x: 1537251098000,
        y: 56.0,
        time: "2018-09-18"
      }, {
        x: 1531894298000,
        y: 51.0,
        time: "2018-07-18"
      }, {
        x: 1531375898000,
        y: 55.0,
        time: "2018-07-12"
      },
      {
        x: 1529907098000,
        y: 58.0,
        time: "2018-06-25"
      },
      {
        x: 1529302298000,
        y: 55.0,
        time: "2018-06-18"
      },
      {
        x: 1528611098000,
        y: 58.0,
        time: "2018-06-10"
      }, {
        x: 1527401498000,
        y: 60.0,
        time: "2018-05-27"
      }, {
        x: 1526191898000,
        y: 50.0,
        time: "2018-05-13"
      }, {
        x: 1525155098000,
        y: 58.0,
        time: "2018-05-01"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _hideInput: function() {
      var that = this;
      that.setData({
        inputHide: true
      });
    },
    showInput: function() {
      var that = this;
      that.setData({
        inputHide: false
      });
    },
    confirm: function(e) {
      console.log(e);
    },
    cancel: function(e) {
      console.log(e);
      this._hideInput();
    }
  }
})