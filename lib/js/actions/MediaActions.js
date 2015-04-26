var Reflux = require('reflux');

var MediaActions = Reflux.createActions([
  "pullMediaForUser",
  "pullMediaForUsers",
  "pullMediaForMoment"
]);

module.exports = MediaActions;
