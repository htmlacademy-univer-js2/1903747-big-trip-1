import {render} from './render.js';
import {RenderPosition} from './render.js';
import {SiteTabView} from './view/site-tab-view.js';
import {SiteFilterView} from './view/site-filter-view.js';
import {TripPresenter} from './presenter/trip-presenter.js';
import {generatePoint} from './mock/mock.js';
// import {SiteNewPointTemplate} from './view/site-new-point-view.js';
const pointsCount = 10;

const mocksArray = [];
for (let i = 0; i < pointsCount; i++) {
  mocksArray.push(generatePoint());
}

const tripMainElement = document.querySelector('.trip-main');
const tripFiltersElement = document.querySelector('.trip-controls__filters');
const tripListElement = document.querySelector('.trip-events__list');

const tripPresenter = new TripPresenter(tripListElement);

render(tripMainElement, new SiteTabView().element, RenderPosition.AFTERBEGIN);
render(tripFiltersElement, new SiteFilterView().element, RenderPosition.BEFOREEND);

tripPresenter.init(mocksArray);


