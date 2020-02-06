import axios from "axios";
import PropTypes from "prop-types";
import Form from "../components/Form";
import { connect } from "react-redux";
import React, { Component } from "react";
import { showPopup } from "../actions/form";
import {
  formValidator,
  emailValidator,
  phoneNumberValidator,
  personalNumberValidator
} from "../utils/validation";

class FormContainer extends Component {
  state = {
    countries: [],
    email: localStorage.getItem("email") || "",
    country: localStorage.getItem("country") || "",
    phoneNumber: localStorage.getItem("phoneNumber") || "",
    personalNumber: localStorage.getItem("personalNumber") || "",
    isEmailValid: JSON.parse(localStorage.getItem("isEmailValid")) || false,
    isPhoneNumberValid:
      JSON.parse(localStorage.getItem("isPhoneNumberValid")) || false,
    isPersonalNumberValid:
      JSON.parse(localStorage.getItem("isPersonalNumberValid")) || false
  };

  componentDidMount() {
    this.getCountries();
  }

  componentDidUpdate(prevProps, prevState) {
    const { email, phoneNumber, personalNumber } = this.state;
    if (prevState.email !== email) {
      this.validateEmail(email);
    }
    if (prevState.phoneNumber !== phoneNumber) {
      this.validatePhoneNumber(phoneNumber);
    }
    if (prevState.personalNumber !== personalNumber) {
      this.validatePersonalNumber(personalNumber);
    }
  }

  getCountries = () => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        const countries = response.data.map(country => ({
          value: country.name.toLowerCase(),
          label: country.name
        }));
        this.setState({ countries });
      })
      .catch(() => alert("Could not fetch countries, please try again"));
  };

  validateEmail = email => {
    const isEmailValid = emailValidator(email);

    if (isEmailValid) {
      this.setState({
        ...this.state,
        isEmailValid: true
      });
      localStorage.setItem("isEmailValid", "true");
    } else {
      this.setState({
        ...this.state,
        isEmailValid: false
      });
      localStorage.setItem("isEmailValid", "false");
    }
  };

  validatePhoneNumber = phoneNumber => {
    const isPhoneNumberValid = phoneNumberValidator(phoneNumber);

    if (isPhoneNumberValid) {
      this.setState({
        ...this.state,
        isPhoneNumberValid: true
      });
      localStorage.setItem("isPhoneNumberValid", "true");
    } else {
      this.setState({
        ...this.state,
        isPhoneNumberValid: false
      });
      localStorage.setItem("isPhoneNumberValid", "false");
    }
  };

  validatePersonalNumber = personalNumber => {
    const isPersonalNumberValid = personalNumberValidator(personalNumber);

    if (isPersonalNumberValid) {
      this.setState({
        ...this.state,
        isPersonalNumberValid: true
      });
      localStorage.setItem("isPersonalNumberValid", "true");
    } else {
      this.setState({
        ...this.state,
        isPersonalNumberValid: false
      });
      localStorage.setItem("isPersonalNumberValid", "false");
    }
  };

  handleChange = field => e => {
    const value = e.target.value;
    localStorage.setItem(field, value);
    this.setState({ ...this.state, [field]: value });
  };

  handleCountrySelect = countryObject => {
    const country = countryObject.label;
    localStorage.setItem("country", country);
    this.setState({ ...this.state, country });
  };

  handleSubmit = () => {
    const {
      email,
      country,
      phoneNumber,
      personalNumber,
      isEmailValid,
      isPhoneNumberValid,
      isPersonalNumberValid
    } = this.state;

    const user = {
      email,
      country,
      phoneNumber,
      personalNumber
    };

    const isFormValid = formValidator(
      isEmailValid,
      isPhoneNumberValid,
      isPersonalNumberValid,
      country
    );

    isFormValid ? this.onSubmit(user) : this.props.showPopup("info");
  };

  onSubmit = user => {
    axios
      .post("/api/form", user)
      .then(() => {
        this.resetState();
        this.cleanLocalStorage();
        console.log("Success! 🥂");
        this.props.showPopup("success");
      })
      .catch(() => alert("Could not submit, please try again"));
  };

  cleanLocalStorage = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("country");
    localStorage.removeItem("phoneNumber");
    localStorage.removeItem("personalNumber");
  };

  resetState = () => {
    this.setState({
      email: localStorage.getItem("email") || "",
      country: localStorage.getItem("country") || "",
      phoneNumber: localStorage.getItem("phoneNumber") || "",
      personalNumber: localStorage.getItem("personalNumber") || ""
    });
  };

  render() {
    return (
      <Form
        email={this.state.email}
        country={this.state.country}
        countries={this.state.countries}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        phoneNumber={this.state.phoneNumber}
        isEmailValid={this.state.isEmailValid}
        personalNumber={this.state.personalNumber}
        handleCountrySelect={this.handleCountrySelect}
        isPhoneNumberValid={this.state.isPhoneNumberValid}
        isPersonalNumberValid={this.state.isPersonalNumberValid}
      />
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  showPopup: payload => dispatch(showPopup(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);

FormContainer.propTypes = {
  showPopup: PropTypes.func.isRequired
};
