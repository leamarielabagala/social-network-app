import React from 'react';
import { screen } from '@testing-library/react';

import { renderWithRouter } from '../testUtils';
import App from '../../components/App';

describe('<App />', () => {
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
    form: {},
  };
  it('should show all posts of a specific user on /users/:userId/posts route', () => {
    renderWithRouter(<App />, { route: '/users/1/posts', initialState });
    expect(screen.queryByText(`Perry Wright's #1 Posts`)).toBeInTheDocument();
    expect(screen.queryByText('Create New Post')).toBeInTheDocument();
    expect(screen.queryByText('Big Little Lies')).toBeInTheDocument();
  });

  it('should show specific post on /users/:userId/posts/:postId route', () => {
    renderWithRouter(<App />, { route: '/users/1/posts/1', initialState });
    expect(screen.queryByText(`Perry Wright's Post`)).toBeInTheDocument();
    expect(screen.queryByText('Big Little Lies')).toBeInTheDocument();
    expect(screen.queryByText(`Back to Perry Wright's Posts`)).toBeInTheDocument();
  });

  it('should show create post form on /users/:userId/posts/new route', () => {
    renderWithRouter(<App />, { route: '/users/1/posts/new', initialState });
    expect(screen.queryByText(`Create Post for Perry Wright`)).toBeInTheDocument();
    expect(screen.queryByText('Title')).toBeInTheDocument();
    expect(screen.queryByText(`Description`)).toBeInTheDocument();
  });
});
