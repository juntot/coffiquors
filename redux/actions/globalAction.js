const mapGlobalDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    init_search_result: data =>
      dispatch({type: 'INIT_SEARCH_RESULT', data: data}),
    test: keyword => dispatch({type: 'ADD_CART', data: keyword}),
    decrement: () => dispatch({type: 'DECREMENT'}),
    reset: () => dispatch({type: 'RESET'}),
  };
};

export default mapGlobalDispatchToProps;

// export default {
//   searchFocus(keyword) {
//     return dispatch => dispatch({ type: 'ADD_CART' , data: keyword})
//   },

// };
