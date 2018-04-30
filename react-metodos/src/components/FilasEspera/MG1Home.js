import React, { Component } from "react";
import { Card, CardTitle, CardText } from "material-ui/Card";
import "./MG1.css";
import MG1 from "./MG1";
class MG1Home extends Component {
  render() {
    return (
      <div>
        <Card className="mg1Card">
          <CardTitle className="mg1CardTitle">MG1</CardTitle>
          <CardText>{<MG1 />}</CardText>
        </Card>
      </div>
    );
  }
}

export default MG1Home;
