var React = require('react');
var MomentActions = require('../actions/MomentActions');

var MomentHeader = React.createClass({
  getInitialState() {
    return {
      isEditing: false
    };
  },
  render() {
    return this.state.isEditing ? this.renderEditor() : this.renderHeader();
  },
  renderHeader() {
    var moment = this.props.moment;
    return(
      <section className="moment-header">
        <h1>Moment: {moment.name}</h1>
        <div className="time-range">
          <label>Start</label><p>{moment.startDate}</p>
          <label>End</label><p>{moment.endDate}</p>
        </div>
      </section>
      );
  },
  renderEditor() {
    return(
      <MomentCreator onSubmit={MomentActions.update}/>
      );
  }
});

module.exports = MomentHeader;
