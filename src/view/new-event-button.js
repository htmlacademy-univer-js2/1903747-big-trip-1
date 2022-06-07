import AbstractView from './abstract-view.js';

const createButtonTemplate = () => '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';

export class NewPointButton extends AbstractView {
  get template() {
    return createButtonTemplate();
  }

  setNewEventButtonHandler = (callback) => {
    this._callback.newEventClick = callback;
    this.getElement().addEventListener('click', this.#newEventButtonHandler);
  }

  #newEventButtonHandler = () => {
    this._callback.newEventClick();
  }

  setDisable() {
    this.getElement().disabled = true;
  }

  removeDisable() {
    this.getElement().disabled = false;
  }
}
