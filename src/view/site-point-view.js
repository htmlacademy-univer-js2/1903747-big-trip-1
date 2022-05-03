import dayjs from 'dayjs';
import AbstractView from './abstract-view.js';

const createOffersTemplate = (offers) => {
  let offersElement = '';
  for (let i = 0; i < offers.length; i++) {
    offersElement +=
      `<li class="event__offer">
        <span class="event__offer-title">${offers[i].option}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offers[i].price}</span>
      </li>`;
  }
  return offersElement;
};

const favoriteCheck = (isFavorite) => {
  let favoriteActiveClass = '';
  if (isFavorite) {favoriteActiveClass = 'event__favorite-btn--active';}
  return favoriteActiveClass;
};

const createSiteListContentTemplate = (newPoint) => {
  const {destination, offers, point} = newPoint;
  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="2019-03-18">${dayjs(point.dateFrom).format('MMM, DD')}</time> 
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="Event type icon"/>
                </div>
                <h3 class="event__title">${point.type} ${destination.townName}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="2019-03-18T12:25">${dayjs(point.dateFrom).format('HH')}:${dayjs(point.dateFrom).format('mm')}</time>
                    &mdash;
                    <time class="event__end-time" datetime="2019-03-18T13:35">${dayjs(point.dateTo).format('HH')}:${dayjs(point.dateTo).format('mm')}</time>
                  </p>
                  <p class="event__duration">${dayjs(point.tripDuration).format('HH')}H ${dayjs(point.tripDuration).format('mm')}M</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${point.basePrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  ${createOffersTemplate(offers)}
                </ul>
                <button class="event__favorite-btn ${favoriteCheck(point.isFavorite)}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
};

export class SitePointView extends AbstractView {
  #newPoint = null;

  constructor (newPoint) {
    super();
    this.#newPoint = newPoint;
  }

  get template() {
    return createSiteListContentTemplate(this.#newPoint);
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  #editClickHandler = (event) => {
    event.preventDefault();
    this._callback.editClick();
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  }
}

