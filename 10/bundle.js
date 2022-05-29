/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/const.js":
/*!**********************!*\
  !*** ./src/const.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SortType": () => (/* binding */ SortType)
/* harmony export */ });
const SortType = {
  DEFAULT: 'DEFAULT',
  TIME: 'TIME',
  PRICE: 'PRICE'
};

/***/ }),

/***/ "./src/mock/mock.js":
/*!**************************!*\
  !*** ./src/mock/mock.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "allOffers": () => (/* binding */ allOffers),
/* harmony export */   "eventTypes": () => (/* binding */ eventTypes),
/* harmony export */   "generatePoint": () => (/* binding */ generatePoint),
/* harmony export */   "sortPointPrice": () => (/* binding */ sortPointPrice),
/* harmony export */   "sortPointTime": () => (/* binding */ sortPointTime),
/* harmony export */   "townArray": () => (/* binding */ townArray)
/* harmony export */ });
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nanoid */ "./node_modules/nanoid/index.dev.js");

const eventTypes = [{
  name: 'taxi',
  iconURL: 'img/icons/taxi.png',
  action: 'to'
}, {
  name: 'bus',
  iconURL: 'img/icons/bus.png',
  action: 'to'
}, {
  name: 'train',
  iconURL: 'img/icons/train.png',
  action: 'to'
}, {
  name: 'ship',
  iconURL: 'img/icons/ship.png',
  action: 'to'
}, {
  name: 'transport',
  iconURL: 'img/icons/transport.png',
  action: 'to'
}, {
  name: 'drive',
  iconURL: 'img/icons/drive.png',
  action: 'to'
}, {
  name: 'flight',
  iconURL: 'img/icons/flight.png',
  action: 'to'
}, {
  name: 'check-in',
  iconURL: 'img/icons/check-in.png',
  action: 'in'
}, {
  name: 'sightseeing',
  iconURL: 'img/icons/sightseeing.png',
  action: 'in'
}, {
  name: 'restaurant',
  iconURL: 'img/icons/restaurant.png',
  action: 'in'
}];
const townArray = ['New-York', 'Dallas', 'Moscow', 'Tokyo', 'Madrid', 'Belgrad', 'Crimea', 'Oakland', 'Manila', 'Warsaw'];

class optionObject {
  constructor(newOption, newPrice, newType) {
    this.tripOffer = {
      type: newType,
      option: newOption,
      price: newPrice
    };
  }

  get type() {
    return this.tripOffer.type;
  }

  get tripOfer() {
    return this.tripOffer;
  }

}

const allOffers = [new optionObject('Add breakfast', 50, 'restaurant').tripOffer, new optionObject('Add alchol', 50, 'restaurant').tripOffer, new optionObject('Add luggage', 50, 'flight').tripOffer, new optionObject('Rent a car', 80, 'drive').tripOffer, new optionObject('Add soft drinks', 10, 'bus').tripOffer, new optionObject('Book tickets', 40, 'sightseeing').tripOffer, new optionObject('Lunch in city', 30, 'sightseeing').tripOffer, new optionObject('Order Uber', 20, 'taxi').tripOffer, new optionObject('Add dinner', 20, 'train').tripOffer, new optionObject('Switch to comfort', 30, 'flight').tripOffer, new optionObject('Switch to luxe', 100, 'ship').tripOffer, new optionObject('Premium waiting area', 20, 'check-in').tripOffer, new optionObject('Switch to luxe', 50, 'transport').tripOffer];
const descriptionArray = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget', 'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra', 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum', 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui', 'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus'];

const getImageArray = () => {
  const arr = [];

  for (let i = 0; i < getRandomInt(0, 3); i++) {
    arr.push(`http://picsum.photos/248/152?${getRandomInt(0, 20)}`);
  }

  return arr;
};

const getOptionArray = typeOfTrip => {
  const arr = [];
  allOffers.forEach(offer => offer.type === typeOfTrip ? arr.push(offer) : null);
  return arr;
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateTime = () => {
  const month = getRandomInt(0, 11);
  const day = getRandomInt(0, 31);
  const hours = getRandomInt(0, 17);
  const minutes = getRandomInt(0, 10);
  const startTime = new Date(2022, month, day, hours, minutes);
  const endTime = new Date(2022, month, day, hours + getRandomInt(1, 7), minutes + getRandomInt(10, 45)); //console.log(startTime, endTime);

  const duration = new Date(endTime - startTime - 18000000);
  return [startTime, endTime, duration];
};

const getWeight = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortPointTime = (pointA, pointB) => {
  const durationA = pointA.point.tripDuration;
  const durationB = pointB.point.tripDuration;
  const weight = getWeight(durationA, durationB);
  return weight !== null && weight !== void 0 ? weight : durationB - durationA;
};
const sortPointPrice = (pointA, pointB) => {
  const weight = getWeight(pointA.point.basePrice, pointB.point.basePrice);
  return weight !== null && weight !== void 0 ? weight : pointB.point.basePrice - pointA.point.basePrice;
};
const generatePoint = () => {
  const dateAndDuration = generateTime();
  const newType = eventTypes[getRandomInt(0, eventTypes.length - 1)];
  return {
    description: descriptionArray[getRandomInt(0, 4)],
    townName: townArray[getRandomInt(0, townArray.length)],
    pictures: getImageArray(),
    offers: getOptionArray(newType.name),
    basePrice: getRandomInt(20, 2000),
    dateFrom: dateAndDuration[0],
    dateTo: dateAndDuration[1],
    tripDuration: dateAndDuration[2],
    isFavorite: Math.random() >= 0.7,
    type: newType,
    id: (0,nanoid__WEBPACK_IMPORTED_MODULE_0__.nanoid)()
  };
};

/***/ }),

/***/ "./src/presenter/point-presenter.js":
/*!******************************************!*\
  !*** ./src/presenter/point-presenter.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PointPresenter": () => (/* binding */ PointPresenter)
/* harmony export */ });
/* harmony import */ var _view_site_point_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/site-point-view.js */ "./src/view/site-point-view.js");
/* harmony import */ var _view_site_edit_point_view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../view/site-edit-point-view.js */ "./src/view/site-edit-point-view.js");
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../render.js */ "./src/render.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }




const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

var _tripListElement = /*#__PURE__*/new WeakMap();

