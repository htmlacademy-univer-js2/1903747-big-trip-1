import dayjs from 'dayjs';

export class createSiteListContentTemplate {
  constructor(newPoint) {
    this.type = newPoint.point.type;
    this.townName = newPoint.destination.townName;
    this.basePrice = newPoint.point.basePrice;
    this.offersArray = newPoint.offers;
    this.dateFrom = newPoint.point.dateFrom;
    this.dateTo = newPoint.point.dateTo;
    this.duration = newPoint.point.tripDuration;
  }

  get getContentList() {
    return `<ul class="trip-events__list">
            <li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="2019-03-18">${dayjs(this.dateFrom).format('MMM, DD')}</time> 
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${this.type}.png" alt="Event type icon"/>
                </div>
                <h3 class="event__title">${this.type} ${this.townName}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="2019-03-18T12:25">${dayjs(this.dateFrom).format('HH')}:${dayjs(this.dateFrom).format('MM')}</time>
                    &mdash;
                    <time class="event__end-time" datetime="2019-03-18T13:35">${dayjs(this.dateTo).format('HH')}:${dayjs(this.dateTo).format('MM')}</time>
                  </p>
                  <p class="event__duration">${this.duration}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${this.basePrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  ${this.createOffersTemplate(this.offersArray)}
                </ul>
                <button class="event__favorite-btn event__favorite-btn--active" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>
          </ul>`;
  }

  createOffersTemplate () {
    let offersElement = '';
    for (let i = 0; i < this.offersArray.length; i++) {
      offersElement +=
      `<li class="event__offer">
        <span class="event__offer-title">${this.offersArray[i].option}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${this.offersArray[i].price}</span>
      </li>`;
    }
    return offersElement;
  }
}


