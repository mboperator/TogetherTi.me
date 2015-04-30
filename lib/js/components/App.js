var React = require("react")
var Reflux = require('reflux');
var Router = require('react-router');
var { RouteHandler } = Router;
var UserStore = require('../stores/UserStore');
var UserActions = require('../actions/UserActions');

var InstagramPanel = React.createClass({
  render() {
    if (!this.props.loggedIn){
      return(
        <button onClick={UserActions.beginAuth}>Login</button>
      );
    }
    else {
      return(
        <div>
          <button onClick={UserActions.logout}>Logout</button>
        </div>
      );
    }
  }
});



var App = React.createClass({
  mixins: [ Reflux.ListenerMixin ],
  getInitialState() {
    return {
      loggedIn: false
    };
  },
  componentDidMount() {
    this.listenTo(UserStore, this.onStoreUpdate);
  },
  onStoreUpdate(action, user) {
    var state = {};
    if (user.username) {
      state = {
        loggedIn: true,
        currentUser: user
      };
    } else {
      state = {
        loggedIn: false,
        currentUser: {}
      };
    }
    this.setState(state);
  },
  render() {
    return (
      <div>
        <header>
          <h1>SocialPoint.</h1>
          <InstagramPanel loggedIn={this.state.loggedIn}/>
        </header>

        <RouteHandler currentUser={this.state.currentUser}/>

      </div>
      );
  }
});

module.exports = App;