var _pointObject = /*#__PURE__*/new WeakMap();

var _pointComponent = /*#__PURE__*/new WeakMap();

var _pointEditComponent = /*#__PURE__*/new WeakMap();

var _pointId = /*#__PURE__*/new WeakMap();

var _changeData = /*#__PURE__*/new WeakMap();

var _changeMode = /*#__PURE__*/new WeakMap();

var _mode = /*#__PURE__*/new WeakMap();

var _replacePointToForm = /*#__PURE__*/new WeakMap();

var _replaceFormToPoint = /*#__PURE__*/new WeakMap();

var _onEscKeyDown = /*#__PURE__*/new WeakMap();

var _setEditClick = /*#__PURE__*/new WeakMap();

var _setFavoriteClick = /*#__PURE__*/new WeakMap();

class PointPresenter {
  constructor(tripListElement, changeData, changeMode) {
    _classPrivateFieldInitSpec(this, _tripListElement, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _pointObject, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _pointComponent, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _pointEditComponent, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _pointId, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _changeData, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _changeMode, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _mode, {
      writable: true,
      value: Mode.DEFAULT
    });

    _defineProperty(this, "init", pointObject => {
      _classPrivateFieldSet(this, _pointObject, pointObject);

      _classPrivateFieldSet(this, _pointId, pointObject.id);

      const prevPointComponent = _classPrivateFieldGet(this, _pointComponent);

      const prevPointEditComponent = _classPrivateFieldGet(this, _pointEditComponent);

      _classPrivateFieldSet(this, _pointComponent, new _view_site_point_view_js__WEBPACK_IMPORTED_MODULE_0__.SitePointView(_classPrivateFieldGet(this, _pointObject)));

      _classPrivateFieldSet(this, _pointEditComponent, new _view_site_edit_point_view_js__WEBPACK_IMPORTED_MODULE_1__.SiteEditPointView(_classPrivateFieldGet(this, _pointObject)));

      _classPrivateFieldGet(this, _setEditClick).call(this);

      _classPrivateFieldGet(this, _pointComponent).setFavoriteClickHandler(_classPrivateFieldGet(this, _setFavoriteClick));

      if (prevPointComponent === null || prevPointEditComponent === null) {
        (0,_render_js__WEBPACK_IMPORTED_MODULE_2__.render)(_classPrivateFieldGet(this, _tripListElement), _classPrivateFieldGet(this, _pointComponent).element, _render_js__WEBPACK_IMPORTED_MODULE_2__.RenderPosition.BEFOREEND);
        return;
      }

      if (_classPrivateFieldGet(this, _tripListElement).contains(prevPointComponent.element)) {
        (0,_render_js__WEBPACK_IMPORTED_MODULE_2__.replace)(_classPrivateFieldGet(this, _pointComponent), prevPointComponent);
      }

      if (_classPrivateFieldGet(this, _tripListElement).contains(prevPointEditComponent.element)) {
        (0,_render_js__WEBPACK_IMPORTED_MODULE_2__.replace)(_classPrivateFieldGet(this, _pointEditComponent), prevPointEditComponent);
      }

      (0,_render_js__WEBPACK_IMPORTED_MODULE_2__.remove)(prevPointComponent);
      (0,_render_js__WEBPACK_IMPORTED_MODULE_2__.remove)(prevPointEditComponent);
    });

    _defineProperty(this, "destroy", () => {
      (0,_render_js__WEBPACK_IMPORTED_MODULE_2__.remove)(_classPrivateFieldGet(this, _pointComponent));
      (0,_render_js__WEBPACK_IMPORTED_MODULE_2__.remove)(_classPrivateFieldGet(this, _pointEditComponent));
    });

    _classPrivateFieldInitSpec(this, _replacePointToForm, {
      writable: true,
      value: () => {
        (0,_render_js__WEBPACK_IMPORTED_MODULE_2__.replace)(_classPrivateFieldGet(this, _pointEditComponent).element, _classPrivateFieldGet(this, _pointComponent).element);

        _classPrivateFieldGet(this, _changeMode).call(this);

        _classPrivateFieldSet(this, _mode, Mode.EDITING);
      }
    });

    _defineProperty(this, "resetView", () => {
      if (_classPrivateFieldGet(this, _mode) !== Mode.DEFAULT) {
        _classPrivateFieldGet(this, _replaceFormToPoint).call(this);
      }
    });

    _classPrivateFieldInitSpec(this, _replaceFormToPoint, {
      writable: true,
      value: () => {
        _classPrivateFieldGet(this, _tripListElement).replaceChild(_classPrivateFieldGet(this, _pointComponent).element, _classPrivateFieldGet(this, _pointEditComponent).element);

        _classPrivateFieldSet(this, _mode, Mode.DEFAULT);
      }
    });

    _classPrivateFieldInitSpec(this, _onEscKeyDown, {
      writable: true,
      value: evt => {
        if (evt.key === 'Escape' || evt.key === 'Esc') {
          event.preventDefault();

          _classPrivateFieldGet(this, _replaceFormToPoint).call(this);

          document.removeEventListener('keydown', _classPrivateFieldGet(this, _onEscKeyDown));
        }
      }
    });

    _classPrivateFieldInitSpec(this, _setEditClick, {
      writable: true,
      value: () => {
        _classPrivateFieldGet(this, _pointComponent).setEditClickHandler(() => {
          _classPrivateFieldGet(this, _replacePointToForm).call(this);

          document.addEventListener('keydown', _classPrivateFieldGet(this, _onEscKeyDown));
        });

        _classPrivateFieldGet(this, _pointEditComponent).setFormSubmitHandler(() => {
          _classPrivateFieldGet(this, _replaceFormToPoint).call(this);

          document.addEventListener('keydown', _classPrivateFieldGet(this, _onEscKeyDown));
        });

        _classPrivateFieldGet(this, _pointEditComponent).setEditClickHandler(() => {
          _classPrivateFieldGet(this, _replaceFormToPoint).call(this);
        });
      }
    });

    _classPrivateFieldInitSpec(this, _setFavoriteClick, {
      writable: true,
      value: () => {
        _classPrivateFieldGet(this, _pointObject).isFavorite = !_classPrivateFieldGet(this, _pointObject).isFavorite;

        _classPrivateFieldGet(this, _changeData).call(this, _classPrivateFieldGet(this, _pointObject));
      }
    });

    _classPrivateFieldSet(this, _tripListElement, tripListElement);

    _classPrivateFieldSet(this, _changeData, changeData);

    _classPrivateFieldSet(this, _changeMode, changeMode);
  }

