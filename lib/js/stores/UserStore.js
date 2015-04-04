var Reflux = require('reflux');
var UserActions = require('../actions/UserActions');
var $ig = require('../services/instagramAdapter');
var _ = require('underscore');

var UserStore = Reflux.createStore({
  _currentUser: {},
  listenables: UserActions,
  init() {
    $ig.init();
  },
  beginAuth() {
    $ig.beginAuth();
  },
  endAuth(token) {
    localStorage.setItem('instagram_access_token', token);
    $ig.endAuth();
    $ig.retrieveUserData()
      .then(this.update);
  },
  update(newData) {
    _.extend(this._currentUser, newData);
    this.trigger("userUpdated", this._currentUser);
  },
  logout() {
    this._currentUser = {};
    this.trigger("loggedOut", this._currentUser);
  }
});

module.exports = UserStore;
