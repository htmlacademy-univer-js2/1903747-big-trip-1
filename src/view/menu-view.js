import AbstractView from './abstract-view';
import {MenuItem} from '../const.js';

const createMenuTemplate = () => `<div class="trip-controls__navigation">
    <h2 class="visually-hidden">Switch trip view</h2>
    <nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" data-menu="${MenuItem.TABLE}">${MenuItem.TABLE}</a>
      <a class="trip-tabs__btn" href="#" data-menu="${MenuItem.STATS}">${MenuItem.STATS}</a>
    </nav>
  </div>`;

export class Menu extends AbstractView {
    #currentMenuItem = null
    constructor () {
      super();
      this.#currentMenuItem = MenuItem.TABLE;
      this.#menuClickHandler = this.#menuClickHandler.bind(this);
    }

    get template() {
      return createMenuTemplate();
    }

    #menuClickHandler = (evt) => {
      evt.preventDefault();
      if (this.#currentMenuItem === evt.target.dataset.menu) {
        return;
      }
      this._callback.menuClick(evt.target.dataset.menu);
    }

    setMenuClickHandler(callback) {
      this._callback.menuClick = callback;
      Array.from(this.getElement().querySelectorAll('.trip-tabs__btn')).forEach((it) => {
        it.addEventListener('click', this.#menuClickHandler);
      });
    }

    setMenuDisable(menuItem) {
      this.#currentMenuItem = menuItem;
      Array.from(this.getElement().querySelectorAll('.trip-tabs__btn')).forEach((it) => {
        it.classList.remove('trip-tabs__btn--active');
      });
      const item = this.getElement().querySelector(`[data-menu-item=${menuItem}]`);

      if (item !== null) {
        item.classList.add('trip-tabs__btn--active');
      }
    }
}
