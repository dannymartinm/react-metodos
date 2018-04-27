import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Home from "./Home";
import NumRandomHome from "./NumRandom/NumRandomHome";
import FilasEsperaHome from "./FilasEspera/FilasEsperaHome";
class Routing extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="main">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/numRandom" component={NumRandomHome} />
            <Route exact path="/filasEspera" component={FilasEsperaHome} />
            <Redirect from="*" to="/" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Routing;
