import {
  USER_LOGIN,
  USER_LOGIN_COMPLETED,
  USER_LOGIN_ERROR,
  USER_LOGIN_REQUEST,
  USER_LOGIN_RESET,
  GET_USER_PROFILE_COMPLETED,
} from '../actions';

const INITIAL_STATE = {
  data: null,
  isLoading: false,
  isError: false,
  errorMessage: '',
};

export default function reducer(state = INITIAL_STATE, action) {
  console.log('Auth Reducer:', action);
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        data: null,
        isLoading: true,
        isError: false,
        errorMessage: '',
      };

    case USER_LOGIN_COMPLETED:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isError: false,
        errorMessage: '',
      };

    case USER_LOGIN_ERROR:
      return {
        ...state,
        data: null,
        isLoading: false,
        isError: true,
        errorMessage: action.payload || 'Login failed',
      };

    case USER_LOGIN_RESET:
      return INITIAL_STATE;

    case GET_USER_PROFILE_COMPLETED:
      return {
        ...state,
        data: action.payload ?? state.data,
        isLoading: false,
        isError: false,
        errorMessage: '',
      };

    default:
      return state;
  }
}

export const userLogin = payload => ({
  type: USER_LOGIN,
  payload,
});

export const resetLogin = () => ({
  type: USER_LOGIN_RESET,
});

export const getUserProfileCompleted = payload => ({
  type: GET_USER_PROFILE_COMPLETED,
  payload,
});
