import React from 'react';
import { render } from 'react-dom';
import PomodoroClock from './components/PomodoroClock';
import PubSub from './modules/PubSub';

render(<PomodoroClock />, document.getElementById('app'));


