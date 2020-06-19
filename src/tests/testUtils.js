import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import mockAxios from 'axios';
import { createMemoryHistory } from 'history';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

export function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }), initialState = {} } = {},
) {
  const store = mockStore(initialState);

  mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({ data: [] })
  );

  store.dispatch = jest.fn();

  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>{ui}</Router>
      </Provider>
    ),
    history,
    store,
  };
}
