var React = require('react');
var Reflux = require('reflux');
var MediaActions = require('../actions/MediaActions');
var MediaStore = require('../stores/MediaStore');

var Media = React.createClass({
  propTypes: {
    picture: React.PropTypes.object
  },
  render() {
    // Move this logic to pullMedia
    var picture = this.props.picture;
    return(
      <div>
        <div>
          <img src={ picture.imageUrl }></img>
        </div>
        { picture.caption }
        { `- ${picture.creator}` }
      </div>
    );
  }
});

var MediaFeed = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  propTypes: {
    currentUser: React.PropTypes.object,
    users: React.PropTypes.array
  },
  mixins: [ Reflux.ListenerMixin ],
  componentDidMount() {
    this.listenTo(MediaStore, this.onStoreChange);
    MediaActions.pullMedia(this.props.currentUser.username);
  },
  getInitialState() {
    return {
      media: []
    };
  },
  onStoreChange(action, allMedia) {
    this.setState({media: allMedia});
  },
  render() {
    return(
      <section className="media-feed">
        { this.state.media.map((picture) => {
          return(<Media picture={picture}/>);
        }) }
      </section>
    );
  }
});

module.exports = MediaFeed;
