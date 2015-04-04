var React = require('react');
var Router = require('react-router');
var { 
      DefaultRoute, 
      Route, 
      RouteHandler
} = Router;
var Page = require('./components/Page');

var App = React.createClass({
  render() {
    return (
      <div>

        <header>
          <h1>SocialPoint.</h1>
        </header>

        <RouteHandler/>

      </div>
      );
  }
});

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="home" handler={Page}/>
    <DefaultRoute handler={Page}/>
  </Route>
);

Router.run(routes, function(Handler){
  React.render(<Handler/>, document.body);
});
