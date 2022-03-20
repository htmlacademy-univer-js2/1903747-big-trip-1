const renderTemplate = (container, template, place) => {
    container.inserAdjacentHTML(place, template);
}

import {createSiteTabTemplate} from './view/site-tab-view.js';

const tripTab = document.querySelector('.trip-main');

renderTemplate(tripTab, createSiteTabTemplate(), 'afterbegin')