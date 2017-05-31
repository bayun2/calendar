import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from '../src/index.js';


const rootEl = document.createElement('div');
document.body.appendChild(rootEl);

if (module.hot) {
  import('react-hot-loader').then(({AppContainer}) => {
    const render = () => ReactDOM.render(<AppContainer>
      <Calendar selectTimeCb={time => console.log(time)} type="month"/></AppContainer>, rootEl);
    render();
    module.hot.accept('../src/index.js', render);
  });
}
