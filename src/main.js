import {render} from './render.js';
import {RenderPosition} from './render.js';
import {SiteTabView} from './view/site-tab-view.js';
import {TripPresenter} from './presenter/trip-presenter.js';
import {generatePoint} from './mock/mock.js';
import {PointsModel} from './model/point-model.js';
// import {SiteNewPointTemplate} from './view/site-new-point-view.js';
const pointsCount = 10;

const mocksArray = [];
for (let i = 0; i < pointsCount; i++) {
  mocksArray.push(generatePoint());
}

const pointsModel = new PointsModel();
pointsModel.points = mocksArray;

const tripMainContainer = document.querySelector('.trip-main');
const tripFiltersContainer = document.querySelector('.trip-controls__filters');
const tripListContainer = document.querySelector('.trip-events__list');

const tripPresenter = new TripPresenter(tripListContainer, tripFiltersContainer, tripMainContainer, pointsModel);

render(tripMainContainer, new SiteTabView().element, RenderPosition.AFTERBEGIN);
//render(tripFiltersElement, new SiteFilterView().element, RenderPosition.BEFOREEND);

tripPresenter.init();


