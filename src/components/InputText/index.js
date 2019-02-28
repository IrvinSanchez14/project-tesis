import React from "react";
import PropTypes from "prop-types";

class InputText extends React.Component {
  render() {
    return (
      <input
        id={this.props.id}
        type={this.props.type}
        name={this.props.name}
        defaultValue={this.props.value}
      />
    );
  }
}

InputText.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  type: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
};

export default InputText;
