'use strict';

var PouchDB = require('pouchdb');
var LevelPouch = PouchDB.adapters.leveldb;
var toPromise = require('pouchdb-topromise');
var extend = require('pouchdb-extend');

function AbstractAdapterFactory(leveldown) {

  function AbstractAdapter(opts, callback) {
    opts = extend({
      db: leveldown
    }, opts);

    LevelPouch.call(this, opts, callback);
  }

  // overrides for normal LevelDB behavior on Node
  AbstractAdapter.valid = function () {
    return leveldown.valid();
  };
  AbstractAdapter.use_prefix = leveldown.usePrefix;

  AbstractAdapter.destroy = toPromise(function (name, opts, callback) {
    if (typeof opts === 'function') {
      callback = opts;
      opts = {};
    }
    var _opts = extend({
      db: leveldown
    }, opts);

    return LevelPouch.destroy(name, _opts, callback);
  });
  AbstractAdapter.adapterName = leveldown.adapterName;
  AbstractAdapter.needsMigration = false;
  return AbstractAdapter;
}

module.exports = AbstractAdapterFactory;
