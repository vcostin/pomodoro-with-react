import React from 'react';
import OperationButton from './OperationButton';

class DecrementIncrement extends React.Component {

  render() {
    return (
      <div>
        <h1>{this.props.description}</h1>
        <div className="control is-grouped">
          <p className="control has-addons">
            <OperationButton operation={this.props.increment} text="+" />
            <span className="button">{this.props.startsFrom}</span>
            <OperationButton operation={this.props.decrement} text="-" />
          </p>
        </div>
      </div>
    );
  }
}

DecrementIncrement.propTypes = {
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
