// Required
var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var { DefaultRoute, Route, RouteHandler } = Router;

// Components
var Index = require('./components/Index');
var Home = require('./components/Home');
var AuthScreen = require('./components/AuthScreen');

// Actions
var UserActions = require('./actions/UserActions');

// Stores
var UserStore = require('./stores/UserStore');

var InstagramPanel = React.createClass({
  render() {
    if (!this.props.loggedIn){
      return(
        <button onClick={UserActions.beginAuth}>Login</button>
      );
    }
    else {
      return(
        <button onClick={UserActions.logout}>Logout</button>
      );
    }
  },
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
    if (user.id) {
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

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="authCallback" path="access_token=:token" handler={Home}/>
    <DefaultRoute handler={Index}/>
  </Route>
);

Router.run(routes, function(Handler){
  React.render(<Handler/>, document.body);
});
