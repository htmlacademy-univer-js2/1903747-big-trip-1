import AbstractView from './abstract-view.js';

const createSiteFilterTemplate = (currentFilterType, filters) => `<div class="trip-controls__filters">
              <h2 class="visually-hidden">Filter events</h2>
              <form class="trip-filters" action="#" method="get">
                <div class="trip-filters__filter">
                  <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything"
                    ${currentFilterType === 'everything' ? 'checked' : ''}>
                  <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
                </div>
                
                <div class="trip-filters__filter">
                  <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future"
                    ${currentFilterType === 'future' ? 'checked' : ''}
                    ${filters.future.length === 0 ? 'disabled' : ''}>
                  <label class="trip-filters__filter-label" for="filter-future">Future</label>
                </div>
                
                <div class="trip-filters__filter">
                  <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past"
                    ${currentFilterType === 'past' ? 'checked' : ''}
                    ${filters.past.length === 0 ? 'disabled' : ''}/>
                  <label class="trip-filters__filter-label" for="filter-past">Past</label>
                </div>

                <button class="visually-hidden" type="submit">Accept filter</button>
              </form>
            </div>`;

export class Filter extends AbstractView {
  #element = null;
  #filters = null;
  #currentFilter = null;

  constructor() {
    super();
  }

  init(filters, currentFilter) {
    this.#filters = filters;
    this.#currentFilter = currentFilter;
  }

  get template() {
    return createSiteFilterTemplate(this.#currentFilter, this.#filters);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('change', this.#filterTypeChangeHandler);
  }
}
