// Required
var React = require('react');
var Router = require('react-router');
var { DefaultRoute, Route, } = Router;

// Components
var Index = require('./components/Index');
var Home = require('./components/Home');
var AuthScreen = require('./components/AuthScreen');
var MomentDetail = require('./components/MomentDetail');
var App = require('./components/App');

// Stores

var injectTapEventPlugin = require("react-tap-event-plugin");

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();


var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="auth" path="/">
      <Route name="authCallback" path="access_token=:token" handler={AuthScreen}/>
    </Route>

    <Route name="home" path="/home">
      <Route name="moment" path="moment/:objectId" handler={MomentDetail}/>
      <DefaultRoute handler={Home}/>
    </Route>

    <DefaultRoute handler={Index}/>
  </Route>
);

Router.run(routes, function(Handler){
  React.render(<Handler/>, document.getElementById('mountPoint'));
});
