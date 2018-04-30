import React, { Component } from "react";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import imgEq from "../../images/cuadradosMediosImg.png";
import Send from "material-ui/svg-icons/content/send";
import FloatingActionButton from "material-ui/FloatingActionButton";
import RaisedButton from "material-ui/RaisedButton";
import chiSquaredTest from "chi-squared-test";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import _ from "lodash";

const style = {
  button: {
    margin: 12
  },
  marginLeft: "95%"
};

const initialState = {
  x0: 0,
  iterations: 0,
  randomNums: []
};

class CentrosCuadrados extends Component {
  constructor(props) {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    this.setState(initialState);
  }

  handleChange = e => {
    const {
      target: { name, value }
    } = e;
    this.setState({ [name]: +value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { x0, iterations } = this.state;
    this.setState({
      x0: x0,
      iterations: iterations
    });
    this.functionMethod(this.state.x0, this.state.iterations);
  };

  functionMethod = (x0, iterations) => {
    const randomNums = [];
    for (let i = 0; i < iterations; i++) {
      const x0f = i == 0 ? x0 : randomNums[i - 1].randomNum;
      const resp = { iteration: i, x0: x0f, randomNum: this.numGenerator(x0f) };
      randomNums.push(resp);
    }
    this.setState({
      ...this.state,
      randomNums
    });
  };
  numGenerator = num => {
    const power = Math.pow(num, 2);
    let stringPower = power.toString();

    while (stringPower.length < this.state.x0.toString().length * 2) {
      const zero = "0";
      stringPower = zero.concat(stringPower);
    }

    const n = this.state.x0;
    const longitud = stringPower.length - n.toString().length;
    const interval = longitud / 2;
    const res = stringPower.slice(interval, stringPower.length - interval);
    return res;
  };

  render() {
    const { x0, iterations } = this.state;

    return (
      <div>
        <MuiThemeProvider>
          <Card>
            <CardHeader
              title="Método de Centros Cuadrados"
              subtitle="Información"
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              <ul>
                <li> Propuesto por John von Neumann y Nicholas Metropolis.</li>
                <li>
                  Propusieron una secuencia de números enteros entre 0 y 1
                  siguiendo la siguiente relación recursiva:
                  <ul>
                    <br />
                    <img src={imgEq} alt="Equation" height="42" width="500" />
                    <p>Donde: El valor inicial 𝑋0 es llamado semilla.</p>
                  </ul>
                </li>
                <li>Originalmente los autores proponen 4 cifras.</li>
              </ul>
            </CardText>
          </Card>
          <Paper style={{ padding: 16, marginBottom: 8 }}>
            <h2>Datos Requeridos</h2>
            <form onSubmit={this.handleSubmit}>
              <TextField
                margin="normal"
                label="semilla"
                placeholder="Semilla"
                name="x0"
                onChange={this.handleChange.bind(this)}
                fullWidth
                required
              />
              <TextField
                margin="normal"
                label="iteraciones"
                placeholder="Iteraciones"
                name="iterations"
                onChange={this.handleChange.bind(this)}
                fullWidth
                required
              />
              <FloatingActionButton
                secondary={true}
                type="submit"
                style={style}
              >
                <Send />
              </FloatingActionButton>
            </form>
          </Paper>
          <Card style={{ width: "50%" }}>
            <table className="MyClassName" style={{ width: "100%" }}>
              <thead>
                <tr style={{ textAlign: "left" }}>
                  <th>Iteración</th>
                  <th>Xi</th>
                  <th>Ri</th>
                </tr>
              </thead>
              <tbody>
                {this.state.randomNums !== []
                  ? this.state.randomNums.map((row, i) => (
                      <tr key={i}>
                        <td>{row.iteration}</td>
                        <td>{row.x0}</td>
                        <td>0.{row.randomNum}</td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </Card>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default CentrosCuadrados;
