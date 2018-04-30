import React, { Component } from "react";
import AppBar from "../AppBar";
import { Tabs, Tab } from "material-ui/Tabs";
import SwipeableViews from "react-swipeable-views";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import MG1Home from "./MG1Home";
import MM1 from "./MM1";
import MMs from "./MMs";
import MMsK from "./MMsK";

class FilasEsperaHome extends Component {
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
            <Tab label="M/M/1" value={0} />
            <Tab label="M/M/s" value={1} />
            <Tab label="M/M/s/K" value={2} />
            <Tab label="M/G/1" value={3} />
          </Tabs>
          <MuiThemeProvider>
            <SwipeableViews index={this.state.slideIndex}>
              <div>
                <br />
                <MuiThemeProvider>
                  <MM1 />
                </MuiThemeProvider>
                <br />
              </div>
              <div>
                <br />
                <MuiThemeProvider>
                  <MMs />
                </MuiThemeProvider>
                <br />
              </div>
              <div>
                <br />
                <MuiThemeProvider>
                  <MMsK />
                </MuiThemeProvider>
                <br />
              </div>
              <div>
                <br />
                <MuiThemeProvider>
                  <MG1Home />
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

export default FilasEsperaHome;
