import {createElement} from '../render.js';

const createNoPointTemplate = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export class SiteNoPointView {
    #element = null;
    #newPoint = null;

    constructor (newPoint) {
      this.#newPoint = newPoint;
    }

    get element() {
      if (!this.#element) {
        this.#element = createElement(this.template);
      }
      return this.#element;
    }

    get template() {
      return createNoPointTemplate(this.#newPoint);
    }

    removeElement() {
      this.#element = null;
    }
}
