import {render} from '../render.js';
import {RenderPosition} from '../render.js';
import {SiteSortView} from '../view/site-list-sort-view.js';
import {Filter} from '../view/site-filter-view.js';
import {filter} from '../utilities/common.js';
import {SiteNoPointView} from '../view/site-no-point-view.js';
import {PointPresenter} from './point-presenter.js';
import {EventNew} from './new-event-presenter.js';
import {FilterType, SortType, UserAction, UpdateType} from '../const.js';
import {sortPointTime, sortPointPrice} from '../mock/mock.js';
import {NewPointButton} from '../view/new-event-button.js';

export class TripPresenter {
  #sortComponent = new SiteSortView();
  #newPointButton = new NewPointButton();
  #noPointView = new SiteNoPointView();
  #pointsModel = null;
  #filterType = null;
  #filtersComponent = null;
  #tripListContainer = null;
  #tripFiltersContainer = null;
  #tripMainContainer = null;
  #eventNewPresenter = null;
  #sortType = SortType.DEFAULT;
  #pointPresenters = new Map();

  constructor(tripListContainer, tripFiltersContainer, tripMainContainer, pointsModel) {
    this.#tripListContainer = tripListContainer;
    this.#tripFiltersContainer =  tripFiltersContainer;
    this.#tripMainContainer = tripMainContainer;
    this.#filterType = FilterType.EVERYTHING;
    this.#pointsModel = pointsModel;
    render(this.#tripMainContainer, this.#newPointButton.element, RenderPosition.BEFOREEND);
    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const filteredPoints = filter[this.#filterType](this.#pointsModel.points);
    switch (this.#sortType) {
      case SortType.PRICE:
        return filteredPoints.slice(0).sort(sortPointPrice);
      case SortType.TIME:
        return filteredPoints.slice(0).sort(sortPointTime);
    }
    return filteredPoints;
  }

  init = () => {
    this.#filtersComponent = new Filter('everything');
    this.#newPointButton.setNewEventButtonHandler(this._buttonHandler);
    render(this.#tripFiltersContainer, this.#filtersComponent.element, RenderPosition.BEFOREEND);
    this.#filtersComponent.setFilterTypeChangeHandler(this.#handlerFilterTypeChange);
    this.#renderBoard();
  }

  #renderSort = () => {
    render(this.#tripListContainer, this.#sortComponent.element, RenderPosition.BEFOREBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  }

  #handlerFilterTypeChange = (filterType) => {
    if (this.#filterType === filterType) {
      return;
    }
    this.#filterType = filterType;
    this.#handleModelEvent('MAJOR');
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#sortType === sortType) {
      return;
    }

    this.#sortType = sortType;
    this.#clearEventsList();
    this.#renderPointsList();
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch(actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch(updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearEventsList();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearEventsList(true);
        this.#renderBoard();
        break;
    }
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#tripListContainer, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenters.set(pointPresenter.pointId, pointPresenter);
  }

  #renderPointsList = () => {
    this.points.forEach((point) => this.#renderPoint(point));
  }

  #renderBoard = () => {
    if (this.#pointsModel.points.length === 0) {
      this.#renderNoPoint();
      return;
    }
    this.#renderSort();
    this.#eventNewPresenter = new EventNew(this.#tripListContainer, this.#handleViewAction, this.setActiveButton);
    this.#eventNewPresenter.init();
    this.#renderPointsList();
  }

  #renderNoPoint = () => {
    render(this.#tripListContainer, this.#noPointView.element, RenderPosition.BEFOREEND);
  }

  #clearEventsList = (resetSortType = false) => {
    this.#eventNewPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());

    if (resetSortType) {
      this.#sortType = SortType.DEFAULT;
    }
  }

  _buttonHandler = () => {
    this.#eventNewPresenter.init();
    render(this.#tripListContainer, this.#eventNewPresenter.editComponent, RenderPosition.AFTERBEGIN);
    this.#newPointButton.setDisable();
  }

  setActiveButton = () => {
    this.#newPointButton.removeDisable();
  }
}
