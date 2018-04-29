import React, { Component } from "react";
import logo from "../../logo.svg";
import "../../App.css";
import { Tabs, Tab } from "material-ui/Tabs";
import SwipeableViews from "react-swipeable-views";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import CentrosCuadrados from "./CentrosCuadrados";
import Congruencial from "./Congruencial";
import Mixto from "./Mixto";
import Multiplicativo from "./Multiplicativo";
import AppBar from "../AppBar";

class NumRandomHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0
    };
  }

  handleChange = value => {
    this.setState({
      slideIndex: value
    });
  };

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <MuiThemeProvider>
            <AppBar />
          </MuiThemeProvider>
          <Tabs onChange={this.handleChange} value={this.state.slideIndex}>
            <Tab label="Centros Cuadrados" value={0} />
            <Tab label="Congruencial" value={1} />
            <Tab label="Congruencial Mixto" value={2} />
            <Tab label="Generador Multiplicativo" value={3} />
          </Tabs>
          <MuiThemeProvider>
            <SwipeableViews index={this.state.slideIndex}>
              <div>
                <br />
                <MuiThemeProvider>
                  <CentrosCuadrados />
                </MuiThemeProvider>
                <br />
              </div>
              <div>
                <br />
                <MuiThemeProvider>
                  <Congruencial />
                </MuiThemeProvider>
                <br />
              </div>
              <div>
                <br />
                <MuiThemeProvider>
                  <Mixto />
                </MuiThemeProvider>
                <br />
              </div>
              <div>
                <br />
                <MuiThemeProvider>
                  <Multiplicativo />
                </MuiThemeProvider>
                <br />
              </div>
            </SwipeableViews>
          </MuiThemeProvider>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default NumRandomHome;
