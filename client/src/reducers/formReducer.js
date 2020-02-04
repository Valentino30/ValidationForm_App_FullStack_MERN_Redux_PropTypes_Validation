import {
  SUBMIT,
  SHOW_POPUP,
  CLOSE_POPUP,
  GET_COUNTRIES,
  VALIDATE_FORM,
  UPDATE_USER_DATA
} from "../actions/types";

const initialState = {
  user: {
    email: "",
    phoneNumber: "",
    country: "",
    personalNumber: ""
  },
  validation: {
    isEmailValid: false,
    isPhoneNumberValid: false,
    isPersonalNumberValid: false
  },
  popup: {
    show: false,
    message: ""
  },
  countries: []
};

const userReducer = (state = initialState, action) => {
  let { user, validation } = initialState;

  switch (action.type) {
    case GET_COUNTRIES:
      const countries = action.payload;
      return {
        ...state,
        countries
      };
    case VALIDATE_FORM:
      validation = action.payload;
      return {
        ...state,
        validation
      };
    case UPDATE_USER_DATA:
      user = action.payload;
      return {
        ...state,
        user
      };
    case SHOW_POPUP:
      const message = action.payload;
      return {
        ...state,
        popup: {
          show: true,
          message
        }
      };
    case CLOSE_POPUP:
      return {
        ...state,
        popup: {
          show: false,
          message: ""
        }
      };
    case SUBMIT:
      return {
        ...state,
        user,
        validation
      };
    default:
      return state;
  }
};

export default userReducer;
