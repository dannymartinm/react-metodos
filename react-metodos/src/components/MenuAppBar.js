import React, { Component } from "react";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import { MenuList, MenuItem } from "material-ui/Menu";
import { ListItemIcon, ListItemText } from "material-ui/List";

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
        {/* <Link to={`/numRandom`} style={{ textDecoration: "none" }} /> */}
        <MenuItem
          inset="true"
          primaryText="Números Aleatorios"
          onClick={() => {
            console.log("click click Num ALeatorios");
          }}
        />
        <MenuItem
          inset="true"
          primaryText="Filas de Espera"
          onClick={() => {
            console.log("click click Filas");
          }}
        />
        <MenuItem
          inset="true"
          primaryText="About"
          onClick={() => {
            console.log("click click About");
          }}
        />
      </IconMenu>
    );
  }
}

MenuRender.muiName = "IconMenu";

export default MenuRender;
