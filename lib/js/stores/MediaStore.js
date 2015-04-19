var Reflux = require('reflux');
var MediaActions = require('../actions/MediaActions');
var $ig = require('../services/instagramAdapter');
var _ = require('underscore');

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
  pullMedia(userId) {
    this.media[userId] = [];
    //Instagram
    $ig.retrieveUserFeed(userId)
      .then((data) => {
        this.media[userId] = data && data.map(sanitize) || [];
        this.trigger("mediaPulled", this.allMedia());
      })
      .fail((err) => {
        console.error("Err", err);
      });
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
