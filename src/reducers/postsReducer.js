export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_POSTS':
      const oldState = state.filter(s => !action.payload.find(p => p.id === s.id));
      return [...oldState, ...action.payload];
    case 'CREATE_POST':
    case 'FETCH_POST':
      return [action.payload, ...state];
    case 'DELETE_POST':
      const { id } = action.payload;
      return state.filter(s => s.id !== id);
    default:
      return state;
  }
};
