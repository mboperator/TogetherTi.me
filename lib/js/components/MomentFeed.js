var React = require('react');
var Reflux = require('reflux');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

Parse.initialize('la5GYZqoRYLTVY4L97BwwmpL4hPRIANHVQDTgNnG', 'H7B6N4vEPKlEWR9Ud1xuWSBCG7VL5iEgxtppUlIl');

var Moment = React.createClass({
  propTypes: {
    moment: React.PropTypes.object
  },
  render() {
    // Move this logic to pullMoment
    var moment = this.props.moment;
    return(
      <div>
        { moment.name }
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
  mixins: [ ParseReact.Mixin ],
  observe() {
    return {
      moments: (new Parse.Query('Moment')).ascending('createdAt')
    };
  },
  render() {
    return(
      <section className="moments-feed">
        { this.data.moments.map((moment) => {
          return(<Moment moment={moment}/>);
        }) }
      </section>
    );
  }
});

module.exports = MomentFeed;

