var Reflux = require('reflux');
var Parse = require('../services/parseAdapter');
var ParseMoment = require('../classes/moment');

var $m = require('moment');

var MomentActions = require('../actions/MomentActions');
var _ = require('underscore');

function serialize(moment) {
  var formatted = {
    startDate: $m(moment.startDate).toDate(),
    endDate: $m(moment.endDate).toDate(),
    name: moment.name,
    participants: moment.participants
  };
  return formatted;
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
    this.moments['default'].push(moment);
    trigger && this.trigger("objectCreated", this.getMoments());
  },
  setMoments(moments) {
    // Clears array on every update
    this.moments['default'] = [];

    moments.forEach((moment) => {
      this.setMoment(moment, false);
    });
    this.trigger("objectsCreated", this.getMoments());
  },
  getMoment(objectId) {
    var moment = _(this.moments['default']).findWhere({id: objectId});
    return moment && moment.toJSON() || {};
  },
  getMoments() {
    return this.moments['default'].map((moment) => {
      return moment.toJSON();
    });
  },
  create(moment) {
    var obj = new ParseMoment();
    obj.save(serialize(moment), {
      success: ((result) => {
        this.setMoment(result, true);
      }),
      error: (console.log)
    });
  },
  update(moment) {
    debugger;
  }
});

module.exports = MomentStore;
