import AbstractView from './abstract-view.js';
import {getWeight} from '../mock/mock.js';
import dayjs from 'dayjs';

const createSiteTabTemplate = (price, points) => {
  const numOfPoints = points.length;
  const firstPoint = points[0];
  const lastPoint = points[numOfPoints - 1];
  let townString = `${firstPoint.townName}&nbsp;&mdash;&nbsp;...&nbsp;&mdash;&nbsp;${lastPoint.townName}`;
  const isMonthsEqual = firstPoint.dateFrom.getMonth() === lastPoint.dateTo.getMonth();
  const sumDate = isMonthsEqual ?
    `${dayjs(firstPoint.dateFrom).format('MMM DD')}&nbsp;&mdash;&nbsp;${dayjs(lastPoint.dateTo).format('DD')}` :
    `${dayjs(firstPoint.dateTo).format('MMM, DD')}&nbsp;&mdash;&nbsp;${dayjs(lastPoint.dateTo).format('MMM, DD')}`;

  switch(numOfPoints) {
    case 0:
      townString = '';
      break;
    case 1:
      townString = firstPoint.townName;
      break;
    case 2:
      townString = `${firstPoint.townName}&nbsp;&mdash;&nbsp;${lastPoint.townName}`;
      break;
    case 3:
      townString = `${firstPoint.townName}&nbsp;&mdash;&nbsp;${points[1].townName}&nbsp;&mdash;&nbsp;${lastPoint.townName}`;
  }
  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${townString}</h1>
    <p class="trip-info__dates">${sumDate}</p>
  </div>
  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
  </p>
</section>`;
};

export class SiteTabView extends AbstractView {
  #price = 1500;
  #points = null;

  get template() {
    return createSiteTabTemplate(this.#price, this.#points);
  }

  constructor(price, points) {
    super();
    this.#points = points.sort(this.#sortPointList);
    this.#price = price;
  }

  #sortPointList = (pointA, pointB) => {
    const dateFromA = pointA.dateFrom;
    const dateFromB = pointB.dateFrom;

    const weight = getWeight(dateFromA, dateFromB);
    return weight ?? dateFromA - dateFromB;
  }
}
