import '@testing-library/jest-dom';

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import UsersList from '../../components/UsersList';

describe('UsersList', () => {
  const users = [{
    id: 1,
    name: 'Jane Chapman',
    company: {
      name: 'Apple, Inc.',
    },
  }, {
    id: 2,
    name: 'Bonnie Carlson',
    company: {
      name: 'IBM',
    },
  }, {
    id: 3,
    name: 'Renata Klein',
    company: {
      name: 'Google',
    },
  }];
  const renderComponent = () => 
    render(
      <Router>
        <UsersList users={users} />
      </Router>
    );

  test('renders title', () => {
    renderComponent();
    expect(screen.getByText('Users')).toBeInTheDocument();
  });

  test('renders user name', () => {
    renderComponent();
    expect(screen.getByText('Jane Chapman')).toBeInTheDocument();
  });

  test('renders company name', () => {
    renderComponent();
    expect(screen.queryByText('Apple, Inc.')).toBeInTheDocument();
  });
});
