var React = require('react');
var { RaisedButton, TextField, DatePicker } = require('material-ui');
var FriendList = require('./FriendList');

var MomentCreator = React.createClass({
  render() {
    return (
      <section>
        <TextField 
          defaultValue={this.defaultsFor('name')} 
          ref="name" 
          hintText="Moment name..."/>

        <DatePicker 
          defaultValue={this.defaultsFor('startDate')} 
          ref="startDate" 
          hintText="Start date"/>

        <DatePicker 
          defaultValue={this.defaultsFor('endDate')} 
          ref="endDate" 
          hintText="End date"/>

        <FriendList 
          defaultValue={this.defaultsFor('participants')} 
          ref="friendlist"/>

        <RaisedButton primary={true} label="Create Moment" onClick={this.createMoment}/>
      </section>
      );
  },
  createMoment(e) {
    e.preventDefault();
    var moment = {
      name: this.refs.name.getValue(),
      startDate: this.refs.startDate.getDate(),
      endDate: this.refs.endDate.getDate(),
      participants: this.refs.friendlist.getValues()
    };
    this.props.onSubmit && this.props.onSubmit(moment);
  },
  defaultsFor(key) {
    if (!this.props.moment || !this.props.moment[key]) return '';
    return this.props.moment && this.props.moment[key];
  }
});

module.exports = MomentCreator;
