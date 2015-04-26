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
      .then(this.update)
      .fail((err) => {
        console.error("UserStore", err);
      });
  },
  update(newData) {
    _.extend(this._currentUser, newData);


    //check if user is in parse

    //if user is in parse, log in
    this.trigger("existingUser", this._currentUser);

    //else
    // this.trigger("newUser", this._currentUser);
  },
  logout() {
    this._currentUser = {};
    this.trigger("loggedOut", this._currentUser);
  }
});

module.exports = UserStore;
