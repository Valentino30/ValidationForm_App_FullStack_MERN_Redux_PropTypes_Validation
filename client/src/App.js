import "./App.css";
import React from "react";
import Container from "@material-ui/core/Container";
import FormContainer from "./containers/FormContainer";
import PopupContainer from "./containers/PopupContainer";

function App() {
  return (
    <Container maxWidth="sm">
      <FormContainer />
      <PopupContainer />
    </Container>
  );
}

export default App;
