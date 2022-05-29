import dayjs from 'dayjs';
import {upCaseFirst} from '../utilities/common.js';
import Smart from './smart-view.js';
import {eventTypes, allOffers, townArray} from '../mock/mock.js';

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
            ${eventTypeName} ${type.action} 
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination"
                            value="${townName ? townName : ''}"
                            
                            list="destination-list-1" required>
          <datalist id="destination-list-1">
            ${townArray.map((it) => `<option value="${it}"></option>`).join('\n')}
            <option value="anus"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(dateFrom).format('DD/MM/YY HH:mm')}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(dateTo).format('DD/MM/YY HH:mm')}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
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

  constructor(newPoint) {
    super();
    this.#newPoint = newPoint;
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
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

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(SiteEditPointView.updateData(this._data));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
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
    let updateCheckedOffers = [];
    const index = this._data.offers.findIndex((it) => it.title.toLowerCase().replace(/ /g, '-') === evt.target.dataset.offerName);
    if (index >= 0) {
      updateCheckedOffers = [
        ...this._data.offers.slice(0, index),
        ...this._data.offers.slice(index + 1)
      ];
    } else {
      updateCheckedOffers = this._data.offers.slice();
      updateCheckedOffers.push(
        this._offers[this._data.eventType].offers.find((it) => it.title.toLowerCase().replace(/ /g, '-') === evt.target.dataset.offerName)
      );
    }
    this.updateData({
      offers: updateCheckedOffers
    }, true);
  }

  #eventDestinationToggleHandler = (evt) => {
    this.updateData({
      place: this._destinations[evt.target.value]
    });
  }

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      price: evt.target.value
    }, true);
  }

  #toggleFavoriteHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      isFavorite: !this._data.isFavorite
    });
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
  }

  #setInnerHandlers = () => {
    Array.from(this.getElement().querySelectorAll('input[name="event-type"]'))
      .forEach((it) => it.addEventListener('click', this.#eventTypeToggleHandler));

    /*this.element()
      .querySelector(`input[name=event-destination]`)
      .addEventListener(`change`, this.#eventDestinationToggleHandler);

    this.element()
      .querySelector(`.event__input--price`)
      .addEventListener(`input`, this.#priceInputHandler);

    if (!this._data.newEvent) {
      this.element()
        .querySelector(`.event__favorite-btn`)
        .addEventListener(`click`, this.#toggleFavoriteHandler);
    }

    Array.from(this.getElement().querySelectorAll(`.event__offer-checkbox`))
      .forEach((it) => it.addEventListener(`click`, this.#eventOfferToggleHandler));*/
  }

  static updateData(data) {
    data = Object.assign({}, data);
    return data;
  }
}


