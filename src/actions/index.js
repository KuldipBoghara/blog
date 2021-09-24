import _ from 'lodash';
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

/* Example of function returns function without modifying the syntex  
export const fetchUser = function (id) {
  return async function (dispatch) {
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({ type: 'FETCH_USER', payload: response.data });
  };
}; */

/* 
//1st way to avoid multiple request for same userId
//This works for this project but if we need to get any updated user data again then we won't be able to request again
//function (fetchUser) which returns a function which calls another function (_fetchUser)
export const fetchUser = (id) => (dispatch) => _fetchUser(id, dispatch);
//memoized function
const _fetchUser = _.memoize(async (id, dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: 'FETCH_USER', payload: response.data });
}); */

/* By adding _.memoize at either inner or outer function the problem won't solve (lec 280) 
export const fetchUser = function (id) {
  return _.memoize(async function (dispatch) {
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({ type: 'FETCH_USER', payload: response.data });
  });
}; */

//2nd Way
export const fetchUser = (id) => async (dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: 'FETCH_USER', payload: response.data });
};

export const fetchPostAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  //lodash version of map function (not a regular JS map fun)
  //It will go through all the posts and only pull off the userIds (100)
  //_.uniq will return only uniq userId(10)

  //const userIds = _.uniq(_.map(getState().posts, 'userId'));
  //userIds.forEach((id) => dispatch(fetchUser(id)));

  //Refactor with Chain
  _.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach((id) => dispatch(fetchUser(id)))
    .value();
};
