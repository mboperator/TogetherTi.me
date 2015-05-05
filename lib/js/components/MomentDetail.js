var React = require('react');
var Reflux = require('reflux');
var MediaFeed = require('./MediaFeed');
var _ = require('underscore');

var MomentStore = require('../stores/MomentStore');
var MomentActions = require('../actions/MomentActions');
var MomentHeader = require('./MomentHeader');

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
        <MomentHeader moment={this.state.moment}/>
        <MediaLoader {...this.props} moment={this.state.moment}>
          <MediaFeed/>
        </MediaLoader>
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
