var Reflux = require('reflux');

var UserActions = Reflux.createActions([
  "set",
  "update",
  "logout",
  "beginAuth",
  "endAuth",
  "signinUser",
  "signupUser"
]);

module.exports = UserActions;
