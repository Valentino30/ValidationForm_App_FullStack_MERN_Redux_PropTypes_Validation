import PropTypes from "prop-types";
import { connect } from "react-redux";
import Popup from "../components/Popup";
import React, { Component } from "react";
import { closePopup } from "../actions/form";

class PopupContainer extends Component {
  render() {
    return (
      <Popup popup={this.props.form.popup} closePopup={this.props.closePopup} />
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  closePopup: payload => dispatch(closePopup(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(PopupContainer);

PopupContainer.propTypes = {
  popup: PropTypes.object
};
