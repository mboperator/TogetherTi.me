var React = require('react');
var UtilityMixin = require('../mixins/UtilityMixin');

var MediaLoader = React.createClass({
  mixins: [
    UtilityMixin
  ],
  render() {
    var children = this._cloneWithProps({});
    return(
      <div>
        { children }
      </div>
    );
  }
});

module.exports = MediaLoader;
