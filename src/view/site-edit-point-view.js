import {upCaseFirst, humanizeDateInput} from '../utilities/common.js';
import Smart from './smart-view.js';
import {eventTypes, allOffers, townArray} from '../mock/mock.js';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import flatpickr from 'flatpickr';

const createEditEventOfferTemplate = (pointOffer, offersOfTrip) => {
  const price = pointOffer.price;
  const name = pointOffer.option.toLowerCase().replace(/ /g, '-');
  const checked = offersOfTrip.findIndex((it) => it.option === pointOffer.option) >= 0;
  return `<div class="event__offer-selector">
                            <input class="event__offer-checkbox  visually-hidden"
                                id="event-offer-${name}-1"
                                data-offer-name="${name}"
                                type="checkbox"
                                name="event-offer-${name}"
                                ${checked ? 'checked' : ''}>
                            <label class="event__offer-label" for="event-offer-${name}-1">
                              <span class="event__offer-title">${name}</span>
                              &plus;
                              &euro;&nbsp;<span class="event__offer-price">${price}</span>
                            </label>
                          </div>`;
};

const createEditEventTypeTemplate = (eventTypeName, eventType) => `<div class="event__type-item">
                              <input id="event-type-${eventType.name}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType.name}"
                              ${eventType.name === eventTypeName ? 'checked' : ''}">
                              <label class="event__type-label  event__type-label--${eventType.name}" for="event-type-${eventType.name}-1">${upCaseFirst(eventType.name)}</label>
                            </div>`;

const getOptionsArray = (typeOfTrip) => {
  const arr = [];
  allOffers.forEach((offer) => offer.type === typeOfTrip ? arr.push(offer) : null);
  return arr;
};

const createEventFormTemplate = (newPoint) => {
  const dateFrom = newPoint.dateFrom;
  const dateTo = newPoint.dateTo;
  const type = newPoint.type;
  const townName = newPoint.townName;
  const offers = newPoint.offers;
  const basePrice = newPoint.basePrice;
  const pictures = newPoint.pictures;
  const description = newPoint.description;
  const eventTypeName = newPoint.type.name;
  const allOffersOfType = getOptionsArray(type.name);
  return `
      <header class="event__header">
      <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${eventTypeName}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Transfer</legend>
             ${Object.values(eventTypes).filter((it) => it.action === 'to').map((it) => createEditEventTypeTemplate(eventTypeName, it)).join('\n')}
        </fieldset>
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Activity</legend>
             ${Object.values(eventTypes).filter((it) => it.action === 'in').map((it) => createEditEventTypeTemplate(eventTypeName, it)).join('\n')}
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
      ${upCaseFirst(eventTypeName)} ${type.action}
    </label>
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination"
        value="${townName ? townName : ''}"
        
        list="destination-list-1" required>
    <datalist id="destination-list-1">
      ${townArray.map((it) => `<option value="${it}"></option>`).join('\n')}
    </datalist>
  </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeDateInput(dateFrom)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeDateInput(dateTo)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${allOffersOfType.map((it) => createEditEventOfferTemplate(it, offers)).join('\n')}
          </div>
        </section>
      </section>
      ${(description || pictures) ? `
                    <section class="event__section  event__section--destination">
                      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                      <p class="event__destination-description">${description}</p>
                      ${pictures.length > 0 ? `
                      <div class="event__photos-container">
                        <div class="event__photos-tape">
                          ${pictures.map((src) => `<img class="event__photo" src="${src}" alt="">`)}
                        </div>
                      </div>
                      ` : ''}
                    </section>` : ''}`;
};

const createEditEventFormTemplate = (newPoint) => `<li class="trip-events__item">
                  <form class="event  event--edit" action="#" method="post">
                    ${createEventFormTemplate(newPoint)}
                  </form>
                </li>`;

const createNewEventFormTemplate = (newPoint) => `<div><form class="trip-events__item event event--edit" action="#" method="post">
                    ${createEventFormTemplate(newPoint)}
                  </form></div>`;

export class SiteEditPointView extends Smart {
  #newPoint = null;
  #datepickerStart = null;
  #datepickerFinish = null;

  constructor(newPoint) {
    super();
    this.#newPoint = newPoint;
    this._editClickHandler = this._editClickHandler.bind(this);
    this._data = SiteEditPointView.parsePointToData(newPoint);
    this.#setInnerHandlers();
  }

