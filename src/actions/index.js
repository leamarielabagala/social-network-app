import jsonPlaceholder from '../api/jsonPlaceholder';

export const fetchPosts = (userId) => async dispatch => {
  const request = !isNaN(userId) ? `/posts?userId=${userId}` : '/posts'; 
  const response = await jsonPlaceholder.get(request);
  dispatch({ type: 'FETCH_POSTS', payload: response.data });
};

export const fetchPost = (postId) => async dispatch => {
  const response = await jsonPlaceholder.get(`/posts/${postId}`);
  dispatch({ type: 'FETCH_POST', payload: response.data });
};

export const createPost = (post) => async dispatch => {
  const response = await jsonPlaceholder.post('/posts', post);
  dispatch({ type: 'CREATE_POST', payload: response.data });
};

export const fetchComments = (postId) => async dispatch => {
  const response = await jsonPlaceholder.get(`/posts/${postId}/comments`);
  dispatch({ type: 'FETCH_COMMENTS', payload: response.data });
};

export const deletePost = (postId) => async dispatch => {
  await jsonPlaceholder.delete(`/posts/${postId}`);
  dispatch({ type: 'DELETE_POST', payload: { id: postId } });
};

export const fetchUsers = () => async dispatch => {
  const response = await jsonPlaceholder.get(`/users`);
  dispatch({ type: 'FETCH_USERS', payload: response.data });
};

export const fetchUser = (userId) => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${userId}`);
  dispatch({ type: 'FETCH_USER', payload: response.data });
};
