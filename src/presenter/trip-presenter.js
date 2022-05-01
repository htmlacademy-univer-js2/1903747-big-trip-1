import {render, updateItem} from '../render.js';
import {RenderPosition} from '../render.js';
import {SiteSortView} from '../view/site-list-sort-view.js';
import {SiteNoPointView} from '../view/site-no-point-view.js';
import {PointPresenter} from './point-presenter.js';

export class TripPresenter {
  #sortComponent = new SiteSortView();
  #noPointView = new SiteNoPointView();
  #pointObjectsArray;
  #tripListElement;
  #tripPoints = new Map();

  constructor(tripListElement) {
    this.#tripListElement = tripListElement;
  }

  init = (pointObjectsArray) => {
    this.#pointObjectsArray = pointObjectsArray;
    this.#renderPoints();
  }

  #renderSort = () => {
    render(this.#tripListElement, this.#sortComponent.element, RenderPosition.BEFOREBEGIN);
  }

  #handlePointChange = (updatedPoint) => {
    this.#pointObjectsArray = updateItem(this.#pointObjectsArray, updatedPoint);
    this.#tripPoints.get(updatedPoint.id).init(updatedPoint);
  }

  #handleModeChange = () => {
    this.#tripPoints.forEach((presenter) => presenter.resetView());
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#tripListElement, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#tripPoints.set(pointPresenter.pointId, pointPresenter);
    return pointPresenter;
  }

  #generateTripPointsList = () => {
    for (let i = 0; i < this.#pointObjectsArray.length; i++) {
      this.#renderPoint(this.#pointObjectsArray[i]);
    }
  }

  #clearPointList = () => {
    this.#tripPoints.forEach((presenter) => presenter.destroy());
    this.#tripPoints.clear();
  }

  #renderPoints = () => {
    if (this.#pointObjectsArray.length === 0) {
      this.#renderNoPoint();
    }
    else {
      this.#renderSort();
      this.#generateTripPointsList();
      //renderTemplate(tripList, createSiteNewPointTemplate(generatePoint()), 'afterbegin');
    }
  }

  #renderNoPoint = () => {
    render(this.#tripListElement, this.#noPointView.element, RenderPosition.BEFOREEND);
  }
}
