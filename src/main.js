const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

import {createSiteTabTemplate} from './view/site-tab-view.js';
import {createSiteFilterTemplate} from './view/site-filter-view.js';
import {createSiteListTemplate} from './view/site-list-view.js';
import {createSiteListContentTemplate} from './view/site-list-content-view.js';

const tripTab = document.querySelector('.trip-main');
const tripFilters = document.querySelector('.trip-controls__filters');
const tripList = document.querySelector('.trip-events');
const tripListContent = document.querySelector('.trip-events');

renderTemplate(tripTab, createSiteTabTemplate(), 'afterbegin');
renderTemplate(tripFilters, createSiteFilterTemplate(), 'beforeend');
renderTemplate(tripList, createSiteListTemplate(), 'beforeend');
renderTemplate(tripListContent, createSiteListContentTemplate(), 'beforeend');
