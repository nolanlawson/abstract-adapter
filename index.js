'use strict';

var utils = require('pouchdb').utils;
var LevelPouch = require('./levelAdapter.js');

module.exports = function (leveldown) {

  function AbstractAdapter(opts, callback) {
    opts = utils.extend({
      db: leveldown
    }, opts);

    LevelPouch.call(this, opts, callback);
  }

  // overrides for normal LevelDB behavior on Node
  AbstractAdapter.valid = function () {
    return leveldown.valid();
  };
  AbstractAdapter.use_prefix = leveldown.usePrefix;

  AbstractAdapter.destroy = utils.toPromise(function (name, opts, callback) {
    if (typeof opts === 'function') {
      callback = opts;
      opts = {};
    }
    opts = utils.extend({
      db: leveldown
    }, opts);

    return LevelPouch.destroy(name, opts, callback);
  });
  AbstractAdapter.adapterName = leveldown.adapterName;
  AbstractAdapter.needsMigration = false;
  return AbstractAdapter;
};