  get pointId() {
    return _classPrivateFieldGet(this, _pointId);
  }

}

/***/ }),

/***/ "./src/presenter/trip-presenter.js":
/*!*****************************************!*\
  !*** ./src/presenter/trip-presenter.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TripPresenter": () => (/* binding */ TripPresenter)
/* harmony export */ });
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../render.js */ "./src/render.js");
/* harmony import */ var _view_site_list_sort_view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../view/site-list-sort-view.js */ "./src/view/site-list-sort-view.js");
/* harmony import */ var _view_site_no_point_view_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../view/site-no-point-view.js */ "./src/view/site-no-point-view.js");
/* harmony import */ var _point_presenter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./point-presenter.js */ "./src/presenter/point-presenter.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../const.js */ "./src/const.js");
/* harmony import */ var _mock_mock_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../mock/mock.js */ "./src/mock/mock.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }









var _sortComponent = /*#__PURE__*/new WeakMap();

var _noPointView = /*#__PURE__*/new WeakMap();

var _pointObjectsArray = /*#__PURE__*/new WeakMap();

var _tripListElement = /*#__PURE__*/new WeakMap();

var _currentSortType = /*#__PURE__*/new WeakMap();

var _sourcedPointObjectsArray = /*#__PURE__*/new WeakMap();

var _tripPoints = /*#__PURE__*/new WeakMap();

var _renderSort = /*#__PURE__*/new WeakMap();

var _handlePointChange = /*#__PURE__*/new WeakMap();

var _handleModeChange = /*#__PURE__*/new WeakMap();

var _handleSortTypeChange = /*#__PURE__*/new WeakMap();

var _sortPoints = /*#__PURE__*/new WeakMap();

var _renderPoint = /*#__PURE__*/new WeakMap();

var _generateTripPointsList = /*#__PURE__*/new WeakMap();

var _clearPointList = /*#__PURE__*/new WeakMap();

var _renderPoints = /*#__PURE__*/new WeakMap();

var _renderNoPoint = /*#__PURE__*/new WeakMap();

class TripPresenter {
  constructor(tripListElement) {
    _classPrivateFieldInitSpec(this, _sortComponent, {
      writable: true,
      value: new _view_site_list_sort_view_js__WEBPACK_IMPORTED_MODULE_1__.SiteSortView()
    });

    _classPrivateFieldInitSpec(this, _noPointView, {
      writable: true,
      value: new _view_site_no_point_view_js__WEBPACK_IMPORTED_MODULE_2__.SiteNoPointView()
    });

    _classPrivateFieldInitSpec(this, _pointObjectsArray, {
      writable: true,
      value: []
    });

    _classPrivateFieldInitSpec(this, _tripListElement, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _currentSortType, {
      writable: true,
      value: _const_js__WEBPACK_IMPORTED_MODULE_4__.SortType.DEFAULT
    });

    _classPrivateFieldInitSpec(this, _sourcedPointObjectsArray, {
      writable: true,
      value: []
    });

    _classPrivateFieldInitSpec(this, _tripPoints, {
      writable: true,
      value: new Map()
    });

    _defineProperty(this, "init", pointObjectsArray => {
      _classPrivateFieldSet(this, _pointObjectsArray, pointObjectsArray);

      _classPrivateFieldSet(this, _sourcedPointObjectsArray, pointObjectsArray);

      _classPrivateFieldGet(this, _renderPoints).call(this);
    });

    _classPrivateFieldInitSpec(this, _renderSort, {
      writable: true,
      value: () => {
        (0,_render_js__WEBPACK_IMPORTED_MODULE_0__.render)(_classPrivateFieldGet(this, _tripListElement), _classPrivateFieldGet(this, _sortComponent).element, _render_js__WEBPACK_IMPORTED_MODULE_0__.RenderPosition.BEFOREBEGIN);

        _classPrivateFieldGet(this, _sortComponent).setSortTypeChangeHandler(_classPrivateFieldGet(this, _handleSortTypeChange));
      }
    });

    _classPrivateFieldInitSpec(this, _handlePointChange, {
      writable: true,
      value: updatedPoint => {
        _classPrivateFieldSet(this, _pointObjectsArray, (0,_render_js__WEBPACK_IMPORTED_MODULE_0__.updateItem)(_classPrivateFieldGet(this, _pointObjectsArray), updatedPoint));

        _classPrivateFieldSet(this, _sourcedPointObjectsArray, (0,_render_js__WEBPACK_IMPORTED_MODULE_0__.updateItem)(_classPrivateFieldGet(this, _sourcedPointObjectsArray), updatedPoint));

        _classPrivateFieldGet(this, _tripPoints).get(updatedPoint.id).init(updatedPoint);
      }
    });

    _classPrivateFieldInitSpec(this, _handleModeChange, {
      writable: true,
      value: () => {
        _classPrivateFieldGet(this, _tripPoints).forEach(presenter => presenter.resetView());
      }
    });

    _classPrivateFieldInitSpec(this, _handleSortTypeChange, {
      writable: true,
      value: sortType => {
        if (_classPrivateFieldGet(this, _currentSortType) === sortType) {
          return;
        }

        _classPrivateFieldGet(this, _sortPoints).call(this, sortType);

        _classPrivateFieldGet(this, _clearPointList).call(this);

        _classPrivateFieldGet(this, _generateTripPointsList).call(this);
      }
    });

    _classPrivateFieldInitSpec(this, _sortPoints, {
      writable: true,
      value: sortType => {
        switch (sortType) {
          case _const_js__WEBPACK_IMPORTED_MODULE_4__.SortType.PRICE:
            _classPrivateFieldGet(this, _pointObjectsArray).sort(_mock_mock_js__WEBPACK_IMPORTED_MODULE_5__.sortPointPrice);

            break;

          case _const_js__WEBPACK_IMPORTED_MODULE_4__.SortType.TIME:
            _classPrivateFieldGet(this, _pointObjectsArray).sort(_mock_mock_js__WEBPACK_IMPORTED_MODULE_5__.sortPointTime);

            break;

          case _const_js__WEBPACK_IMPORTED_MODULE_4__.SortType.DEFAULT:
            _classPrivateFieldSet(this, _pointObjectsArray, _classPrivateFieldGet(this, _sourcedPointObjectsArray));

        }

        _classPrivateFieldSet(this, _currentSortType, sortType);
      }
    });

    _classPrivateFieldInitSpec(this, _renderPoint, {
      writable: true,
      value: point => {
        const pointPresenter = new _point_presenter_js__WEBPACK_IMPORTED_MODULE_3__.PointPresenter(_classPrivateFieldGet(this, _tripListElement), _classPrivateFieldGet(this, _handlePointChange), _classPrivateFieldGet(this, _handleModeChange));
        pointPresenter.init(point);

        _classPrivateFieldGet(this, _tripPoints).set(pointPresenter.pointId, pointPresenter);
      }
    });

    _classPrivateFieldInitSpec(this, _generateTripPointsList, {
      writable: true,
      value: () => {
        for (let i = 0; i < _classPrivateFieldGet(this, _pointObjectsArray).length; i++) {
          _classPrivateFieldGet(this, _renderPoint).call(this, _classPrivateFieldGet(this, _pointObjectsArray)[i]);
        }
      }
    });

    _classPrivateFieldInitSpec(this, _clearPointList, {
      writable: true,
      value: () => {
        _classPrivateFieldGet(this, _tripPoints).forEach(presenter => presenter.destroy());

        _classPrivateFieldGet(this, _tripPoints).clear();
      }
    });

    _classPrivateFieldInitSpec(this, _renderPoints, {
      writable: true,
      value: () => {
        if (_classPrivateFieldGet(this, _pointObjectsArray).length === 0) {
          _classPrivateFieldGet(this, _renderNoPoint).call(this);
        } else {
          _classPrivateFieldGet(this, _renderSort).call(this);

          _classPrivateFieldGet(this, _generateTripPointsList).call(this); //renderTemplate(tripList, createSiteNewPointTemplate(generatePoint()), 'afterbegin');

        }
      }
    });

    _classPrivateFieldInitSpec(this, _renderNoPoint, {
      writable: true,
      value: () => {
        (0,_render_js__WEBPACK_IMPORTED_MODULE_0__.render)(_classPrivateFieldGet(this, _tripListElement), _classPrivateFieldGet(this, _noPointView).element, _render_js__WEBPACK_IMPORTED_MODULE_0__.RenderPosition.BEFOREEND);
      }
    });

    _classPrivateFieldSet(this, _tripListElement, tripListElement);
  }

}

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RenderPosition": () => (/* binding */ RenderPosition),
/* harmony export */   "createElement": () => (/* binding */ createElement),
/* harmony export */   "remove": () => (/* binding */ remove),
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "replace": () => (/* binding */ replace),
/* harmony export */   "updateItem": () => (/* binding */ updateItem)
/* harmony export */ });
/* harmony import */ var _view_abstract_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view/abstract-view */ "./src/view/abstract-view.js");

