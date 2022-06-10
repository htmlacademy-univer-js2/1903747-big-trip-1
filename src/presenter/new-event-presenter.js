import {SiteEditPointView} from '../view/site-edit-point-view.js';
import {remove} from '../render.js';
import {UserAction, UpdateType} from '../const.js';
import {generateClearPoint} from '../mock/mock.js';

export class EventNew {
    #changeData = null;
    #eventEditComponent = null;
    #eventListContainer = null;
    #setActiveButton = null;

    constructor(eventListContainer, changeData, setActiveButton) {
      this.#eventListContainer = eventListContainer;
      this.#changeData = changeData;
      this.#setActiveButton = setActiveButton;
      this.#eventEditComponent = null;
    }

    init() {
      if (this.#eventEditComponent !== null) {
        return;
      }

      this.#eventEditComponent = new SiteEditPointView(generateClearPoint());
      this.#eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
      this.#eventEditComponent.setDeleteClickHandler(this._handleDeleteClick);
      this.#eventEditComponent.setEditClickHandler(this._handleDeleteClick);
    }

    get editComponent() {
      return this.#eventEditComponent.element;
    }

    destroy() {
      if (this.#eventEditComponent === null) {
        return;
      }

      remove(this.#eventEditComponent);
      this.#eventEditComponent = null;
      this.#setActiveButton();
      document.removeEventListener('keydown', this._escKeyDownHandler);
    }

    setSaving() {
      this.#eventEditComponent.updateData({
        isDisabled: true,
        isSaving: true
      });
    }

    setAborting() {
      const resetFormState = () => {
        this.#eventEditComponent.updateData({
          isDisabled: false,
          isSaving: false,
          isDeleting: false
        });
      };

      this.#eventEditComponent.shake(resetFormState);
    }

  _handleFormSubmit = (tripPoint) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      tripPoint
    );
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _handleDeleteClick = () => {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }
}
