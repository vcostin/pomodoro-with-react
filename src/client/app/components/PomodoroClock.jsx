import React from 'react';
import DecrementIncrement from './DecrementIncrement';
import TimerDisplay from './TimerDisplay';
import PubSub from '../modules/PubSub';

const [WORK, CHILL] = ['Work', 'Chill'];

class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);
    const { work, chill } = this.props;

    this.state = {
      work,
      chill,
      pomodoroTimeout: false,
      pomodoroTime: 0,
      counterText: WORK,
    };

    this.internalEvents = [];
    this.startCountDown = this.startCountDown.bind(this);
    this.stopCountDown = this.stopCountDown.bind(this);
    this.startWork = this.startWork.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.incrementWorkTime = this.incrementWorkTime.bind(this);
    this.decrementWorkTime = this.decrementWorkTime.bind(this);
    this.incrementChillTime = this.incrementChillTime.bind(this);
    this.decrementChillTime = this.decrementChillTime.bind(this);
    this.pomodoroEventSwitcher = this.pomodoroEventSwitcher.bind(this);
    this.switcher = this.switcher.bind(this);
  }

  componentWillMount() {
    this.setState({
      pomodoroTime: this.state.work * 60,
    });
    this.internalEvents.push(PubSub.subscribe(WORK, this.pomodoroEventSwitcher));
    this.internalEvents.push(PubSub.subscribe(CHILL, this.pomodoroEventSwitcher));
  }

  componentWillUnmount() {
    this.internalEvents.forEach(sub => PubSub.unsubscribe(sub));
  }

  stopCountDown() {
    clearInterval(this.state.pomodoroTimeout);
    this.setState({
      pomodoroTimeout: false,
    });
  }

  resetTimer() {
    this.stopCountDown();
    this.setState({
      pomodoroTime: this.state.work * 60,
    });
  }

  startCountDown(startsFrom = 0) {
    if (this.state.pomodoroTimeout !== false) {
      return;
    }
    this.setState({
      pomodoroTime: startsFrom,
    });
    this.setState({
      pomodoroTimeout: setInterval(() => {
        if (this.state.pomodoroTime <= 0) {
          this.stopCountDown();
          PubSub.publish(this.switcher());
          return;
        }
        this.setState({
          pomodoroTime: this.state.pomodoroTime - 1,
        });
      }, 1000),
    });
  }

  /**
   * TODO Need to find a better solution for time switching
   */
  switcher() {
    return this.state.counterText === WORK ? CHILL : WORK;
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

  incrementChillTime() {
    this.setState({
      chill: this.state.chill + 1,
    });
  }

  decrementChillTime() {
    this.setState({
      chill: this.state.chill - 1,
    });
  }

  startWork() {
    PubSub.publish(WORK, this.state.work);
  }

  pomodoroEventSwitcher(eventName) {
    this.setState({ counterText: eventName });
    switch (eventName) {
      case WORK:
        this.startCountDown(this.state.work * 60);
        break;
      case CHILL:
        this.startCountDown(this.state.chill * 60);
        break;
      default:
    }
  }

  render() {
    return (
      <div className="content is-large">
        <div className="pomodoro-clock">
          <div className="work">
            <DecrementIncrement
              description={WORK}
              startsFrom={this.state.work}
              increment={this.incrementWorkTime}
              decrement={this.decrementWorkTime}
            />
          </div>
          <div className="chill">
            <DecrementIncrement
              description={CHILL}
              startsFrom={this.state.chill}
              increment={this.incrementChillTime}
              decrement={this.decrementChillTime}
            />
          </div>
          <h4>Controls</h4>
          <div className="control is-grouped">
            <p className="control has-addons">
              <button className="button" onClick={this.startWork}>Start</button>
              <button className="button" onClick={this.stopCountDown}>Pause</button>
              <button className="button" onClick={this.resetTimer}>Stop/Reset</button>
            </p>
          </div>
          <TimerDisplay
            displayTime={this.state.pomodoroTime}
            displayText={this.state.counterText}
          />
        </div>
      </div>
    );
  }
}

PomodoroClock.propTypes = {
  work: React.PropTypes.number.isRequired,
  chill: React.PropTypes.number.isRequired,
};

PomodoroClock.defaultProps = {
  work: 25,
  chill: 5,
};

export default PomodoroClock;
