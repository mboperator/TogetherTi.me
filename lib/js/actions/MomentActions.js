var Reflux = require('reflux');

var MomentActions = Reflux.createActions([
  "pullMoments",
  "create",
  "remove"
]);

module.exports = MomentActions;
