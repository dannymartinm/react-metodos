import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import FlatButton from "material-ui/FlatButton";
import Toggle from "material-ui/Toggle";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import NavigationClose from "material-ui/svg-icons/navigation/close";

const Logged = props => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton>
        <MoreVertIcon />
      </IconButton>
    }
  >
    <MenuItem primaryText="Números Aleatorios" />
    <MenuItem primaryText="Filas de Espera" />
  </IconMenu>
);

Logged.muiName = "IconMenu";

class AppBarExampleComposition extends Component {
  handleOnClick = () => {
    alert("onClick triggered on the title component");
  };
  render() {
    return (
      <div>
        <AppBar
          title="Proyecto Métodos"
          orim
          iconElementLeft={<Logged />}
          onLeftIconButtonClick={<Logged />}
        />
      </div>
    );
  }
}

export default AppBarExampleComposition;
