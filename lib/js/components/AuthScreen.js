var React = require("react");
var UserActions = require('../actions/UserActions');

var AuthScreen = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
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
          {this.props.currentUser && this.props.currentUser.username}
        </section>
      </div>
    );
  },
  retrieveToken() {
    var token = this.context.router.getCurrentParams().token;
    UserActions.endAuth(token);
    return token;
  }
});

module.exports = AuthScreen;