const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend'
};
const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.BEFOREBEGIN:
      container.before(element);
      break;

    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;

    case RenderPosition.BEFOREEND:
      container.append(element);
      break;

    case RenderPosition.AFTEREND:
      container.after(element);
      break;
  }
};
const remove = component => {
  if (component === null) {
    return;
  }

  if (!(component instanceof _view_abstract_view__WEBPACK_IMPORTED_MODULE_0__["default"])) {
    throw new Error('Can only remove only components');
  }

  component.element.remove();
  component.removeElement();
};
const replace = (newElement, oldElement) => {
  if (newElement === null || oldElement === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  const newChild = newElement instanceof _view_abstract_view__WEBPACK_IMPORTED_MODULE_0__["default"] ? newElement.element : newElement;
  const oldChild = oldElement instanceof _view_abstract_view__WEBPACK_IMPORTED_MODULE_0__["default"] ? oldElement.element : oldElement;
  const parent = oldChild.parentElement;

  if (parent === null) {
    throw new Error('Parent element doesn\'t exist');
  }

  parent.replaceChild(newChild, oldChild);
};
const updateItem = (items, update) => {
  const index = items.findIndex(item => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [...items.slice(0, index), update, ...items.slice(index + 1)];
};
const createElement = template => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
};

/***/ }),

/***/ "./src/utilities/common.js":
/*!*********************************!*\
  !*** ./src/utilities/common.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "upCaseFirst": () => (/* binding */ upCaseFirst)
/* harmony export */ });
const upCaseFirst = str => {
  if (!str) {
    return str;
  }

  return str[0].toUpperCase() + str.slice(1);
};

/***/ }),

/***/ "./src/view/abstract-view.js":
/*!***********************************!*\
  !*** ./src/view/abstract-view.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AbstractView)
/* harmony export */ });
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../render.js */ "./src/render.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }



var _element = /*#__PURE__*/new WeakMap();

class AbstractView {
  constructor() {
    _classPrivateFieldInitSpec(this, _element, {
      writable: true,
      value: null
    });

    _defineProperty(this, "_callback", {});

    if (new.target === AbstractView) {
      throw new Error('Can\'t instatiate AbstractView, only concrete one.');
    }
  }

  get element() {
    if (!_classPrivateFieldGet(this, _element)) {
      _classPrivateFieldSet(this, _element, (0,_render_js__WEBPACK_IMPORTED_MODULE_0__.createElement)(this.template));
    }

    return _classPrivateFieldGet(this, _element);
  }

  getElement() {
    if (!_classPrivateFieldGet(this, _element)) {
      _classPrivateFieldSet(this, _element, (0,_render_js__WEBPACK_IMPORTED_MODULE_0__.createElement)(this.template));
    }

    return _classPrivateFieldGet(this, _element);
  }

  get template() {
    throw new Error('Abstract method not implemented: get template');
  }

  removeElement() {
    _classPrivateFieldSet(this, _element, null);
  }

}

/***/ }),

/***/ "./src/view/site-edit-point-view.js":
/*!******************************************!*\
  !*** ./src/view/site-edit-point-view.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SiteEditPointView": () => (/* binding */ SiteEditPointView)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utilities_common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/common.js */ "./src/utilities/common.js");
