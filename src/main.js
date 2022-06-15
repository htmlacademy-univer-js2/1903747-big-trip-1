import {render} from './render.js';
import {RenderPosition, remove} from './render.js';
import {TripPresenter} from './presenter/trip-presenter.js';
import {Statistics} from './view/stats.js';
import {Menu} from './view/menu-view.js';
import {MenuItem} from './const.js';
import {PointsModel} from './model/point-model.js';
import { ApiService } from './api/api-service.js';

const AUTHORIZATION = 'Basic yhu4238920aaja19';
const END_POINT = 'https://16.ecmascript.pages.academy/big-trip';
const apiService = new ApiService(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel(apiService);

const tripMainContainer = document.querySelector('.trip-main');
const tripControlsContainer = document.querySelector('.trip-main__trip-controls');
const tripListContainer = document.querySelector('.trip-events__list');
const tripEventsContainer = document.querySelector('.trip-events');
const tripPresenter = new TripPresenter(tripListContainer, tripControlsContainer, tripMainContainer, pointsModel);
const menuComponent = new Menu();
let statisticsComponent = null;


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

tripPresenter.init();
pointsModel.init().finally(() => {
  render(tripControlsContainer, menuComponent.element, RenderPosition.AFTERBEGIN);
  menuComponent.setMenuClickHandler(handleSiteMenuClick);
});


