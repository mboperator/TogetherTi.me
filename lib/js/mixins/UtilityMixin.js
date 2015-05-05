var React = require('react/addons');

var UtilityMixin = {
  _cloneWithProps(props) {
    return React.Children.map(this.props.children, (child) => {
      return React.addons.cloneWithProps(child, props);
    });
  },

  _warn(warning) {
    console.warn(this.constructor.displayName, warning);
  }  
};

module.exports = UtilityMixin;
