const PubSub = require('../helpers/pub_sub.js');

const GeoDataView = function (container) {
  this.container = container;
};

GeoDataView.prototype.bindEvents = function () {
  PubSub.subscribe('GeoData:data-ready', (evt) => {

    if (evt.detail.query) {
      const randomWikiPage = this.returnRandomWikiPage(evt.detail.query.pages);

      this.render(randomWikiPage);
    } else {
      this.renderEmptyQuery();
    }

  });
};

GeoDataView.prototype.returnRandomWikiPage = function (data) {
  const keys = Object.keys(data);

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  };

  const randomIdx = getRandomInt(keys.length);
  return data[keys[randomIdx]];
};

GeoDataView.prototype.render = function (wikiPage) {
  this.clearContainer();

    this.createHTMLElement('h2', 'whats-there', "What's there?", this.container);

    const innerGeoData = document.createElement('div');
    innerGeoData.id = 'inner-geo-data';
    this.container.appendChild(innerGeoData);

    const passTimes = document.querySelector('#pass-times');

  if (wikiPage.thumbnail) {
    this.createHTMLElement('img', 'thumbnail', wikiPage.thumbnail.source, passTimes);
  }

  const innerDiv = document.createElement('div');
  innerGeoData.appendChild(innerDiv);

  this.createHTMLElement('h2', 'wiki-page-title', wikiPage.title, innerDiv);
  this.createHTMLElement('p', 'wiki-page-extract', wikiPage.extract, innerDiv);

};

GeoDataView.prototype.renderEmptyQuery = function () {
  this.clearContainer();

  this.createHTMLElement('img', 'dragon-icon', '/images/dragon.png', document.querySelector('#pass-times'));
  this.createHTMLElement('h2', 'wiki-page', "Here be dragons!", this.container)

};

GeoDataView.prototype.createHTMLElement = function(type, id, text, parentContainer) {
  const htmlElement = document.createElement(type);
  htmlElement.id = id;

  if (type === 'img') {
  htmlElement.src = text;
} else {
  htmlElement.textContent = text;
}

  parentContainer.appendChild(htmlElement);
};

GeoDataView.prototype.clearContainer = function() {
  this.container.innerHTML = '';
};


module.exports = GeoDataView;
