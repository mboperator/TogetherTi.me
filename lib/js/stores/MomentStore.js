var Reflux = require('reflux');
var Parse = require('parse').Parse;
var $m = require('moment');

Parse.initialize('la5GYZqoRYLTVY4L97BwwmpL4hPRIANHVQDTgNnG', 'H7B6N4vEPKlEWR9Ud1xuWSBCG7VL5iEgxtppUlIl');

var MomentActions = require('../actions/MomentActions');
var _ = require('underscore');

function sanitize(moment) {
  moment.startDate = moment.startDate && $m(moment.startDate.iso).unix();
  moment.endDate = moment.endDate && $m(moment.endDate.iso).unix();
  return moment;
}

var MomentStore = Reflux.createStore({
  moments: {},
  listenables: MomentActions,
  init() {
    this.moments['default'] = [];
  },
  pullMoments() {
    var query = (new Parse.Query('Moment')).ascending('createdAt');
    query.find({
      success: this.setMoments,
      error: ((err) => {
        console.log("ERROR|MomentStore::pullMoments", err);
      })
    });
  },
  setMoment(moment, trigger) {
    // TODO: Account for userIDs instead of using default
    this.moments['default'].push(sanitize(moment));
    trigger && this.trigger("objectCreated", this.moments['default']);
  },
  setMoments(moments) {
    // Clears array on every update
    this.moments['default'] = [];

    moments.forEach((moment) => {
      this.setMoment(moment.toJSON(), false);
    });
    this.trigger("objectsCreated", this.moments['default']);
  },
  getMoment(name) {
    var moment = _(this.moments['default']).findWhere({name: name});
    return moment || {};
  },
  update(moment) {
    debugger;
  }
});

module.exports = MomentStore;
