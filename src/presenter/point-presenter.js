import {SitePointView} from '../view/site-point-view.js';
import {SiteEditPointView} from '../view/site-edit-point-view.js';
import {render, RenderPosition, replace, remove} from '../render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export class PointPresenter {
    #tripListElement = null;

    #pointObject = null;
    #pointComponent = null;
    #pointEditComponent = null;
    #pointId = null;

    #changeData = null;
    #changeMode = null;

    #mode = Mode.DEFAULT;

    constructor (tripListElement, changeData, changeMode) {
      this.#tripListElement = tripListElement;
      this.#changeData = changeData;
      this.#changeMode = changeMode;
    }

    init = (pointObject) => {
      this.#pointObject = pointObject;
      this.#pointId = pointObject.id;

      const prevPointComponent = this.#pointComponent;
      const prevPointEditComponent = this.#pointEditComponent;

      this.#pointComponent = new SitePointView(this.#pointObject);
      this.#pointEditComponent = new SiteEditPointView(this.#pointObject);

      this.#setEditClick();
      this.#pointComponent.setFavoriteClickHandler(this.#setFavoriteClick);

      if (prevPointComponent === null || prevPointEditComponent === null) {
        render(this.#tripListElement, this.#pointComponent.element, RenderPosition.BEFOREEND);
        return;
      }

      if (this.#tripListElement.contains(prevPointComponent.element)) {
        replace(this.#pointComponent, prevPointComponent);
      }

      if (this.#tripListElement.contains(prevPointEditComponent.element)) {
        replace(this.#pointEditComponent, prevPointEditComponent);
      }

      remove(prevPointComponent);
      remove(prevPointEditComponent);
    }

    get pointId() {
      return this.#pointId;
    }

    destroy = () => {
      remove(this.#pointComponent);
      remove(this.#pointEditComponent);
    }

    #replacePointToForm = () => {
      replace(this.#pointEditComponent.element, this.#pointComponent.element);
      this.#changeMode();
      this.#mode = Mode.EDITING;
    };

    resetView = () => {
      if (this.#mode !== Mode.DEFAULT) {
        this.#replaceFormToPoint();
      }
    }

    #replaceFormToPoint = () => {
      this.#tripListElement.replaceChild(this.#pointComponent.element, this.#pointEditComponent.element);
      this.#mode = Mode.DEFAULT;
    };

    #onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        event.preventDefault();
        this.#replaceFormToPoint();
        document.removeEventListener('keydown', this.#onEscKeyDown);
      }
    };

    #setEditClick = () => {
      this.#pointComponent.setEditClickHandler(() => {
        this.#replacePointToForm();
        document.addEventListener('keydown', this.#onEscKeyDown);
      });


      this.#pointEditComponent.setFormSubmitHandler(() => {
        this.#replaceFormToPoint();
        document.addEventListener('keydown', this.#onEscKeyDown);
      });

      this.#pointEditComponent.setEditClickHandler(() => {
        this.#replaceFormToPoint();
      });
    }

    #setFavoriteClick = () => {
      this.#pointObject.isFavorite = !this.#pointObject.isFavorite;
      this.#changeData(this.#pointObject);
    }
}
