import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Container } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(25)
  },
  textField: {
    margin: theme.spacing(1),
    width: "100%"
  }
}));

export default function Form(props) {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <TextField
        required={true}
        autoFocus={true}
        variant="outlined"
        label="Personal Number"
        value={props.personalNumber}
        className={classes.textField}
        id="outlined-basic-personal-number"
        onChange={props.handleChange("personalNumber")}
        error={
          !props.personalNumber || props.isPersonalNumberValid ? false : true
        }
        helperText={
          !props.personalNumber || props.isPersonalNumberValid
            ? ""
            : "The personal number should be 10 to 12 digits long"
        }
      />
      <TextField
        required={true}
        variant="outlined"
        label="Phone Number"
        value={props.phoneNumber}
        className={classes.textField}
        id="outlined-basic-phone-number"
        onChange={props.handleChange("phoneNumber")}
        error={!props.phoneNumber || props.isPhoneNumberValid ? false : true}
        helperText={
          !props.phoneNumber || props.isPhoneNumberValid
            ? ""
            : "The personal number should be 7 to 12 digits long"
        }
      />
      <TextField
        label="Email"
        required={true}
        variant="outlined"
        value={props.email}
        id="outlined-basic-email"
        className={classes.textField}
        onChange={props.handleChange("email")}
        error={!props.email || props.isEmailValid ? false : true}
        helperText={
          !props.email || props.isEmailValid
            ? ""
            : "The email should follow the format 'name@gmail.com'"
        }
      />
      <Select
        options={props.countries}
        className={classes.textField}
        onChange={props.handleCountrySelect}
        value={{ label: props.country || "Country..." }}
      />
      <Button
        type="submit"
        color="primary"
        variant="contained"
        className={classes.textField}
        onClick={props.handleSubmit}
      >
        Register
      </Button>
    </Container>
  );
}

Form.propTypes = {
  email: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  countries: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isEmailValid: PropTypes.bool.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  personalNumber: PropTypes.string.isRequired,
  isPhoneNumberValid: PropTypes.bool.isRequired,
  handleCountrySelect: PropTypes.func.isRequired,
  isPersonalNumberValid: PropTypes.bool.isRequired
};
