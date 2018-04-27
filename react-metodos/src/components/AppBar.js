import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import MenuAppBar from "./MenuAppBar";

class AppBarExampleComposition extends Component {
  handleOnClick = () => {
    alert("onClick triggered on the title component");
  };
  render() {
    return (
      <div>
        <AppBar
          title="Proyecto Métodos"
          orim="true"
          iconElementLeft={<MenuAppBar />}
        />
      </div>
    );
  }
}

export default AppBarExampleComposition;
