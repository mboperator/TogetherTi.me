var React = require('react');
var Link = require('react-router').Link;
var Reflux = require('reflux');
var MomentStore = require('../stores/MomentStore');
var MomentActions = require('../actions/MomentActions');

var Moment = React.createClass({
  propTypes: {
    moment: React.PropTypes.object
  },
  render() {
    // Move this logic to pullMoment
    var moment = this.props.moment;
    return(
      <div>
        <Link to="moment" params={{objectId: moment.objectId}}>{ moment.name }</Link>
      </div>
    );
  }
});

var MomentFeed = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  propTypes: {
    currentUser: React.PropTypes.object
  },
  mixins: [
    Reflux.ListenerMixin
  ],
  getInitialState() {
    return {
      moments: []
    };
  },
  componentDidMount() {
    MomentActions.pullMoments();
    this.listenTo(MomentStore, this.onStoreChange);
  },
  onStoreChange(eventType, payload) {
    this.setState({
      moments: payload
    });
  },
  render() {
    return(
      <section className="moments-feed">
        { this.state.moments.map((moment) => {
          return(<Moment key={moment.objectId} moment={moment}/>);
        }) }
      </section>
    );
  }
});

module.exports = MomentFeed;

