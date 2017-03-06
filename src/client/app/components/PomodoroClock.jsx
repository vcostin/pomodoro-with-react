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
      isStarted: false,
      pomodoroTimeout: false,
      pomodoroTime: 0,
      maxTimeProgress: 0,
      counterText: WORK,
    };

    this.internalEvents = [];
    this.startCountDown = this.startCountDown.bind(this);
    this.pauseCountDown = this.pauseCountDown.bind(this);
    this.startWork = this.startWork.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.setWorkTime = this.setWorkTime.bind(this);
    this.setChillTime = this.setChillTime.bind(this);
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

  setWorkTime(operation) {
    if (!this.state.isStarted) {
      this.setState({
        pomodoroTime: operation * 60,
      });
    }
    this.setState({
      work: operation,
    });
  }

  setChillTime(operation) {
    this.setState({
      chill: operation,
    });
  }

  pauseCountDown() {
    clearInterval(this.state.pomodoroTimeout);
    this.setState({
      pomodoroTimeout: false,
    });
  }

  resetTimer() {
    this.pauseCountDown();
    this.setState({
      pomodoroTime: this.state.work * 60,
      counterText: WORK,
      isStarted: false,
    });
  }

  startWork() {
    this.setState({
      isStarted: true,
    });
    if (this.state.isStarted) {
      PubSub.publish(this.state.counterText, this.state.pomodoroTime);
    } else {
      const maxTimeProgress = this.state.work * 60;
      this.setState({ maxTimeProgress });
      PubSub.publish(WORK, maxTimeProgress);
    }
  }

  pomodoroEventSwitcher(eventName, data) {
    this.setState({ counterText: eventName });
    let maxTimeProgress = 0;
    switch (eventName) {
      case WORK:
        this.startCountDown(data || maxTimeProgress);
        break;
      case CHILL:
        maxTimeProgress = this.state.chill * 60;
        this.setState({ maxTimeProgress });
        this.startCountDown(data || maxTimeProgress);
        break;
      default:
    }
  }

  startCountDown(startsFrom = 0) {
    if (this.state.pomodoroTimeout !== false) {
      return;
    }

    this.setState({
      pomodoroTime: startsFrom,
      pomodoroTimeout: setInterval(() => {
        if (this.state.pomodoroTime <= 0) {
          this.pauseCountDown();
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

  render() {
    return (
      <div>
        <div className="tile is-ancestor">
          <div className="tile is-4 is-vertical is-parent">
            <div className="tile is-child box">
              <DecrementIncrement
                description={WORK}
                startsFrom={this.state.work}
                increment={() => this.setWorkTime(this.state.work + 1)}
                decrement={() => this.setWorkTime(this.state.work - 1)}
              />
            </div>
            <div className="tile is-child box">
              <DecrementIncrement
                description={CHILL}
                startsFrom={this.state.chill}
                increment={() => this.setChillTime(this.state.chill + 1)}
                decrement={() => this.setChillTime(this.state.chill - 1)}
              />
            </div>
          </div>
          <div className="tile is-parent is-vertical">
            <div className="tile is-child notification is-primary box">
              <TimerDisplay
                maxTimeProgress={this.state.maxTimeProgress}
                displayTime={this.state.pomodoroTime}
                displayText={this.state.counterText}
              />
            </div>
            <div className="tile is-child box">
              <p className="title">Controls</p>
              <div className="control is-grouped">
                <p className="control has-addons">
                  <button className="button is-success" onClick={this.startWork}>Start</button>
                  <button className="button is-warning" onClick={this.pauseCountDown}>Pause</button>
                  <button className="button is-danger" onClick={this.resetTimer}>Stop/Reset</button>
                </p>
              </div>
            </div>
          </div>
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
  work: 3,
  chill: 1,
};

export default PomodoroClock;
