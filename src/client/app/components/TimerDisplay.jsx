import React from 'react';

class TimerDisplay extends React.Component {
  static strPaddingLeft(string, pad, length) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
  }

  constructor(props) {
    super(props);

    this.formatTime = this.formatTime.bind(this);
  }

  formatTime() {
    const minutes = Math.floor(this.props.displayTime / 60);
    const minutesToSeconds = minutes * 60;
    const seconds = this.props.displayTime - minutesToSeconds;

    return `${TimerDisplay.strPaddingLeft(minutes, '0', 2)}m:${TimerDisplay.strPaddingLeft(seconds, '0', 2)}s`;
  }

  render() {
    return (
      <div>
        <p className="title">{this.formatTime()}</p>
        <p className="subtitle"><strong>{this.props.displayText}</strong></p>
        <progress
          className="progress is-danger"
          value={this.props.displayTime}
          max={this.props.maxTimeProgress}
        />
      </div>
    );
  }
}

TimerDisplay.propTypes = {
  maxTimeProgress: React.PropTypes.number.isRequired,
  displayTime: React.PropTypes.number.isRequired,
  displayText: React.PropTypes.string.isRequired,
};

export default TimerDisplay;
