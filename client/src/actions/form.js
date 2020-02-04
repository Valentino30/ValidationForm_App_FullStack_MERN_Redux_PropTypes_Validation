import axios from "axios";
import {
  SUBMIT,
  SHOW_POPUP,
  CLOSE_POPUP,
  VALIDATE_FORM,
  GET_COUNTRIES,
  UPDATE_USER_DATA
} from "./types";

export const getCountries = () => dispatch => {
  axios
    .get("https://restcountries.eu/rest/v2/all")
    .then(response => {
      const countries = response.data.map(country => ({
        value: country.name.toLowerCase(),
        label: country.name
      }));
      dispatch({
        type: GET_COUNTRIES,
        payload: countries
      });
    })
    .catch(error => console.log(error.message));
};

export const updateUserData = user => dispatch => {
  dispatch({
    type: UPDATE_USER_DATA,
    payload: user
  });
};

export const validateForm = validation => dispatch => {
  dispatch({
    type: VALIDATE_FORM,
    payload: validation
  });
};

export const showPopup = message => dispatch => {
  dispatch({
    type: SHOW_POPUP,
    payload: message
  });
};

export const closePopup = () => dispatch => {
  dispatch({
    type: CLOSE_POPUP,
  });
};

export const submit = newUser => dispatch => {
  axios
    .post("/api/form", newUser)
    .then(() => {
      dispatch({
        type: SUBMIT
      });
      dispatch(showPopup("success"));
      console.log("Success! 🥂");
    })
    .catch(error => alert(error.message));
};
