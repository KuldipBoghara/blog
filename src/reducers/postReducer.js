//When we use below syntex we get an warning
//Assign arrow function to a variable before exporting as module default
//export default (state = [], action) => {

export const postReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_POSTS':
      return action.payload;
    default:
      return state;
  }
};
