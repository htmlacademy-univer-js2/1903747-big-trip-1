const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

import {createSiteTabTemplate} from './view/site-tab-view.js';
import {createSiteFilterTemplate} from './view/site-filter-view.js';
import {listSortTemplate} from './view/site-list-sort-view.js';
const sortElement = new listSortTemplate().getSortDom;
import {createSiteListContentTemplate} from './view/site-list-content-view.js';

//import {createSiteNewPointTemplate} from './view/site-new-point-view.js';
import {createSiteEditPointTemplate} from './view/site-edit-point-view.js';

const tripTab = document.querySelector('.trip-main');
const tripFilters = document.querySelector('.trip-controls__filters');
const tripList = document.querySelector('.trip-events');


import {tripPoint, generatePoint} from './mock/mock.js';

const mockArray = [];
for (let i = 0; i < 15; i++) {
  mockArray.push(new tripPoint(generatePoint()));
}

renderTemplate(tripTab, createSiteTabTemplate(), 'afterbegin');
renderTemplate(tripFilters, createSiteFilterTemplate(), 'beforeend');
renderTemplate(tripList, createSiteEditPointTemplate(mockArray[0]), 'afterbegin');
renderTemplate(tripList, sortElement, 'afterbegin');

//renderTemplate(tripList, createSiteNewPointTemplate(generatePoint()), 'afterbegin');


for (let i = 0; i < mockArray.length; i++) {
  const listContent = new createSiteListContentTemplate(mockArray[i]).getContentList;
  renderTemplate(tripList, listContent, 'beforeend');
}
