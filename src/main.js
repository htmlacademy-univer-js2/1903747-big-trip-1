import {render} from './render.js';
import {RenderPosition, remove} from './render.js';
import {TripPresenter} from './presenter/trip-presenter.js';
import {generatePoint} from './mock/mock.js';
import {Statistics} from './view/stats.js';
import {PointsModel} from './model/point-model.js';
import {Menu} from './view/menu-view.js';
import {MenuItem} from './const.js';

// import {SiteNewPointTemplate} from './view/site-new-point-view.js';
const pointsCount = 2;
const mocksArray = [];
for (let i = 0; i < pointsCount; i++) {
  mocksArray.push(generatePoint());
}

const pointsModel = new PointsModel();
pointsModel.points = mocksArray;

const tripMainContainer = document.querySelector('.trip-main');
const tripControlsContainer = document.querySelector('.trip-main__trip-controls');
const tripListContainer = document.querySelector('.trip-events__list');
const tripEventsContainer = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter(tripListContainer, tripControlsContainer, tripMainContainer, pointsModel);
const menuComponent = new Menu();
let statisticsComponent = null;

render(tripControlsContainer, menuComponent.element, RenderPosition.AFTERBEGIN);

const handleSiteMenuClick = (menuItem) => {
  menuComponent.setMenuDisable(menuItem);
  switch (menuItem) {
    case MenuItem.TABLE:
      remove(statisticsComponent);
      tripPresenter.init();
      break;
    case MenuItem.STATS:
      tripPresenter.destroy();
      statisticsComponent = new Statistics(tripPresenter.points);
      render(tripEventsContainer, statisticsComponent.element, RenderPosition.BEFOREEND);
      break;
  }
};

menuComponent.setMenuClickHandler(handleSiteMenuClick);

//render(tripFiltersElement, new SiteFilterView().element, RenderPosition.BEFOREEND);
tripPresenter.init();


