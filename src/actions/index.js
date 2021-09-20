import jsonPlaceholder from '../APIs/jsonPlaceholder';

export const fetchPosts = async () => {
  /* Bad apporach......
    Error msg: Action must be  plain objects. use custome middleware (redux-thunk) for async action.
    const response = await jsonPlaceholder.get('/post');

  return {
    type: 'FETCH_POST',
    payload: response
  };*/

  return {
    type: 'FETCH_POST'
  };
};
