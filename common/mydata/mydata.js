import F2 from '../../components/f2-canvas/lib/f2';

let chart = null;
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

var date = new Date();

function initChart(canvas, width, height) {
  const data = new Array;
  var temp;

  date.setDate(date.getDate() - 100);

  for (var i = 1; i <= 100; i++) {
    data.push({
      key: i,
      value: randomNum(50, 60)
    })
  }

  chart = new F2.Chart({
    el: canvas,
    width,
    height
  });

  chart.source(data, {
    key: {
      formatter(val) {
        var temp = new Date(date.getTime())
        temp.setDate(temp.getDate() + val)
        return temp.Format("MM/dd");
      },
      min: 90,
      max: 100
    },
    value: {
      ticks: [50, 53, 55, 60],
      formatter(val) {
        return val.toFixed(1) + 'cm';
      }
    }
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

  chart.axis('value', {
    line: null,
    grid: (text, index, total) => {
      if (text == '53.0cm') {
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
  chart.axis('key', {
    line: null
  });

  chart.line({
    sortable: false // 数据已在外部排序，提升性能
  }).position('key*value').color('type', (type) => {
    return "#e88b12";
  });
  chart.render();
  return chart;
}

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    opts: {
      onInit: initChart
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})