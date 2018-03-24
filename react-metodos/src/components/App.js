import React, { Component } from "react";
import logo from "../logo.svg";
import "../App.css";
import { Tabs, Tab } from "material-ui/Tabs";
import SwipeableViews from "react-swipeable-views";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import CentrosCuadrados from "./CentrosCuadrados";

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
class App extends Component {
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
          <Tabs onChange={this.handleChange} value={this.state.slideIndex}>
            <Tab label="Método Centros Cuadrados" value={0} />
            <Tab label="Método Congruencial" value={1} />
            <Tab label="Método Congruencial Mixto" value={2} />
            <Tab label="Generador Multiplicativo" value={3} />
          </Tabs>
          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleChange}
          >
            <div>
              <br />
              <CentrosCuadrados />
              <br />
            </div>
            <div style={styles.slide}>slide n°2</div>
            <div style={styles.slide}>slide n°3</div>
            <div style={styles.slide}>slide n°4</div>
          </SwipeableViews>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
