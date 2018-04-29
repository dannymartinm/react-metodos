import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import MenuAppBar from "./MenuAppBar";
import { Link } from "react-router-dom";
class AppBarExampleComposition extends Component {
  handleOnClick = () => {
    return <Link to="/filasEspera" />;
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
