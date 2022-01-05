import { SET_TOKEN, REMOVE_TOKEN, ADD_USER } from '../actions/authentication';

const initialState = {
  token: '',
  user: {
    id: '',
    username: '',
    email: '',
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.token };
    case REMOVE_TOKEN:
      return { ...state, token: '' };
    case ADD_USER:
      return { ...state, user: { ...action.user } };
    default:
      return state;
  }
}
