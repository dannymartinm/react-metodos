import React, { Component } from "react";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import { MenuItem } from "material-ui/Menu";
import { Link } from "react-router-dom";

class MenuRender extends Component {
  render() {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
      >
        <MenuItem
          inset="true"
          primaryText="Home"
          containerElement={<Link to="/" />}
        />

        <MenuItem
          inset="true"
          primaryText="Números Aleatorios"
          containerElement={<Link to="/numRandom" />}
        />
        <MenuItem
          inset="true"
          primaryText="Filas de Espera"
          containerElement={<Link to="/filasEspera" />}
        />
        <MenuItem
          inset="true"
          primaryText="About"
          containerElement={<Link to="/about" />}
        />
      </IconMenu>
    );
  }
}

MenuRender.muiName = "IconMenu";

export default MenuRender;
