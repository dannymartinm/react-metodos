import React, { Component } from "react";
import Background from "../images/backgroundNumbers.png";
import AppBar from "./AppBar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppBar />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <img src={Background} alt="background" />
        </MuiThemeProvider>
      </div>
    );
  }
}
export default Home;
