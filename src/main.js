import {render} from './render.js';
import {RenderPosition} from './render.js';
import {SiteTabView} from './view/site-tab-view.js';
import {SiteFilterView} from './view/site-filter-view.js';
import {SiteSortView} from './view/site-list-sort-view.js';
import {SiteNoPointView} from './view/site-no-point-view.js';
import {tripPoint, generatePoint} from './mock/mock.js';
import {SitePointView} from './view/site-list-content-view.js';

// import {SiteNewPointTemplate} from './view/site-new-point-view.js';
// did second task
import {SiteEditPointView} from './view/site-edit-point-view.js';

const pointsCount = 10;

const mainComponent = document.querySelector('.trip-main');
const tripFilters = document.querySelector('.trip-controls__filters');
const tripList = document.querySelector('.trip-events');
const points = [];
for (let i = 0; i < pointsCount; i++) {
  points.push(new tripPoint(generatePoint()));
}

const renderPoint = (pointListElement, point) => {
  const pointComponent = new SitePointView(point);
  const pointEditComponent = new SiteEditPointView(point);

  const replacePointToForm = () => {
    pointListElement.replaceChild(pointEditComponent.element, pointComponent.element);
  };

  const replaceFormToPoint = () => {
    pointListElement.replaceChild(pointComponent.element, pointEditComponent.element);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      event.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointComponent.setEditClickHandler(() => {
    replacePointToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });


  pointEditComponent.setFormSubmitHandler(() => {
    replaceFormToPoint();
    document.addEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceFormToPoint();
  });

  render(pointListElement, pointComponent.element, RenderPosition.BEFOREEND);
};

render(mainComponent, new SiteTabView().element, RenderPosition.AFTERBEGIN);
render(tripFilters, new SiteFilterView().element, RenderPosition.BEFOREEND);

if (points.every((point) => point.isArchive)) {
  render(tripList, new SiteNoPointView().element, RenderPosition.BEFOREEND);
}
else {
  render(tripList, new SiteSortView().element, RenderPosition.AFTERBEGIN);
  //renderTemplate(tripList, createSiteNewPointTemplate(generatePoint()), 'afterbegin');

  for (let i = 0; i < pointsCount; i++) {
    renderPoint(tripList, points[i]);
  }
}


