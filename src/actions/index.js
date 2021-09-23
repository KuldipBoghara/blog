import jsonPlaceholder from '../APIs/jsonPlaceholder';

/* Bad apporach......
    Error msg: Action must be  plain objects. use custome middleware (redux-thunk) for async action.
    const response = await jsonPlaceholder.get('/post');

    //object to return
  return {
    type: 'FETCH_POST',
    payload: response
  };*/

//Here we are returning the function to handle the network request
//As we are using the Redux-thunk, we can use the async await keyword
// (original version) return async function (dispatch, getState) {
//modified (arrow fun, no need for getState right now)
//This is the function returning the function
export const fetchPosts = () => async (dispatch) => {
  const response = await jsonPlaceholder.get('/posts');

  //As we are returning the function we do not need to return the obcject
  //instead we will call the dispatch function manually and passin the action object
  dispatch({ type: 'FETCH_POSTS', payload: response.data });
};

export const fetchUser = (id) => async (dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: 'FETCH_USER', payload: response.data });
};
