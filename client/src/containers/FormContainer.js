import PropTypes from "prop-types";
import Form from "../components/Form";
import { connect } from "react-redux";
import React, { Component } from "react";
import {
  submit,
  showPopup,
  validateForm,
  getCountries,
  updateUserData
} from "../actions/form";
import {
  formValidator,
  emailValidator,
  phoneNumberValidator,
  personalNumberValidator
} from "../utils/validation";

class FormContainer extends Component {
  componentDidMount() {
    this.props.getCountries();
  }

  componentDidUpdate(prevProps) {
    const { email, phoneNumber, personalNumber } = this.props.form.user;
    if (prevProps.form.user.email !== email) {
      this.validateEmail(email);
    }
    if (prevProps.form.user.phoneNumber !== phoneNumber) {
      this.validatePhoneNumber(phoneNumber);
    }
    if (prevProps.form.user.personalNumber !== personalNumber) {
      this.validatePersonalNumber(personalNumber);
    }
  }

  validateEmail = email => {
    const isEmailValid = emailValidator(email);

    isEmailValid
      ? this.props.validateForm({
          ...this.props.form.validation,
          isEmailValid: true
        })
      : this.props.validateForm({
          ...this.props.form.validation,
          isEmailValid: false
        });
  };

  validatePhoneNumber = phoneNumber => {
    const isPhoneNumberValid = phoneNumberValidator(phoneNumber);

    isPhoneNumberValid
      ? this.props.validateForm({
          ...this.props.form.validation,
          isPhoneNumberValid: false
        })
      : this.props.validateForm({
          ...this.props.form.validation,
          isPhoneNumberValid: true
        });
  };

  validatePersonalNumber = personalNumber => {
    const isPersonalNumberValid = personalNumberValidator(personalNumber);

    isPersonalNumberValid
      ? this.props.validateForm({
          ...this.props.form.validation,
          isPersonalNumberValid: false
        })
      : this.props.validateForm({
          ...this.props.form.validation,
          isPersonalNumberValid: true
        });
  };

  handleChange = field => e => {
    const value = e.target.value;
    this.props.updateUserData({ ...this.props.form.user, [field]: value });
  };

  handleCountrySelect = countryObject => {
    const country = countryObject.label;
    this.props.updateUserData({ ...this.props.form.user, country });
  };

  handleSubmit = () => {
    const { user } = this.props.form;
    const { country } = this.props.form.user;
    const {
      isEmailValid,
      isPhoneNumberValid,
      isPersonalNumberValid
    } = this.props.form.validation;

    const isFormValid = formValidator(
      isEmailValid,
      isPhoneNumberValid,
      isPersonalNumberValid,
      country
    );

    isFormValid ? this.props.submit(user) : this.props.showPopup("info");
  };

  render() {
    return (
      <Form
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        email={this.props.form.user.email}
        countries={this.props.form.countries}
        country={this.props.form.user.country}
        phoneNumber={this.props.form.user.phoneNumber}
        handleCountrySelect={this.handleCountrySelect}
        personalNumber={this.props.form.user.personalNumber}
        isEmailValid={this.props.form.validation.isEmailValid}
        isPhoneNumberValid={this.props.form.validation.isPhoneNumberValid}
        isPersonalNumberValid={this.props.form.validation.isPersonalNumberValid}
      />
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  getCountries: () => dispatch(getCountries()),
  submit: payload => dispatch(submit(payload)),
  showPopup: payload => dispatch(showPopup(payload)),
  validateForm: payload => dispatch(validateForm(payload)),
  updateUserData: payload => dispatch(updateUserData(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);

FormContainer.propTypes = {
  form: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
  validateForm: PropTypes.func.isRequired,
  getCountries: PropTypes.func.isRequired,
  updateUserData: PropTypes.func.isRequired
};