  get template() {
    if (this._data.newEvent) {
      return createNewEventFormTemplate(this._data);
    } else {
      return createEditEventFormTemplate(this._data);
    }
  }

  #setDatepicker = () => {
    if (this.#datepickerStart) {
      this.#datepickerStart.destroy();
      this.#datepickerStart = null;
    }

    if (this.#datepickerFinish) {
      this.#datepickerFinish.destroy();
      this.#datepickerFinish = null;
    }

    this.#datepickerStart = flatpickr(
      this.getElement().querySelector('input[name = event-start-time]'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
          time_24hr: true,  // eslint-disable-line
        defaultDate: this._data.dateFrom,
        onChange: this.#startDateChangeHandler // На событие flatpickr передаём наш колбэк
      }
    );

    this.#datepickerFinish = flatpickr(
      this.getElement().querySelector('input[name = event-end-time]'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        time_24hr: true,  // eslint-disable-line
        defaultDate: this._data.dateTo,
        onChange: this.#finishDateChangeHandler // На событие flatpickr передаём наш колбэк
      }
    );
    this.#updateTripDuration();
  }

  #startDateChangeHandler = ([userStartDate]) => {
    this.updateData({
      dateFrom: userStartDate
    });
  }

  #finishDateChangeHandler = ([userFinishDate]) => {
    this.updateData({
      dateTo: userFinishDate
    });
  }

  #updateTripDuration = () => {
    if (this._data.dateFrom > this._data.dateTo) {
      const temp = this._data.dateFrom;
      this._data.dateFrom = this._data.dateTo;
      this._data.dateTo = temp;
    }
    this._data.tripDuration = this._data.dateTo - this._data.dateFrom - 17999999;
  }


  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(this._data);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }

  setDeleteClickHandler (callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._deleteClickHandler);
  }

  _deleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(this._data);
  }

  #eventTypeToggleHandler = (evt) => {
    const newEventType = eventTypes.filter((it) => it.name === evt.target.value)[0];
    this.updateData({
      type: newEventType,
      offers: [],
      puctures: []
    });
  }

  #eventOfferToggleHandler = (evt) => {
    const allOffersOfPoint = getOptionsArray(this._data.type.name);
    let updateCheckedOffers = [];
    const index = this._data.offers.findIndex((it) => it.option.toLowerCase().replace(/ /g, '-') === evt.target.dataset.offerName);
    if (index >= 0) {
      updateCheckedOffers = [
        ...this._data.offers.slice(0, index),
        ...this._data.offers.slice(index + 1)
      ];
    } else {
      updateCheckedOffers = this._data.offers.slice();
      updateCheckedOffers.push(
        allOffersOfPoint.find((it) => it.option.toLowerCase().replace(/ /g, '-') === evt.target.dataset.offerName)
      );
    }
    this.updateData({
      offers: updateCheckedOffers
    }, true);
  }

  #eventDestinationToggleHandler = (evt) => {
    this.updateData({
      townName: evt.target.value
    });
  }

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      basePrice: evt.target.value
    },
    true
    );
  }

  static parsePointToData(point) {
    return Object.assign(
      point,
      this._data
    );
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setEditClickHandler(this._callback.editClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  #setInnerHandlers = () => {
    Array.from(this.getElement().querySelectorAll('input[name="event-type"]'))
      .forEach((it) => it.addEventListener('click', this.#eventTypeToggleHandler));
    this.#setDatepicker();

    this.getElement()
      .querySelector('input[name=event-destination]')
      .addEventListener('change', this.#eventDestinationToggleHandler);

    this.getElement()
      .querySelector('.event__input--price')
      .addEventListener('input', this.#priceInputHandler);

    /*if (!this._data.newEvent) {
      this.element()
        .querySelector(`.event__favorite-btn`)
        .addEventListener(`click`, this.#toggleFavoriteHandler);
    }*/

    Array.from(this.getElement().querySelectorAll('.event__offer-checkbox'))
      .forEach((it) => it.addEventListener('click', this.#eventOfferToggleHandler));
  }

  static parseDataToEvent(data) {
    data = Object.assign({}, data);
    return data;
  }
}


