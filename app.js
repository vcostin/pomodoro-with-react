class OperationButton extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <button onClick={this.props.operation}>{this.props.text}</button>
    );
  }
}

OperationButton.propTypes = {
  operation: React.PropTypes.func.isRequired,
  text: React.PropTypes.string.isRequired,
};

// OperationButton.defaultProps = {
//   name: 'Stranger'
// };

class DecrementIncrement extends React.Component {
  constructor(props) {
    super(props);
  }

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

class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      work: this.props.work,
      chill: this.props.chill,
    };
    this.startCountDown = this.startCountDown.bind(this);
    this.stopCountDown = this.stopCountDown.bind(this);
    this.startWork = this.startWork.bind(this);
    this.pauseWork = this.pauseWork.bind(this);
    this.incrementWorkTime = this.incrementWorkTime.bind(this);
    this.decrementWorkTime = this.decrementWorkTime.bind(this);
  }

  stopCountDown(intervalId) {
    clearInterval(this.state[intervalId]);
  }

  startCountDown(intervalId, stateParamName) {
    this.setState({
      [intervalId]: setInterval(() => {
        console.log(this.state);
        if (this.state[stateParamName] <= 0) {
          this.stopCountDown(intervalId);
          this.setState({
            [stateParamName]: this.props[stateParamName],
          });
          return;
        }
        this.setState({
          [stateParamName]: this.state[stateParamName] - 1,
        });
      }, 1000),
    });
  }

  incrementWorkTime() {
    this.setState({
      work: this.state.work + 1,
    });
  }
  decrementWorkTime() {
    this.setState({
      work: this.state.work - 1,
    });
  }


  startWork() {
    this.startCountDown('workTime', 'work');
  }

  pauseWork() {
    this.stopCountDown('workTime');
  }

  render() {
    return (
      <div className="pomodoro-clock">
        <div className="work">
          <DecrementIncrement
            description="Work"
            startsFrom={this.state.work}
            increment={this.incrementWorkTime}
            decrement={this.decrementWorkTime}
          />
        </div>
        <div className="chill">
          <DecrementIncrement
            description="Chill"
            startsFrom={this.state.chill}
            increment={() => {
            }}
            decrement={() => {
            }}
          />
        </div>

        <div className="tick-timer">
          <button onClick={this.startWork}>Start</button>
          <button onClick={this.pauseWork}>Pause</button>
          <button>Stop</button>
        </div>
      </div>
    );
  }
}

PomodoroClock.propsTypes = {
  work: React.PropTypes.number.isRequired,
  chill: React.PropTypes.number.isRequired,
};

PomodoroClock.defaultProps = {
  work: 5,
  chill: 5,
};


ReactDOM.render(<PomodoroClock />, document.querySelector('#root'));
// setTimeout(function() { this.setState({position: 1}); }.bind(this), 3000);
