var React = require("react");
var UserActions = require('../actions/UserActions');

var UserPanel = React.createClass({
  propTypes: {
    currentUser: React.PropTypes.object
  },
  render() {
    if (!this.props.currentUser){
      return(
        <div>
          <button onClick={UserActions.beginAuth}>Login</button>
        </div>
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


module.exports = UserPanel;
