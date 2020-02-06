import { SHOW_POPUP, CLOSE_POPUP } from "../actions/types";

const initialState = {
  show: false,
  message: ""
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_POPUP:
      const message = action.payload;
      return {
        ...state,

        show: true,
        message
      };
    case CLOSE_POPUP:
      return {
        ...state,
        show: false,
        message: ""
      };
    default:
      return state;
  }
};

export default userReducer;
