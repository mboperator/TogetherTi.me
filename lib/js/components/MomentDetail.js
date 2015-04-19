var React = require('react');
var MediaFeed = require('./MediaFeed');

var MomentDetail = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  render() {
    var params = this.context.router.getCurrentParams();
    return (
      <div>
        <h1>Moment: {params.name}</h1>
        Welcome, { this.props.currentUser }
      </div>
      );
  }
});

module.exports = MomentDetail;
