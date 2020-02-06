import { SHOW_POPUP, CLOSE_POPUP } from "./types";

export const showPopup = message => dispatch => {
  dispatch({
    type: SHOW_POPUP,
    payload: message
  });
};

export const closePopup = () => dispatch => {
  dispatch({
    type: CLOSE_POPUP
  });
};
