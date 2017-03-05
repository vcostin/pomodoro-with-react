import React from 'react';

class OperationButton extends React.Component {

  render() {
    return (
      <button className="button" onClick={this.props.operation}>{this.props.text}</button>
    );
  }
}

OperationButton.propTypes = {
  operation: React.PropTypes.func.isRequired,
  text: React.PropTypes.string.isRequired,
};

export default OperationButton;
