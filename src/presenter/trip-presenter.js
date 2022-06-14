import {render} from '../render.js';
import {RenderPosition, remove} from '../render.js';
import {SiteSortView} from '../view/site-list-sort-view.js';
import {Filter} from '../view/site-filter-view.js';
import {filter} from '../utilities/common.js';
import {SiteNoPointView} from '../view/site-no-point-view.js';
import {PointPresenter} from './point-presenter.js';
import {EventNew} from './new-event-presenter.js';
import {FilterType, SortType, UserAction, UpdateType, Mode} from '../const.js';
import {sortPointTime, sortPointPrice} from '../mock/mock.js';
import {NewPointButton} from '../view/new-event-button.js';
import { SiteTabView } from '../view/site-tab-view.js';
import { Loading } from '../view/loading.js';

export class TripPresenter {
  #siteTabComponent = null;
  #newPointButton = null;
  #sortComponent = null;
  #noPointComponent = null;
  #loadingComponent = null;
  #pointsModel = null;
  #filterType = null;
  #filtersComponent = null;
  #tripListContainer = null;
  #tripControlsContainer = null;
  #tripMainContainer = null;
  #destinations = null;
  #eventNewPresenter = null;
  #sortType = SortType.DEFAULT;
  #isLoading = true;
  #totalPrice = 0;
  #pointPresenters = new Map();

  constructor(tripListContainer, tripControlsContainer, tripMainContainer, pointsModel) {
    this.#tripListContainer = tripListContainer;
    this.#tripControlsContainer = tripControlsContainer;
    this.#tripMainContainer = tripMainContainer;
    this.#filterType = FilterType.EVERYTHING;
    this.#pointsModel = pointsModel;
    this.#noPointComponent = new SiteNoPointView();
    this.#loadingComponent = new Loading();
  }

  get points() {
    const filteredPoints = filter[this.#filterType](this.#pointsModel.points);
    switch (this.#sortType) {
      case SortType.PRICE:
        return filteredPoints.slice(0).sort(sortPointPrice);
      case SortType.TIME:
        return filteredPoints.slice(0).sort(sortPointTime);
      case SortType.DEFAULT:
        return filteredPoints.slice(0).sort((a, b) => a.dateFrom - b.dateTo);
    }
    return filteredPoints;
  }

  init = () => {
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#sortComponent = new SiteSortView();
    this.#newPointButton = new NewPointButton();
    this.#filtersComponent = new Filter('everything');
    this.#newPointButton.setNewEventButtonHandler(this._buttonHandler);
    render(this.#tripControlsContainer, this.#newPointButton.element, RenderPosition.AFTEREND);
    render(this.#tripControlsContainer, this.#filtersComponent.element, RenderPosition.BEFOREEND);
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
    this.#renderBoard();
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
        this.#pointPresenters.get(data.id).init(data, this.#pointsModel.offers, this.#destinations);
        break;
      case UpdateType.MINOR:
        this.#clearEventsList();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearEventsList(true);
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  }

  #renderPoint = (point) => {
    this.#totalPrice += Number(point.basePrice);
    const pointPresenter = new PointPresenter(this.#tripListContainer, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point, this.#pointsModel.offers, this.#destinations);
    this.#pointPresenters.set(pointPresenter.pointId, pointPresenter);
  }

  #renderPointsList = () => {
    this.points.forEach((point) => this.#renderPoint(point));
  }

  #renderBoard = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    this.#destinations = this.#pointsModel.destinations;
    this.#eventNewPresenter = new EventNew(this.#tripListContainer, this.#handleViewAction, this.setActiveButton);
    this.#eventNewPresenter.init(this.#pointsModel.offers, this.#destinations);

    if (this.#pointsModel.points.length === 0) {
      remove(this.#sortComponent);
      this.#renderNoPoint();
      return;
    }
    this.#isLoading = false;
    remove(this.#noPointComponent);
    this.#renderSort();

    this.#renderPointsList();
    this.#siteTabComponent = new SiteTabView(this.#totalPrice, this.#pointsModel.points);
    render(this.#tripMainContainer, this.#siteTabComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderNoPoint = () => {
    render(this.#tripListContainer, this.#noPointComponent.element, RenderPosition.BEFOREEND);
  }

  #renderLoading = () => {
    render(this.#tripListContainer, this.#loadingComponent.element, RenderPosition.BEFOREEND);
  }

  destroy() {
    this.#clearEventsList({resetSortType : true});
    remove(this.#noPointComponent);
    remove(this.#sortComponent);
    remove(this.#filtersComponent);
    remove(this.#newPointButton);

    this.#eventNewPresenter.destroy();
    this.#sortComponent = null;

    this.#pointsModel.removeObserver(this.#handleModelEvent);
  }

  #clearEventsList = (resetSortType = false) => {
    this.#totalPrice = 0;
    this.#eventNewPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters = new Map();
    remove(this.#siteTabComponent);

    if (resetSortType) {
      this.#sortType = SortType.DEFAULT;
    }
  }

  _buttonHandler = () => {
    this.#eventNewPresenter.init(this.#pointsModel.offers, this.#destinations);
    const editingComponent = Array.from(this.#pointPresenters.values()).find((presenter) => presenter.mode === Mode.EDITING);
    if (editingComponent !== undefined) {
      editingComponent.replaceFormToPoint();
    }
    render(this.#tripListContainer, this.#eventNewPresenter.editComponent, RenderPosition.AFTERBEGIN);
    this.#newPointButton.setDisable();
  }

  setActiveButton = () => {
    this.#newPointButton.removeDisable();
  }
}
