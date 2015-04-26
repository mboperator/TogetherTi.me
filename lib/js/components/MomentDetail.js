var React = require('react');
var Reflux = require('reflux');
var MediaFeed = require('./MediaFeed');
var _ = require('underscore');

var MomentStore = require('../stores/MomentStore');
var MomentActions = require('../actions/MomentActions');


var MomentDetail = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  propTypes: {
    moment: React.PropTypes.object.isRequired
  },
  mixins: [
    Reflux.ListenerMixin
  ],
  getInitialState() {
    return {
      moment: MomentStore.getMoment(this.getParams().objectId)
    };
  },
  componentDidMount() {
    this.listenTo(MomentStore, this.onStoreChange);
  },
  onStoreChange(eventType, payload) {
    this.setState({moment: MomentStore.getMoment(this.getParams().objectId)});
  },
  render() {
    var moment = this.state.moment;
    return (
      <div>
        <section className="moment-header">
          <h1>Moment: {moment.name}</h1>
          <div className="time-range">
            <label>Start</label><p>{moment.startDate}</p>
            <label>End</label><p>{moment.endDate}</p>
          </div>
        </section>
        <MediaFeed {...this.props} moment={this.state.moment}/>
      </div>
      );
  },
  getParams() {
    return this.context.router.getCurrentParams() || {};
  },
  handleSubmit(attribute, value) {
    var moment = this.state.moment;
    moment[attribute] = value;
    MomentActions.update(moment);
  }
});

module.exports = MomentDetail;
