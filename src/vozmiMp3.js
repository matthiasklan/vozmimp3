var scraperjs = require('scraperjs'),
  Promise = require('bluebird'),
  _ = require('lodash');

module.exports = {

  queryVozmiMp3: function(data) {
    var err = null;
    var sort = data.sort || {};
    var limit = data.limit || 20;

    return new Promise(function(resolve, reject) {

      if (!data.q) {
        err = new Error('no query string provided');
        err.status = 400;
        reject(err);
      }

      if (!parseInt(limit)) {
        err = new Error('wrong limit provided, use integer');
        err.status = 400;
        reject(err);
      }

      const transformSearchString = function(searchString) {
        return searchString.replace(/ /g, '+');
      };

      scraperjs.StaticScraper.create('http://vozmimp3.com/?string=' + transformSearchString(data.q))
        .scrape(function($) {
          return $('.audio > li').map(function() {
            return {
              title: $(this).find('span').text(),
              duration: parseFloat($(this).find('.t').text().replace(':', '.')),
              link: 'http://vozmimp3.com' + $(this).find('.dl').attr('href')
            };
          }).get();
        }).then(function(result) {
          if (!data.allowNoResults && result.length === 0) {
              err = new Error('nothing found');
              err.status = 404;
              reject(err);
          }
          result = _.orderBy(result, sort.keys || ['title'], sort.order || ['asc']);
          resolve(result.slice(0, limit));
        });
    });
  },

  getPlaylist: function(data) {

    if (!data.list) {
      err = new Error('no list array provided');
      err.status = 400;
      return Promise.reject(err);
    }

    var sort = null;
    if (data.strategy === 'longestDuration') {
      sort = {
        "keys": ["duration"],
        "order": ["desc"]
      };
    }

    var ctx = this;
    return data.list.map(function(el, i, all) {
      return ctx.queryVozmiMp3({q: el, limit: 1, sort: sort, allowNoResults: true}).then(function(res) {
        if (res.length === 0) {
          return {
            "notFound": el + " not found"
          };
        } else {
          return res[0];
        }
      });
    });
  }

};