/* harmony import */ var _smart_view_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./smart-view.js */ "./src/view/smart-view.js");
/* harmony import */ var _mock_mock_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../mock/mock.js */ "./src/mock/mock.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }






const createEditEventOfferTemplate = (pointOffer, offersOfTrip) => {
  const price = pointOffer.price;
  const name = pointOffer.option.toLowerCase().replace(/ /g, '-');
  const checked = offersOfTrip.findIndex(it => it.option === pointOffer.option) >= 0;
  return `<div class="event__offer-selector">
                            <input class="event__offer-checkbox  visually-hidden"
                                id="event-offer-${name}-1"
                                data-offer-name="${name}"
                                type="checkbox"
                                name="event-offer-${name}"
                                ${checked ? 'checked' : ''}>
                            <label class="event__offer-label" for="event-offer-${name}-1">
                              <span class="event__offer-title">${name}</span>
                              &plus;
                              &euro;&nbsp;<span class="event__offer-price">${price}</span>
                            </label>
                          </div>`;
};

const createEditEventTypeTemplate = (eventTypeName, eventType) => `<div class="event__type-item">
                              <input id="event-type-${eventType.name}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType.name}"
                              ${eventType.name === eventTypeName ? 'checked' : ''}">
                              <label class="event__type-label  event__type-label--${eventType.name}" for="event-type-${eventType.name}-1">${(0,_utilities_common_js__WEBPACK_IMPORTED_MODULE_1__.upCaseFirst)(eventType.name)}</label>
                            </div>`;

const getOptionsArray = typeOfTrip => {
  const arr = [];
  _mock_mock_js__WEBPACK_IMPORTED_MODULE_3__.allOffers.forEach(offer => offer.type === typeOfTrip ? arr.push(offer) : null);
  return arr;
};

const createEventFormTemplate = newPoint => {
  const dateFrom = newPoint.dateFrom;
  const dateTo = newPoint.dateTo;
  const type = newPoint.type;
  const townName = newPoint.townName;
  const offers = newPoint.offers;
  const basePrice = newPoint.basePrice;
  const pictures = newPoint.pictures;
  const description = newPoint.description;
  const eventTypeName = newPoint.type.name;
  const allOffersOfType = getOptionsArray(type.name);
  return `
      <header class="event__header">
      <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${eventTypeName}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Transfer</legend>
             ${Object.values(_mock_mock_js__WEBPACK_IMPORTED_MODULE_3__.eventTypes).filter(it => it.action === 'to').map(it => createEditEventTypeTemplate(eventTypeName, it)).join('\n')}
        </fieldset>
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Activity</legend>
             ${Object.values(_mock_mock_js__WEBPACK_IMPORTED_MODULE_3__.eventTypes).filter(it => it.action === 'in').map(it => createEditEventTypeTemplate(eventTypeName, it)).join('\n')}
        </fieldset>
      </div>
    </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${eventTypeName} ${type.action} 
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination"
                            value="${townName ? townName : ''}"
                            
                            list="destination-list-1" required>
          <datalist id="destination-list-1">
            ${_mock_mock_js__WEBPACK_IMPORTED_MODULE_3__.townArray.map(it => `<option value="${it}"></option>`).join('\n')}
            <option value="anus"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs__WEBPACK_IMPORTED_MODULE_0___default()(dateFrom).format('DD/MM/YY HH:mm')}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs__WEBPACK_IMPORTED_MODULE_0___default()(dateTo).format('DD/MM/YY HH:mm')}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${allOffersOfType.map(it => createEditEventOfferTemplate(it, offers)).join('\n')}
          </div>
        </section>
      </section>
      ${description || pictures ? `
                    <section class="event__section  event__section--destination">
                      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                      <p class="event__destination-description">${description}</p>
                      ${pictures.length > 0 ? `
                      <div class="event__photos-container">
                        <div class="event__photos-tape">
                          ${pictures.map(src => `<img class="event__photo" src="${src}" alt="">`)}
                        </div>
                      </div>
                      ` : ''}
                    </section>` : ''}`;
};

const createEditEventFormTemplate = newPoint => `<li class="trip-events__item">
                  <form class="event  event--edit" action="#" method="post">
                    ${createEventFormTemplate(newPoint)}
                  </form>
                </li>`;

const createNewEventFormTemplate = newPoint => `<div><form class="trip-events__item event event--edit" action="#" method="post">
                    ${createEventFormTemplate(newPoint)}
                  </form></div>`;

var _newPoint = /*#__PURE__*/new WeakMap();

var _eventTypeToggleHandler = /*#__PURE__*/new WeakMap();

var _eventOfferToggleHandler = /*#__PURE__*/new WeakMap();

var _eventDestinationToggleHandler = /*#__PURE__*/new WeakMap();

var _priceInputHandler = /*#__PURE__*/new WeakMap();

var _toggleFavoriteHandler = /*#__PURE__*/new WeakMap();

var _setInnerHandlers = /*#__PURE__*/new WeakMap();

class SiteEditPointView extends _smart_view_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor(newPoint) {
    super();

    _classPrivateFieldInitSpec(this, _newPoint, {
      writable: true,
      value: null
    });

    _classPrivateFieldInitSpec(this, _eventTypeToggleHandler, {
      writable: true,
      value: evt => {
        const newEventType = _mock_mock_js__WEBPACK_IMPORTED_MODULE_3__.eventTypes.filter(it => it.name === evt.target.value)[0];
        this.updateData({
          type: newEventType,
          offers: [],
          puctures: []
        });
      }
    });

    _classPrivateFieldInitSpec(this, _eventOfferToggleHandler, {
      writable: true,
      value: evt => {
        let updateCheckedOffers = [];

        const index = this._data.offers.findIndex(it => it.title.toLowerCase().replace(/ /g, '-') === evt.target.dataset.offerName);

        if (index >= 0) {
          updateCheckedOffers = [...this._data.offers.slice(0, index), ...this._data.offers.slice(index + 1)];
        } else {
          updateCheckedOffers = this._data.offers.slice();
          updateCheckedOffers.push(this._offers[this._data.eventType].offers.find(it => it.title.toLowerCase().replace(/ /g, '-') === evt.target.dataset.offerName));
        }

        this.updateData({
          offers: updateCheckedOffers
        }, true);
      }
    });

