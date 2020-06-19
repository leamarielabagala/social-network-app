import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import mockAxios from 'axios';
import { createMemoryHistory } from 'history';

import App from '../../components/App';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
 
describe('<App />', () => {
  let store;
  let history;
 
  beforeEach(() => {
    history = createMemoryHistory();
    store = mockStore({
      users: [{
        id: 1,
        name: 'Perry Wright',
        company: {
          name: 'Apple, Inc.'
        },
      }],
      posts: [{
        id: 1,
        title: 'Big Little Lies',
        body: 'by Jean-Marc Valle',
      }],
    });

    store.dispatch = jest.fn();

    mockAxios.get.mockImplementation(() =>
      Promise.resolve({ data: [] })
    );
 
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );
  });
 
  it('should render with given state from Redux store', () => {
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('All Posts')).toBeInTheDocument();
  });
 
  it('should dispatch an action on button click', () => {
    const viewButton = screen.getByText('View');

    fireEvent.click(viewButton);
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('should show specific post on /users/:userId/posts/:postId route', () => {
    history.push('/users/1/posts/1');
    expect(screen.queryByText('Perry Wright')).toBeInTheDocument();
    expect(screen.queryByText('All Posts')).not.toBeInTheDocument();
  });
});
