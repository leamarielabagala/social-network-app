import React from 'react';
import { fireEvent, screen } from '@testing-library/react';

import { renderWithRouter } from '../testUtils';
import App from '../../components/App';
 
describe('<App />', () => {
  let store;
 
  beforeEach(() => {
    const initialState = {
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
        userId: 1,
      }],
      comments: [],
    };
 
    const component = renderWithRouter(<App />, { initialState });
    store = component.store;
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
});
