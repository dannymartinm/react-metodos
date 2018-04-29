import React, { Component } from "react";
import Paper from "material-ui/Paper";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Home from "./Home";
import AppBar from "./AppBar";
import Background from "../images/backgroundNumbers.png";

const style = {
  height: 150,
  width: 150,
  margin: 20,
  textAlign: "center",
  display: "inline-block"
};

class About extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <MuiThemeProvider>
            <AppBar />
          </MuiThemeProvider>

          <Paper style={style} zDepth={3} circle={true}>
            <div style={{ padding: "40px", fontSize: "14px" }}>
              <a>Daniela Martín</a>
              <h4>A01323113</h4>
            </div>
          </Paper>
          <Paper style={style} zDepth={3} circle={true}>
            <div style={{ padding: "40px", fontSize: "14px" }}>
              <a>Diego Granados</a>
              <h4>A0133XXXX</h4>
            </div>
          </Paper>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <img
            src={Background}
            alt="background"
            style={{ marginLeft: "auto", display: "block" }}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default About;
