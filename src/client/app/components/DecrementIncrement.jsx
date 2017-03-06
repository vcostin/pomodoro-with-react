import React from 'react';
import OperationButton from './OperationButton';

class DecrementIncrement extends React.Component {

  render() {
    return (
      <div>
        <p className="title">{this.props.description}</p>
        <div className="control is-grouped">
          <div className="control has-addons">
            <OperationButton operation={this.props.increment} text="+" />
            <span className="button">{this.props.startsFrom}</span>
            <OperationButton operation={this.props.decrement} text="-" />
          </div>
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
