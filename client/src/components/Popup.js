import React from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

export default function Popup(props) {
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    props.closePopup();
  };

  const successMessage = "Success! 🥂";
  const infoMessage = "Make sure to fill in the form correctly 🤗";

  const popup = (
    <Snackbar
      open={props.popup.show}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={props.popup.message}>
        {props.popup.message === "success" ? successMessage : infoMessage}
      </Alert>
    </Snackbar>
  );
  return <div className={classes.root}>{props.popup.show ? popup : null}</div>;
}

Popup.propTypes = {
  popup: PropTypes.object.isRequired,
  closePopup: PropTypes.func.isRequired
};
