// Returns true if the email is valid
export const emailValidator = email => {
  let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isEmailValid = regex.test(String(email).toLowerCase());
  return isEmailValid;
};

// Returns true if the phone number is valid
export const phoneNumberValidator = phoneNumber => {
  const isPhoneNumberValid =
    phoneNumber.length < 7 || phoneNumber.length > 12 || isNaN(phoneNumber)
      ? true
      : false;
  return isPhoneNumberValid;
};

// Returns true if the personal number is valid
export const personalNumberValidator = personalNumber => {
  const isPersonalNumberValid =
    personalNumber.length < 10 ||
    personalNumber.length > 12 ||
    isNaN(personalNumber)
      ? true
      : false;
  return isPersonalNumberValid;
};

// Returns true if all fields are valid
export const formValidator = (
  isEmailValid,
  isPhoneNumberValid,
  isPersonalNumberValid,
  country
) => {
  const isFormValid =
    isEmailValid && isPhoneNumberValid && isPersonalNumberValid && country
      ? true
      : false;
  return isFormValid;
};
