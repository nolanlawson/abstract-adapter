'use strict';

var PouchDB = require('pouchdb');
var LevelPouch = PouchDB.adapters.leveldb;
var utils = PouchDB.utils;

function AbstractAdapter(opts, callback) {
  var _opts = utils.extend({
    db: leveldown
  }, opts);

  LevelPouch.call(this, _opts, callback);
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
  var _opts = utils.extend({
    db: leveldown
  }, opts);

  return LevelPouch.destroy(name, _opts, callback);
});
AbstractAdapter.adapterName = leveldown.adapterName;

module.exports = AbstractAdapter;
