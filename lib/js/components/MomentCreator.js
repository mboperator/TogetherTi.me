var React = require('react');
var { RaisedButton, TextField, DatePicker } = require('material-ui');
var MomentActions = require('../actions/MomentActions');
var FriendList = require('./FriendList');

var MomentCreator = React.createClass({
  render() {
    return (
      <section>
        <TextField ref="name" hintText="Moment name..."/>
        <DatePicker ref="startDate" hintText="Start date"/>
        <DatePicker ref="endDate" hintText="End date"/>
        <FriendList/>
        <RaisedButton primary={true} label="Create Moment" onClick={this.createMoment}/>
      </section>
      );
  },
  createMoment(e) {
    e.preventDefault();
    var moment = {
      name: this.refs.name.getValue(),
      startDate: this.refs.startDate.getDate(),
      endDate: this.refs.endDate.getDate()
    };
    MomentActions.create(moment);
  }
});

module.exports = MomentCreator;
