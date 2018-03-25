import React, { Component } from "react";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import imgEq from "../images/multiplicativo.png";
import imgRi from "../images/multiplicativo2.png";
import Send from "material-ui/svg-icons/content/send";
import FloatingActionButton from "material-ui/FloatingActionButton";

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

const style = {
  marginLeft: "95%"
};

class Multiplicativo extends Component {
  constructor(props) {
    super();
    this.state = {
      x0: 51,
      a: 3,
      m: 100,
      iterations: 20,
      randomNums: []
    };
  }

  handleChange = e => {
    const { target: { name, value } } = e;
    this.setState({ [name]: +value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { x0, a, m, iterations } = this.state;
    this.setState({
      x0: x0,
      a: a,
      m: m,
      iterations: iterations
    });
    this.functionMethod(
      this.state.x0,
      this.state.a,
      this.state.m,
      this.state.iterations
    );
  };
  functionMethod = (x0, a, m, iterations) => {
    const randomNums = [];
    for (let i = 0; i < iterations; i++) {
      const x0f = i == 0 ? x0 : randomNums[i - 1].randomNum * m;
      const operation = this.numGenerator(x0f, a, m);
      const res = {
        iteracion: i,
        a: a,
        m: m,
        x0: x0f,
        operacion: operation,
        randomNum: operation / m
      };
      randomNums.push(res);
    }
    this.setState({
      ...this.state,
      randomNums
    });
  };

  numGenerator = (x0, a, m) => {
    const op = (a * x0) % m;
    return op;
  };

  render() {
    const { x0, a, m } = this.state;
    return (
      <div>
        <MuiThemeProvider>
          <Card>
            <CardHeader
              title="Método Generador Multiplicativo"
              subtitle="Información"
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              <ul>
                <li>
                  Tiene la siguiente relación recursiva:
                  <ul>
                    <br />
                    <img src={imgEq} alt="Equation" height="32" width="350" />
                    <p>Donde:</p>
                    <li>El valor inicial 𝑋0 es llamado semilla</li>
                    <li>𝑎 es llamado multiplicado</li>
                    <li>m es el módulo 𝑖=0,1,2...</li>
                  </ul>
                  <br />
                </li>
                <li>
                  Los requisitos mínimos que deben satisfacer los parámetros
                  son:
                  <ul>
                    <img src={imgRi} alt="Equation" height="52" width="200" />
                  </ul>
                </li>
              </ul>
            </CardText>
          </Card>
          <Paper style={{ padding: 16, marginBottom: 8 }}>
            <h2>Datos Requeridos</h2>
            <form onSubmit={this.handleSubmit}>
              <TextField
                margin="normal"
                type="number"
                label="semilla"
                placeholder="X0"
                name="x0"
                onChange={this.handleChange.bind(this)}
                fullWidth
              />
              <TextField
                margin="normal"
                label="a"
                placeholder="a"
                name="a"
                onChange={this.handleChange.bind(this)}
                fullWidth
              />
              <TextField
                margin="normal"
                label="m"
                placeholder="m"
                name="m"
                onChange={this.handleChange.bind(this)}
                fullWidth
              />
              <TextField
                margin="normal"
                label="iterations"
                placeholder="Iteraciones"
                name="iterations"
                onChange={this.handleChange.bind(this)}
                fullWidth
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
                  <th>X0</th>
                  <th>Operación</th>
                  <th>Ri</th>
                </tr>
              </thead>
              <tbody>
                {this.state.randomNums !== []
                  ? this.state.randomNums.map((row, i) => (
                      <tr key={i}>
                        <td>{row.iteracion}</td>
                        <td>{row.x0}</td>
                        <td>
                          ({row.a}*{row.x0})%{row.m}
                        </td>
                        <td>{row.randomNum}</td>
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

export default Multiplicativo;
