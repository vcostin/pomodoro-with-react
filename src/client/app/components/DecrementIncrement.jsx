import React from 'react';
import OperationButton from './OperationButton';

class DecrementIncrement extends React.Component {

  render() {
    return (
      <div>
        <h1>{this.props.description}</h1>
        <OperationButton operation={this.props.increment} text="+" />
        <span>{this.props.startsFrom}</span>
        <OperationButton operation={this.props.decrement} text="-" />
      </div>
    );
  }
}

DecrementIncrement.propsTypes = {
  startsFrom: React.PropTypes.number,
  description: React.PropTypes.string,
  increment: React.PropTypes.func.isRequired,
  decrement: React.PropTypes.func.isRequired,
};

DecrementIncrement.defaultProps = {
  startsFrom: 0,
  description: 'Hello',
};

export default DecrementIncrement;
