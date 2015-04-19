var Reflux = require('reflux');
var MomentActions = require('../actions/MomentActions');
var _ = require('underscore');

var MomentStore = Reflux.createStore({
  moments: [],
  listenables: MomentActions,
  init() {

  }
});

module.exports = MomentStore;
