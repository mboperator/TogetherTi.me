var Reflux = require('reflux');
var MediaActions = require('../actions/MediaActions');
var $ig = require('../services/instagramAdapter');
var _ = require('underscore');
var q = require('q');
var $m = require('moment');

var emptyMedia = {
  creator: "",
  caption: "",
  imageUrl: "media.images.standard_resolution.url",
  createdAt: "",
  friends: [""],
  raw: {}
};

function sanitize(object) {
  var formattedObject = {
    caption: object.caption && object.caption.text,
    creator: object.caption && object.caption.from.username,
    imageUrl: object.images && object.images.standard_resolution.url,
    raw: object
  };
  return formattedObject;
}

var MediaStore = Reflux.createStore({
  media: {},
  listenables: MediaActions,
  // Repeated parameters - code smell
  pullMediaForUser(handle, min_timestamp, max_timestamp) {
    this.media[handle] = [];
    min_timestamp = min_timestamp && $m(min_timestamp.iso).unix();
    max_timestamp = max_timestamp && $m(max_timestamp.iso).unix();
    //Instagram
    return $ig.retrieveUserFeed({handle, min_timestamp, max_timestamp})
              .then((data) => {
                this.media[handle] = data && data.map(sanitize) || [];
                this.trigger("mediaPulled", this.allMedia());
              })
              .fail((err) => {
                console.error("Err", err);
              });
  },
  // Repeated parameters - code smell
  pullMediaForUsers(userArray, min_timestamp, max_timestamp) {
    userArray = ['mboprtr', 'schoolboyaustin'];
    var promises = userArray.map((handle) => {
      return this.pullMediaForUser(handle, min_timestamp, max_timestamp);
    });
    q.all(promises)
      .then((results) => {
        this.trigger("mediaPulled", this.allMedia());
      })
      .fail((err) => {
        console.log("Error in MediaStore", err);
      });
  },
  pullMediaForMoment(moment) {
    this.pullMediaForUsers(moment.participants, moment.startDate, moment.endDate);
  },
  allMedia() {
    var accumulator = [];
    Object.keys(this.media).forEach((key) => {
      accumulator = accumulator.concat(this.media[key]);
    });
    return accumulator;
  }
});

module.exports = MediaStore;
