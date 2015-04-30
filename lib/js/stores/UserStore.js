var Reflux = require('reflux');
var UserActions = require('../actions/UserActions');
var $ig = require('../services/instagramAdapter');
var _ = require('underscore');
var Q = require("q");
var Parse = require("parse").Parse;

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
      .then(this.retrieveUserData)
      .fail((err) => {
        console.error("UserStore", err);
      });
  },
  retrieveUserData(newData) {
    var newUser = _.extend(this._currentUser, newData);
    this.getUser(newData).then((user) => {
      this.trigger("existingUser", user);
    }).fail( (user) => {
      this.trigger("newUser", newUser );
    });
  },
  logout() {
    this._currentUser = {};
    this.trigger("loggedOut", this._currentUser);
  },
  signinUser(userData) {
    Parse.User.logIn(userData.username, userData.password , {
      success: (user) => {
        this.trigger("authSuccessful", userData);
      },
      error: (user, error) => {
        this.trigger("authFailure", error);
      }
    });
  },
  signupUser(userData) {
    var user = new Parse.User();
    user.set("username", userData.username);
    user.set("password", userData.password);
    // user.set("email", "email@example.com");
    user.signUp(null, {
      success: (user) => {
        this.trigger("authSuccessful", userData);
      },
      error: (user, error) => {
        this.trigger("authFailure", user);
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
      }
    });
  },
  getUser(userData) {
    var deferred = Q.defer();
    var query = new Parse.Query(Parse.User);
    query.equalTo("username", userData.username);  // find all the women
    query.find({
      success: (user) => {
        if (!user[0]) return deferred.reject(null);
        this._currentUser = userData;
        deferred.resolve(this._currentUser);
      },
      error: (error) => {
        deferred.reject(error);
      }
    });
    return deferred.promise;
  }
});

module.exports = UserStore;
