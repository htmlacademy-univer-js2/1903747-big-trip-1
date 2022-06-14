import AbstractView from './abstract-view.js';

const createLoadingTemplate = () => '<p class="trip-events__msg">Loading...</p>';

export class Loading extends AbstractView {
  get template() {
    return createLoadingTemplate();
  }
}