    _classPrivateFieldInitSpec(this, _eventDestinationToggleHandler, {
      writable: true,
      value: evt => {
        this.updateData({
          place: this._destinations[evt.target.value]
        });
      }
    });

    _classPrivateFieldInitSpec(this, _priceInputHandler, {
      writable: true,
      value: evt => {
        evt.preventDefault();
        this.updateData({
          price: evt.target.value
        }, true);
      }
    });

    _classPrivateFieldInitSpec(this, _toggleFavoriteHandler, {
      writable: true,
      value: evt => {
        evt.preventDefault();
        this.updateData({
          isFavorite: !this._data.isFavorite
        });
      }
    });

    _defineProperty(this, "restoreHandlers", () => {
      _classPrivateFieldGet(this, _setInnerHandlers).call(this);

      this.setFormSubmitHandler(this._callback.formSubmit);
      this.setEditClickHandler(this._callback.editClick);
    });

    _classPrivateFieldInitSpec(this, _setInnerHandlers, {
      writable: true,
      value: () => {
        Array.from(this.getElement().querySelectorAll('input[name="event-type"]')).forEach(it => it.addEventListener('click', _classPrivateFieldGet(this, _eventTypeToggleHandler)));
        /*this.element()
          .querySelector(`input[name=event-destination]`)
          .addEventListener(`change`, this.#eventDestinationToggleHandler);
         this.element()
          .querySelector(`.event__input--price`)
          .addEventListener(`input`, this.#priceInputHandler);
         if (!this._data.newEvent) {
          this.element()
            .querySelector(`.event__favorite-btn`)
            .addEventListener(`click`, this.#toggleFavoriteHandler);
        }
         Array.from(this.getElement().querySelectorAll(`.event__offer-checkbox`))
          .forEach((it) => it.addEventListener(`click`, this.#eventOfferToggleHandler));*/
      }
    });

    _classPrivateFieldSet(this, _newPoint, newPoint);

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._editClickHandler = this._editClickHandler.bind(this);
    this._data = SiteEditPointView.parsePointToData(newPoint);

    _classPrivateFieldGet(this, _setInnerHandlers).call(this);
  }

  get template() {
    if (this._data.newEvent) {
      return createNewEventFormTemplate(this._data);
    } else {
      return createEditEventFormTemplate(this._data);
    }
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();

    this._callback.formSubmit(SiteEditPointView.updateData(this._data));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  _editClickHandler(evt) {
    evt.preventDefault();

    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }

  static parsePointToData(point) {
    return Object.assign(point, this._data);
  }

  static updateData(data) {
    data = Object.assign({}, data);
    return data;
  }

}

/***/ }),

/***/ "./src/view/site-filter-view.js":
/*!**************************************!*\
  !*** ./src/view/site-filter-view.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SiteFilterView": () => (/* binding */ SiteFilterView)
/* harmony export */ });
/* harmony import */ var _abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-view.js */ "./src/view/abstract-view.js");
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }



const createSiteFilterTemplate = () => '<div class="trip-main__trip-controls  trip-controls">\
            <div class="trip-controls__navigation">\
              <h2 class="visually-hidden">Switch trip view</h2>\
              <nav class="trip-controls__trip-tabs  trip-tabs">\
                <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>\
                <a class="trip-tabs__btn" href="#">Stats</a>\
              </nav>\
            </div>\
            \
            <div class="trip-controls__filters">\
              <h2 class="visually-hidden">Filter events</h2>\
              <form class="trip-filters" action="#" method="get">\
                <div class="trip-filters__filter">\
                  <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" />\
                  <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\
                </div>\
                \
                <div class="trip-filters__filter">\
                  <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future" />\
                  <label class="trip-filters__filter-label" for="filter-future">Future</label>\
                </div>\
                \
                <div class="trip-filters__filter">\
                  <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" checked />\
                  <label class="trip-filters__filter-label" for="filter-past">Past</label>\
                </div>\
                \
                <button class="visually-hidden" type="submit">Accept filter</button>\
              </form>\
            </div>\
    </div>';

var _element = /*#__PURE__*/new WeakMap();

class SiteFilterView extends _abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(...args) {
    super(...args);

    _classPrivateFieldInitSpec(this, _element, {
      writable: true,
      value: null
    });
  }

  get template() {
    return createSiteFilterTemplate();
  }

}

/***/ }),

/***/ "./src/view/site-list-sort-view.js":
/*!*****************************************!*\
  !*** ./src/view/site-list-sort-view.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SiteSortView": () => (/* binding */ SiteSortView)
/* harmony export */ });
/* harmony import */ var _abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-view.js */ "./src/view/abstract-view.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../const.js */ "./src/const.js");
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }




const createListSortTemplate = () => `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
<div class="trip-sort__item  trip-sort__item--day">
  <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" data-sort-type="${_const_js__WEBPACK_IMPORTED_MODULE_1__.SortType.DEFAULT}">
  <label class="trip-sort__btn" for="sort-day">Day</label>
</div>

<div class="trip-sort__item  trip-sort__item--event">
  <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
  <label class="trip-sort__btn" for="sort-event">Event</label>
</div>

<div class="trip-sort__item  trip-sort__item--time">
  <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" data-sort-type="${_const_js__WEBPACK_IMPORTED_MODULE_1__.SortType.TIME}">
  <label class="trip-sort__btn" for="sort-time">Time</label>
</div>

<div class="trip-sort__item  trip-sort__item--price">
  <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" data-sort-type="${_const_js__WEBPACK_IMPORTED_MODULE_1__.SortType.PRICE}">
  <label class="trip-sort__btn" for="sort-price">Price</label>
</div>

<div class="trip-sort__item  trip-sort__item--offer">
  <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
  <label class="trip-sort__btn" for="sort-offer">Offers</label>
</div>
</form>`;

var _sortTypeChangeHandler = /*#__PURE__*/new WeakMap();

class SiteSortView extends _abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "setSortTypeChangeHandler", callback => {
      this._callback.sortTypeChange = callback;
      this.element.addEventListener('input', _classPrivateFieldGet(this, _sortTypeChangeHandler));
    });

    _classPrivateFieldInitSpec(this, _sortTypeChangeHandler, {
      writable: true,
      value: event => {
        if (event.target.tagName !== 'INPUT') {
          return;
        }

        event.preventDefault();

        this._callback.sortTypeChange(event.target.dataset.sortType);
      }
    });
  }

  get template() {
    return createListSortTemplate();
  }

}

