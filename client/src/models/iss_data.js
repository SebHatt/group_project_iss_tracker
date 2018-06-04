const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const ISSData = function(url) {
    this.url = url;
}

ISSData.prototype.getData = function () {
  fetch(this.url)
    .then(res => res.json())
    .then(data => PubSub.publish('ISSData:data-ready', data));
};

module.exports = ISSData;
