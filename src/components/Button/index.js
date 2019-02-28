import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() {
    return (
      <button
        onClick={this.props.onClick}
        type={this.props.type}
      >
        {this.props.textButton}
      </button>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func,
  textButton: PropTypes.string,
  type: PropTypes.string,
};

export default Button;