import React, { Component } from "react";
import { Card, CardTitle, CardText } from "material-ui/Card";
import "./MG1.css";
import MG1 from "./MG1";
import MD1 from "./MD1";
import MEKs from "./MEKs";

class MG1Home extends Component {
  render() {
    return (
      <div style={{ display: "inline" }}>
        <div>
          <Card className="mg1Card">
            <CardTitle className="mg1CardTitle">M/G/1</CardTitle>
            <CardText>{<MG1 />}</CardText>
          </Card>
        </div>
        <div>
          <Card className="md1Card">
            <CardTitle className="md1CardTitle">M/D/1</CardTitle>
            <CardText>{<MD1 />}</CardText>
          </Card>
        </div>
        <br />
        <br />
        <br />
        <div>
          <Card className="mekCard">
            <CardTitle className="mekCardTitle">M/Ek/s</CardTitle>
            <CardText>{<MEKs />}</CardText>
          </Card>
        </div>
      </div>
    );
  }
}

export default MG1Home;
