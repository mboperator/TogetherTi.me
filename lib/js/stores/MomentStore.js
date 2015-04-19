var Reflux = require('reflux');
var Parse = require('parse').Parse;
Parse.initialize('la5GYZqoRYLTVY4L97BwwmpL4hPRIANHVQDTgNnG', 'H7B6N4vEPKlEWR9Ud1xuWSBCG7VL5iEgxtppUlIl');

var MomentActions = require('../actions/MomentActions');
var _ = require('underscore');


var MomentStore = Reflux.createStore({
  moments: {},
  listenables: MomentActions,
  init() {
    this.moments['default'] = [];
  },
  pullMoments() {
    var query = (new Parse.Query('Moment')).ascending('createdAt');
    query.find({
      success: this.createMoments,
      error: ((err) => {
        console.log("ERROR|MomentStore::pullMoments", err);
      })
    });
  },
  createMoment(moment, trigger) {
    // TODO: Account for userIDs instead of using default
    this.moments['default'].push(moment);
    trigger && this.trigger("objectCreated", this.moments['default']);
  },
  createMoments(moments) {
    // Clears array on every update
    this.moments['default'] = [];

    moments.forEach((moment) => {
      this.createMoment(moment.toJSON(), false);
    });
    this.trigger("objectsCreated", this.moments['default']);
  }
});

module.exports = MomentStore;
