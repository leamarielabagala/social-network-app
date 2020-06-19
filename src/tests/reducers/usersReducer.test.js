import usersReducer from '../../reducers/usersReducer';

const initialState = [];

describe('usersReducer', () => {
  it('returns the initial state', () => {
    expect(usersReducer(undefined, {})).toEqual(initialState);
  });

  it('handles fetching of all users', () => {
    const userList = [{ id: 1, name: 'Madeline Martha Mackenzie', company: { name: 'Google' } }];
    expect(
      usersReducer(initialState, { type: 'FETCH_USERS', payload: userList })
    ).toEqual(userList);
  });

  it('handles fetching of only one user', () => {
    const user = { id: 1, name: 'Madeline Martha Mackenzie', company: { name: 'Google' } };
    expect(
      usersReducer(initialState, { type: 'FETCH_USER', payload: user })
    ).toEqual([user]);
  });
});
