import React from 'react';
import ReactDOM from 'react-dom';
import UserDashboardView from './UserDashboardView';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UserDashboardView />, div);
  ReactDOM.unmountComponentAtNode(div);
});
