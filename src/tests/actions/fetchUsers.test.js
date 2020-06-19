import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';

import * as actions from '../../actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('fetchUsers', () => {
  it('sets the fetched data as users in the store', async () => {
    const userList = [{ id: 1, name: 'Celeste Perry', company: { name: 'IBM' } }];
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: userList }),
    );
    const expectedActions = [
      { type: 'FETCH_USERS', payload: userList },
    ];
    const store = mockStore({ users: [] });

    await store.dispatch(actions.fetchUsers());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
