
import AbstractView from './abstract-view.js';

const createNoPointTemplate = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export class SiteNoPointView extends AbstractView{
    #newPoint = null;

    constructor (newPoint) {
      super();
      this.#newPoint = newPoint;
    }

    get template() {
      return createNoPointTemplate(this.#newPoint);
    }
}
