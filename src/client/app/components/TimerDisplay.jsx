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
        <h1>{this.formatTime()}</h1>
        <h2>{this.props.displayText}</h2>
      </div>
    );
  }
}

TimerDisplay.propTypes = {
  displayTime: React.PropTypes.number.isRequired,
  displayText: React.PropTypes.string.isRequired,
};

export default TimerDisplay;
