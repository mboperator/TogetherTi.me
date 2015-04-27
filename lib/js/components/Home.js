var React = require("react");
var MomentFeed = require('../components/MomentFeed');
var MomentCreator = require('../components/MomentCreator');

var UserActions = require('../actions/UserActions');
var MomentActions = require('../actions/MomentActions');

var Page = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  propTypes: {
    currentUser: React.PropTypes.object
  },
  componentDidMount() {
    this.retrieveToken();
  },
  render() {
    return(
      <div className="content">
        <h1>{ this.welcomeMessage() }</h1>
        <MomentCreator onSubmit={MomentActions.create}/>
        <MomentFeed/>
      </div>
    );
  },
  welcomeMessage() {
    if (!this.props.currentUser) return "Hello";
    return `Hello ${this.props.currentUser && this.props.currentUser.username}`;
  },
  retrieveToken() {
    var token = this.context.router.getCurrentParams().token;
    token && UserActions.endAuth(token);
  }
});

module.exports = Page;
