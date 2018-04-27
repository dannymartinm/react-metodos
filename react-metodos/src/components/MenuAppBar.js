import React, { Component } from "react";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import { MenuList, MenuItem } from "material-ui/Menu";
import { ListItemIcon, ListItemText } from "material-ui/List";
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
          primaryText="Números Aleatorios"
          containerElement={<Link to="/numRandom" />}
        />
        <MenuItem
          inset="true"
          primaryText="Filas de Espera"
          containerElement={<Link to="/filasEspera" />}
        />
      </IconMenu>
    );
  }
}

MenuRender.muiName = "IconMenu";

export default MenuRender;
