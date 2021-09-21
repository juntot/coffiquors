const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    addCart: obj => dispatch({type: 'ADD_CART', data: obj}),
    resetCart: () => dispatch({type: 'RESET_CART'}),
    decrement: obj => dispatch({type: 'DECREMENT', data: obj}),
    increment: obj => dispatch({type: 'INCREMENT', data: obj}),
    deleteItem: obj => dispatch({type: 'DELETE_TO_CART', data: obj}),
  };
};

export default mapDispatchToProps;

// export default {
//   searchFocus(keyword) {
//     return dispatch => dispatch({ type: 'ADD_CART' , data: keyword})
//   },

// };
