import React from 'react';
import ReactDOM from 'react-dom';
import AdminDashboardView from './AdminDashboardView';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AdminDashboardView />, div);
  ReactDOM.unmountComponentAtNode(div);
});