/***/ }),

/***/ "./src/view/site-no-point-view.js":
/*!****************************************!*\
  !*** ./src/view/site-no-point-view.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SiteNoPointView": () => (/* binding */ SiteNoPointView)
/* harmony export */ });
/* harmony import */ var _abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-view.js */ "./src/view/abstract-view.js");
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }



const createNoPointTemplate = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

var _newPoint = /*#__PURE__*/new WeakMap();

class SiteNoPointView extends _abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(newPoint) {
    super();

    _classPrivateFieldInitSpec(this, _newPoint, {
      writable: true,
      value: null
    });

    _classPrivateFieldSet(this, _newPoint, newPoint);
  }

  get template() {
    return createNoPointTemplate(_classPrivateFieldGet(this, _newPoint));
  }

}

/***/ }),

/***/ "./src/view/site-point-view.js":
/*!*************************************!*\
  !*** ./src/view/site-point-view.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SitePointView": () => (/* binding */ SitePointView)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _abstract_view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract-view.js */ "./src/view/abstract-view.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }




const createOffersTemplate = offers => {
  let offersElement = '';

  for (let i = 0; i < offers.length; i++) {
    offersElement += `<li class="event__offer">
        <span class="event__offer-title">${offers[i].option}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offers[i].price}</span>
      </li>`;
  }

  return offersElement;
};

const favoriteCheck = isFavorite => {
  let favoriteActiveClass = '';

  if (isFavorite) {
    favoriteActiveClass = 'event__favorite-btn--active';
  }

  return favoriteActiveClass;
};

const createSiteListContentTemplate = newPoint => {
  const dateFrom = newPoint.dateFrom;
  const dateTo = newPoint.dateTo;
  const type = newPoint.type;
  const townName = newPoint.townName;
  const tripDuration = newPoint.tripDuration;
  const offers = newPoint.offers;
  const isFavorite = newPoint.isFavorite;
  const basePrice = newPoint.basePrice;
  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="2019-03-18">${dayjs__WEBPACK_IMPORTED_MODULE_0___default()(dateFrom).format('MMM, DD')}</time> 
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="${type.iconURL}" alt="Event type icon"/>
                </div>
                <h3 class="event__title">${type.name} ${townName}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="2019-03-18T12:25">${dayjs__WEBPACK_IMPORTED_MODULE_0___default()(dateFrom).format('HH')}:${dayjs__WEBPACK_IMPORTED_MODULE_0___default()(dateFrom).format('mm')}</time>
                    &mdash;
                    <time class="event__end-time" datetime="2019-03-18T13:35">${dayjs__WEBPACK_IMPORTED_MODULE_0___default()(dateTo).format('HH')}:${dayjs__WEBPACK_IMPORTED_MODULE_0___default()(dateTo).format('mm')}</time>
                  </p>
                  <p class="event__duration">${dayjs__WEBPACK_IMPORTED_MODULE_0___default()(tripDuration).format('HH')}H ${dayjs__WEBPACK_IMPORTED_MODULE_0___default()(tripDuration).format('mm')}M</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  ${createOffersTemplate(offers)}
                </ul>
                <button class="event__favorite-btn ${favoriteCheck(isFavorite)}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
};

var _newPoint = /*#__PURE__*/new WeakMap();

var _editClickHandler = /*#__PURE__*/new WeakMap();

var _favoriteClickHandler = /*#__PURE__*/new WeakMap();

class SitePointView extends _abstract_view_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(newPoint) {
    super();

    _classPrivateFieldInitSpec(this, _newPoint, {
      writable: true,
      value: null
    });

    _defineProperty(this, "setEditClickHandler", callback => {
      this._callback.editClick = callback;
      this.element.querySelector('.event__rollup-btn').addEventListener('click', _classPrivateFieldGet(this, _editClickHandler));
    });

    _classPrivateFieldInitSpec(this, _editClickHandler, {
      writable: true,
      value: event => {
        event.preventDefault();

        this._callback.editClick();
      }
    });

    _defineProperty(this, "setFavoriteClickHandler", callback => {
      this._callback.favoriteClick = callback;
      this.element.querySelector('.event__favorite-btn').addEventListener('click', _classPrivateFieldGet(this, _favoriteClickHandler));
    });

    _classPrivateFieldInitSpec(this, _favoriteClickHandler, {
      writable: true,
      value: evt => {
        evt.preventDefault();

        this._callback.favoriteClick();
      }
    });

    _classPrivateFieldSet(this, _newPoint, newPoint);
  }

  get template() {
    return createSiteListContentTemplate(_classPrivateFieldGet(this, _newPoint));
  }

}

/***/ }),

/***/ "./src/view/site-tab-view.js":
/*!***********************************!*\
  !*** ./src/view/site-tab-view.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SiteTabView": () => (/* binding */ SiteTabView)
/* harmony export */ });
/* harmony import */ var _abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-view.js */ "./src/view/abstract-view.js");


const createSiteTabTemplate = () => '<section class="trip-main__trip-in  fo  trip-info">\
  <div class="trip-info__main">\
    <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>\
    <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>\
  </div>\
  <p class="trip-info__cost">\
    Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>\
  </p>\
</section>';

class SiteTabView extends _abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  get template() {
    return createSiteTabTemplate();
  }

}

/***/ }),

/***/ "./src/view/smart-view.js":
/*!********************************!*\
  !*** ./src/view/smart-view.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Smart)
/* harmony export */ });
/* harmony import */ var _abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-view.js */ "./src/view/abstract-view.js");

class Smart extends _abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    this._data = {};
  }

  updateData(update, justDataUpdating) {
    if (!update) {
      return;
    }

    this._data = Object.assign({}, this._data, update);

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    let prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();
    const newElement = this.getElement();
    parent.replaceChild(newElement, prevElement);
    prevElement = null;
    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }

}

/***/ }),

