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

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  },
  slide: {
    padding: 10
  }
};
class NumRandomHome extends Component {
  // render() {
  //   return (
  //     <div className="App">
  //       <header className="App-header">
  //         <img src={logo} className="App-logo" alt="logo" />
  //         <h1 className="App-title">Welcome to React</h1>
  //       </header>
  //       <p className="App-intro">
  //         To get started, edit <code>src/App.js</code> and save to reload.
  //       </p>
  //     </div>
  //   );
  // }

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
          <AppBar />
          <Tabs onChange={this.handleChange} value={this.state.slideIndex}>
            <Tab label="Centros Cuadrados" value={0} />
            <Tab label="Congruencial" value={1} />
            <Tab label="Congruencial Mixto" value={2} />
            <Tab label="Generador Multiplicativo" value={3} />
          </Tabs>
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
      </div>
    );
  }
}

export default NumRandomHome;
