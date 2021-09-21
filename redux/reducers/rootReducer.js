import {combineReducers} from 'redux';
import {cartReducer} from './cartReducer';
import {reservationReducer} from './reservationReducer';
import {globalReducer} from './globalReducer';

// const INITIAL_STATE = {
//   reservation: [],
//   cart: [
//     'Literature',
//     'Speech',
//     'Writing',
//     'Algebra',
//     'Geometry',
//     'Statistics',
//     'Chemisrty',
//     'Biology',
//     'Physics',
//     'Economics',
//     'Geography',
//     'History',
//   ],
// };

// const rootReducer = (state = INITIAL_STATE, action) => {
//   switch (action.type) {

//     case 'ADD_CART':
//         console.log(action.data);

//     default:
//       return state
//   }
// };

export default combineReducers({
  cart: cartReducer,
  reservation: reservationReducer,
  global: globalReducer,
});
