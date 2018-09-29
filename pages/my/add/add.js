import F2 from '../../../components/f2-canvas/lib/f2';

let chart = null;

function initChart(canvas, width, height) {
  const data = [{
    "year": 1997,

    "value": 4.9
  }, {
    "year": 2003,
    "value": 5.6
  }, {
    "year": 2015,

    "value": 4.9
  }, {
    "year": 2016,
    "value": 5.0
  }];

  chart = new F2.Chart({
    el: canvas,
    width,
    height
  });

  chart.source(data, {
    year: {
      range: [0, 1],
      ticks: [1997, 1999, 2001, 2003, 2005, 2007, 2009, 2011, 2013, 2015, 2017]
    },
    value: {
      tickCount: 2,
      formatter(val) {
        return val.toFixed(1) + 'cm';
      }
    }
  });

  chart.tooltip({
    custom: true, // 自定义 tooltip 内容框
    onChange(obj) {
      const legend = chart.get('legendController').legends.top[0];
      const tooltipItems = obj.items;
      const legendItems = legend.items;
      const map = {};
      legendItems.map(item => {
        map[item.name] = Object.assign({}, item);
      });
      tooltipItems.map(item => {
        const {
          name,
          value
        } = item;
        if (map[name]) {
          map[name].value = value;
        }
      });
      legend.setItems(Object.values(map));
    },
    onHide() {
      const legend = chart.get('legendController').legends.top[0];
      legend.setItems(chart.getLegendItems().country);
    }
  });

  chart.line().position('year*value').color('type', val => {
    if (val === 'United States') {
      return '#ccc';
    }
  });
  chart.render();
  return chart;
}


Page({
  data: {
    opts: {
      onInit: initChart
    }
  },

  onReady() {}
});