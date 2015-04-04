var React = require("react");
var UserActions = require('../actions/UserActions');

var Page = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  propTypes: {
    loggedIn: React.PropTypes.bool,
    currentUser: React.PropTypes.object
  },
  componentDidMount() {
    this.retrieveToken();
  },
  render() {
    return(
      <div className="content">
        <section>
          { this.welcomeMessage() }
        </section>
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
