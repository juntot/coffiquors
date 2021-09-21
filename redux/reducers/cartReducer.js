import uuid from 'react-native-uuid';
// ⇨ '11edc52b-2918-4d71-9058-f7285e29d894'

let INITIAL_STATE = [
  // {
  //     id: 1, imgUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPVYHqHi5cv2zm2lxEz8827V9UtIYHwl6q9Q&usqp=CAU',
  //     title:'cart.title', qty: 2,  descr:'', price:20
  // },
  // {
  //     id: 2, imgUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPVYHqHi5cv2zm2lxEz8827V9UtIYHwl6q9Q&usqp=CAU',
  //     title:'cart.title', qty: 1, descr:'', price:201
  // },
  // {
  //     id: 3, imgUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPVYHqHi5cv2zm2lxEz8827V9UtIYHwl6q9Q&usqp=CAU',
  //     title:'cart.title', qty: 3, descr:'', price:32
  // },
];

export const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_CART':
      action.data.uuid = uuid.v4();
      return [...state, action.data];
      break;

    case 'INCREMENT':
      let inc_obj = state.map(res => {
        if (res.id === action.data.id) {
          res.qty = action.data.qty;
        }
        return res;
      });
      // console.log('rdc increment', action.data.id, inc_obj);
      return inc_obj;

      break;

    case 'DECREMENT':
      let dec_obj = state.map(res => {
        if (res.id === action.data.id) {
          res.qty = action.data.qty;
        }
        return res;
      });
      // console.log('rdc decrement', dec_obj);
      return dec_obj;

      break;
    case 'DELETE_TO_CART':
      let newState = state.filter(res => res.uuid !== action.data.uuid);
      return newState;
      break;

    case 'RESET_CART':
      // let newState = state.filter(res=>res.uuid !== action.data.uuid);
      return [];
      break;
    default:
      return state;
  }
};
