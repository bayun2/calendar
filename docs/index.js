import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from '../src/index.js';

const rootEl = document.createElement('div');
document.body.appendChild(rootEl);
ReactDOM.render(<Calendar />, rootEl);
