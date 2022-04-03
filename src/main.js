const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

import {createSiteTabTemplate} from './view/site-tab-view.js';
import {createSiteFilterTemplate} from './view/site-filter-view.js';
import {createSiteListSortTemplate} from './view/site-list-sort-view.js';
import {createSiteListContentTemplate} from './view/site-list-content-view.js';
import {createSiteNewPointTemplate} from './view/site-new-point-view.js';
import {createSiteEditPointTemplate} from './view/site-edit-point-view.js';

const tripTab = document.querySelector('.trip-main');
const tripFilters = document.querySelector('.trip-controls__filters');
const tripList = document.querySelector('.trip-events');


import {generatePoint} from './mock/mock.js';

let mockArray = []
for (let i = 0; i < 15; i++) {
  mockArray.push(generatePoint());
}
console.log(mockArray); 

renderTemplate(tripTab, createSiteTabTemplate(), 'afterbegin');
renderTemplate(tripFilters, createSiteFilterTemplate(), 'beforeend');
renderTemplate(tripList, createSiteEditPointTemplate(mockArray[0]), 'afterbegin');
renderTemplate(tripList, createSiteListSortTemplate(), 'afterbegin');

//renderTemplate(tripList, createSiteNewPointTemplate(generatePoint()), 'afterbegin');


for (let i = 0; i < mockArray.length; i++) {
  renderTemplate(tripList, createSiteListContentTemplate(mockArray[i]), 'beforeend');
}
