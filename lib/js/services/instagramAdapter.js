var $agent = require('superagent');
var $ig = require('instajam');
var $q = require('q');

var creds = {
  clientId: "adff0a836bf1413a9b2fdf1dd1ab613a",
  redirectUri: encodeURIComponent("http://localhost:7070/#/auth/"),
  scope: ['basic', 'comments']
};

var instagramAdapter = {
  token: null,
  init() {
    this.ig = $ig.init(creds);
  },
  beginAuth() {
    window.location = this.ig.authUrl;
  },
  endAuth() {
    this.ig.authenticate();
  },
  retrieveUserData() {
    var deferred = $q.defer();
    this.ig.user.self.profile((res) => {
      if (res.meta.code > 400) return deferred.reject("Failed");
      return deferred.resolve(res.data);
    });
    return deferred.promise;
  },
  retrieveUserFeed(userId) {
    var deferred = $q.defer();
    this.ig.user.media(userId, (res) => {
      if (res.meta.code > 400) return deferred.reject("Failed");
      return deferred.resolve(res.data);
    });
    return deferred.promise;
  }
};

module.exports = instagramAdapter;
