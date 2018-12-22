import React from 'react';
import ReactDOM from 'react-dom';
import TopNavbarComponent from './TopNavbarComponent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TopNavbarComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
