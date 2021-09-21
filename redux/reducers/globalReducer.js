// import uuid from 'react-native-uuid';
// ⇨ '11edc52b-2918-4d71-9058-f7285e29d894'

let INITIAL_STATE = [];

export const globalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'INIT_SEARCH_RESULT':
      // action.data['uuid'] = uuid.v4();
      return action.data;
      break;
    default:
      return state;
  }
};
