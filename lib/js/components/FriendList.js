var React = require('react');
var { TextField, FontIcon } = require('material-ui');

var Friend = React.createClass({
  render() {
    return (
      <li>
        { this.props.handle }
        <span onClick={this.props.onRemove}>
          X
        </span>
      </li>
      );
  }
});

var FriendList = React.createClass({
  getInitialState() {
    return {
      friends: []
    };
  },
  render() {
    return (
      <div>
        <TextField 
          ref="handle"
          hintText="Friend's handle..." 
          onKeyDown={this.handleChange}/>
        <ul>
          { this.renderFriends() }
        </ul>
      </div>
      );
  },
  handleChange(e) {
    if (e.keyCode !== 13) return;
    e.preventDefault();

    var handle = this.refs.handle.getValue();
    var friends = this.state.friends;
    friends.push(handle);

    this.setState({friends: friends});
  },
  renderFriends() {
    return this.state.friends.map((friend, key) => {
      return(<Friend 
                key={key} 
                handle={friend} 
                onRemove={this.removeFriend.bind(null, key)}/>);
    });
  },
  removeFriend(id) {
    var newFriends = this.state.friends.slice(0);
    newFriends.splice(id, 1);
    this.setState({
      friends: newFriends
    });
  }
});

module.exports = FriendList;
