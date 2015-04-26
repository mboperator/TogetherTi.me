var React = require("react");
var Reflux = require("reflux");
var UserActions = require('../actions/UserActions');
var UserStore = require('../stores/UserStore');

var AuthScreen = React.createClass({
  mixins: [
    Reflux.ListenerMixin
  ],
  getInitialState() {
    return {
      parseUser: null,
      newUser: false
    };
  },
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  propTypes: {
    currentUser: React.PropTypes.object
  },
  componentDidMount() {
    this.listenTo(UserStore, this.onStoreChange);
    this.retrieveToken();
  },
  onStoreChange(type, data) {
    if(type === "existing") {
      this.setState( {"newUser": false} );
    } else if(type === "newUser") {
      this.setState( {"newUser": true} );
    } else if(type === "authSuccessful") {
      this.setState({parseUser: data});
      this.context.router.transitionTo('home');
    } else if(type === "authFailure") {
      this.setState({parseUser: data});
    }
  },
  render() {

    return(
      <div className="content">
        <section>
          { this.props.currentUser && this.props.currentUser.username }
          { this.state.newUser ? this.renderSignup() : this.renderLogin() }
          <label>parse user:</label> { this.state.parseUser }
        </section>
      </div>
    );
  },
  renderLogin() {
    return (
      <form ref="authForm">
        <input name="password" type="password" placeholder="password"/>
        <input type="button" onClick={this.signinUser}/>
      </form>
    );
  },
  renderSignup() {
    return (
      <form ref="authForm">
        <input name="password" type="password" placeholder="password"/>
        <input type="password" placeholder="password"/>
        <input type="button" onClick={this.signupUser}/>
      </form>
    );
  },
  getFormData() {
    var form = this.refs.authForm;
    return {
      username: this.props.currentUser.username,
      password: form.getDOMNode().password.value
    };
  },
  signinUser() {
    UserActions.signinUser(this.getFormData());
  },
  signupUser() {
    UserActions.signupUser(this.getFormData());
  },
  retrieveToken() {
    var token = this.context.router.getCurrentParams().token;
    UserActions.endAuth(token);
    return token;
  }
});

module.exports = AuthScreen;