/***/ "./node_modules/dayjs/dayjs.min.js":
/*!*****************************************!*\
  !*** ./node_modules/dayjs/dayjs.min.js ***!
  \*****************************************/
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",$="Invalid Date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},D="en",v={};v[D]=M;var p=function(t){return t instanceof _},S=function(t,e,n){var r;if(!t)return D;if("string"==typeof t)v[t]&&(r=t),e&&(v[t]=e,r=t);else{var i=t.name;v[i]=t,r=i}return!n&&r&&(D=r),r||!n&&D},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=g;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t)}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(l);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return O},m.isValid=function(){return!(this.$d.toString()===$)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),$=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},l=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case c:return r?$(1,0):$(31,11);case f:return r?$(1,M):$(0,M+1);case o:var D=this.$locale().weekStart||0,v=(y<D?y+7:y)-D;return $(r?m-v:m+(6-v),M);case a:case d:return l(g+"Hours",0);case u:return l(g+"Minutes",1);case s:return l(g+"Seconds",2);case i:return l(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),$=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],l=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[$](l),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,$=this;r=Number(r);var l=O.p(h),y=function(t){var e=w($);return O.w(e.date(e.date()+Math.round(t*r)),$)};if(l===f)return this.set(f,this.$M+r);if(l===c)return this.set(c,this.$y+r);if(l===a)return y(1);if(l===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[l]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||$;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].substr(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||l[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,$){var l,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,g=this-M,D=O.m(this,M);return D=(l={},l[c]=D/12,l[f]=D,l[h]=D/3,l[o]=(g-m)/6048e5,l[a]=(g-m)/864e5,l[u]=g/n,l[s]=g/e,l[i]=g/t,l)[y]||g,$?D:O.a(D)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return v[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),b=_.prototype;return w.prototype=b,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){b[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=v[D],w.Ls=v,w.p={},w}));

/***/ }),

/***/ "./node_modules/nanoid/index.dev.js":
/*!******************************************!*\
  !*** ./node_modules/nanoid/index.dev.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "customAlphabet": () => (/* binding */ customAlphabet),
/* harmony export */   "customRandom": () => (/* binding */ customRandom),
/* harmony export */   "nanoid": () => (/* binding */ nanoid),
/* harmony export */   "random": () => (/* binding */ random),
/* harmony export */   "urlAlphabet": () => (/* reexport safe */ _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__.urlAlphabet)
/* harmony export */ });
/* harmony import */ var _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./url-alphabet/index.js */ "./node_modules/nanoid/url-alphabet/index.js");

if (true) {
  if (
    typeof navigator !== 'undefined' &&
    navigator.product === 'ReactNative' &&
    typeof crypto === 'undefined'
  ) {
    throw new Error(
      'React Native does not have a built-in secure random generator. ' +
        'If you don’t need unpredictable IDs use `nanoid/non-secure`. ' +
        'For secure IDs, import `react-native-get-random-values` ' +
        'before Nano ID.'
    )
  }
  if (typeof msCrypto !== 'undefined' && typeof crypto === 'undefined') {
    throw new Error(
      'Import file with `if (!window.crypto) window.crypto = window.msCrypto`' +
        ' before importing Nano ID to fix IE 11 support'
    )
  }
  if (typeof crypto === 'undefined') {
    throw new Error(
      'Your browser does not have secure random generator. ' +
        'If you don’t need unpredictable IDs, you can use nanoid/non-secure.'
    )
  }
}
let random = bytes => crypto.getRandomValues(new Uint8Array(bytes))
let customRandom = (alphabet, size, getRandom) => {
  let mask = (2 << (Math.log(alphabet.length - 1) / Math.LN2)) - 1
  let step = -~((1.6 * mask * size) / alphabet.length)
  return () => {
    let id = ''
    while (true) {
      let bytes = getRandom(step)
      let j = step
      while (j--) {
        id += alphabet[bytes[j] & mask] || ''
        if (id.length === size) return id
      }
    }
  }
}
let customAlphabet = (alphabet, size) => customRandom(alphabet, size, random)
let nanoid = (size = 21) => {
  let id = ''
  let bytes = crypto.getRandomValues(new Uint8Array(size))
  while (size--) {
    let byte = bytes[size] & 63
    if (byte < 36) {
      id += byte.toString(36)
    } else if (byte < 62) {
      id += (byte - 26).toString(36).toUpperCase()
    } else if (byte < 63) {
      id += '_'
    } else {
      id += '-'
    }
  }
  return id
}



/***/ }),

/***/ "./node_modules/nanoid/url-alphabet/index.js":
/*!***************************************************!*\
  !*** ./node_modules/nanoid/url-alphabet/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "urlAlphabet": () => (/* binding */ urlAlphabet)
/* harmony export */ });
let urlAlphabet =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render.js */ "./src/render.js");
/* harmony import */ var _view_site_tab_view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view/site-tab-view.js */ "./src/view/site-tab-view.js");
/* harmony import */ var _view_site_filter_view_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view/site-filter-view.js */ "./src/view/site-filter-view.js");
/* harmony import */ var _presenter_trip_presenter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./presenter/trip-presenter.js */ "./src/presenter/trip-presenter.js");
/* harmony import */ var _mock_mock_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mock/mock.js */ "./src/mock/mock.js");





 // import {SiteNewPointTemplate} from './view/site-new-point-view.js';

const pointsCount = 10;
const mocksArray = [];

for (let i = 0; i < pointsCount; i++) {
  mocksArray.push((0,_mock_mock_js__WEBPACK_IMPORTED_MODULE_4__.generatePoint)());
}

const tripMainElement = document.querySelector('.trip-main');
const tripFiltersElement = document.querySelector('.trip-controls__filters');
const tripListElement = document.querySelector('.trip-events__list');
const tripPresenter = new _presenter_trip_presenter_js__WEBPACK_IMPORTED_MODULE_3__.TripPresenter(tripListElement);
(0,_render_js__WEBPACK_IMPORTED_MODULE_0__.render)(tripMainElement, new _view_site_tab_view_js__WEBPACK_IMPORTED_MODULE_1__.SiteTabView().element, _render_js__WEBPACK_IMPORTED_MODULE_0__.RenderPosition.AFTERBEGIN);
(0,_render_js__WEBPACK_IMPORTED_MODULE_0__.render)(tripFiltersElement, new _view_site_filter_view_js__WEBPACK_IMPORTED_MODULE_2__.SiteFilterView().element, _render_js__WEBPACK_IMPORTED_MODULE_0__.RenderPosition.BEFOREEND);
tripPresenter.init(mocksArray);
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map