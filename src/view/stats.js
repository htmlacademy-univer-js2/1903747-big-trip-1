import AbstractView from './abstract-view.js';
import {Chart, registerables} from '../../node_modules/chart.js';
Chart.register(...registerables);
import ChartDataLabels from '../../node_modules/chartjs-plugin-datalabels/dist/chartjs-plugin-datalabels';
import {humanizeDuration} from '../utilities/common.js';

const BAR_HEIGHT = 55;

const getLabelandData = (items, dataType) => {
  const data = {
    labels: [],
    data: [],
  };
  items.forEach((item) => {
    data.labels.push(item.type.toUpperCase());
    data.data.push(item[dataType]);
  });
  return data;
};

const renderMoneyChart = (moneyCtx, items) => {
  moneyCtx.height = BAR_HEIGHT * items.length;
  const data = getLabelandData(items, 'sum');
  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'bar',
    data: {
      labels: data.labels,
      datasets: [{
        data: data.data,
        backgroundColor: '#dff4d8',
        hoverBackgroundColor: '#cccccc',
        anchor: 'start',
        barThickness: 44,
        minBarLength: 50,
      }],
    },
    options: {
      indexAxis: 'y',
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `€ ${val}`,
        },
      },
      title: {
        display: true,
        text: 'MONEY',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: {
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        },
        xAxes: {
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        },
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTransportChart = (transportCtx, items) => {
  transportCtx.height = BAR_HEIGHT * items.length;
  const data = getLabelandData(items, 'count');
  return new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: 'bar',
    data: {
      labels: data.labels,
      datasets: [{
        data: data.data,
        backgroundColor: '#dee6f6',
        hoverBackgroundColor: '#сссссс',
        anchor: 'start'
      }]
    },
    options: {
      indexAxis: 'y',
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${val}x`,
        }
      },
      title: {
        display: true,
        text: 'TYPE',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left'
      },
      scales: {
        yAxes: {
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        },
        xAxes: {
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        },
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTimeSpendChart = (timeSpendCtx, items) => {
  timeSpendCtx.height = BAR_HEIGHT * items.length;
  const data = getLabelandData(items, 'duration');
  return new Chart(timeSpendCtx, {
    plugins: [ChartDataLabels],
    type: 'bar',
    data: {
      labels: data.labels,
      datasets: [{
        data: data.data,
        backgroundColor: '#f5ebd7',
        hoverBackgroundColor: '#сссссс',
        anchor: 'start'
      }]
    },
    options: {
      indexAxis: 'y',
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${humanizeDuration(val)}`
        }
      },
      title: {
        display: true,
        text: 'TIME',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left'
      },
      scales: {
        yAxes: {
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        },
        xAxes: {
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 100
        },
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};


const createStatisticsTemplate = () => `<section class="statistics">
          <h2 class="visually-hidden">Trip statistics</h2>
          <div class="statistics__item statistics__item--money">
            <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
          </div>
          <div class="statistics__item statistics__item--transport">
            <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
          </div>
          <div class="statistics__item statistics__item--time-spend">
            <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
          </div>
        </section>`;

export class Statistics extends AbstractView {
  constructor(points) {
    super();

    this._data = this._getChartsData(points);

    this._setCharts();
  }

  _getChartsData(points) {
    const data = {};
    points.forEach((point) => {
      if (point.type.name in data) {
        data[point.type.name].count++;
        data[point.type.name].sum = Number(data[point.type.name].sum) + Number(point.basePrice);
        data[point.type.name].duration += point.dateTo - point.dateFrom;
      } else {
        data[point.type.name] = {
          type: point.type.name,
          count: 1,
          sum: point.basePrice,
          duration: point.dateTo - point.dateFrom
        };
      }
    });
    return Object.values(data);
  }

  get template() {
    return createStatisticsTemplate(this._data);
  }

  restoreHandlers() {
    this._setCharts();
  }

  _setCharts() {
    const moneyCtx = this.getElement().querySelector('.statistics__chart--money');
    const transportCtx = this.getElement().querySelector('.statistics__chart--transport');
    const timeSpendCtx = this.getElement().querySelector('.statistics__chart--time');

    this._renderMoneyChart = renderMoneyChart(moneyCtx, this._data.sort((a, b) => b.sum - a.sum));

    this._renderTransportChart = renderTransportChart(transportCtx, this._data.sort((a, b) => b.count - a.count));
    this._renderTimeSpendChart = renderTimeSpendChart(timeSpendCtx, this._data.sort((a, b) => b.duration - a.duration));
  }
}
