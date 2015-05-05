var React = require("react");
var Reflux = require('reflux');
var Router = require('react-router');
var { RouteHandler } = Router;
var UserStore = require('../stores/UserStore');
var UserPanel = require('./UserPanel');

var App = React.createClass({
  mixins: [ Reflux.ListenerMixin ],
  getInitialState() {
    return {
      currentUser: false
    };
  },
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  componentDidMount() {
    this.listenTo(UserStore, this.onStoreUpdate);
  },
  onStoreUpdate(action, user) {
    var state = {};
    if (user.username) {
      state = {
        currentUser: user
      };
    } else {
      state = {
        currentUser: false
      };
      this.context.router.transitionTo("app");
    }
    this.setState(state);
  },
  render() {
    return (
      <div>
        <header className="mui-dark-theme mui-app-bar mui-paper mui-z-depth-0">
          <div className="app-header">
            <h1 className="mui-app-bar-title">SocialPoint.</h1>
            <UserPanel currentUser={this.state.currentUser}/>
          </div>
        </header>

        <RouteHandler currentUser={this.state.currentUser}/>

      </div>
      );
  }
});

module.exports = App;

