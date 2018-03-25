import React, { Component } from "react";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import imgEq from "../images/congruencialMixto.png";
import imgEq2 from "../images/congruencialMixto2.png";
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
class Mixto extends Component {
  constructor(props) {
    super();
    this.state = {
      x0: 4,
      a: 5,
      c: 7,
      m: 8,
      iterations: 10,
      randomNums: []
    };
  }

  handleChange = e => {
    const { target: { name, value } } = e;
    this.setState({ [name]: +value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { x0, a, c, m, iterations } = this.state;
    this.setState({
      x0: x0,
      a: a,
      c: c,
      m: m,
      iterations: iterations
    });
    this.functionMethod(
      this.state.x0,
      this.state.a,
      this.state.c,
      this.state.m,
      this.state.iterations
    );
  };

  functionMethod = (x0, a, c, m, iterations) => {
    console.log(this.state);
    if (this.primosRelativos(m, c)) {
      let q = this.findPrimos(m)[0];
      if ((a - 1) % q == 0) {
        if (m % 4 == 0) {
          if ((a - 1) % 4 == 0) {
            console.log("si cumple con el teorema");
          } else {
            console.log("a-1 no es divisble entre 4");
          }
        } else {
          console.log("M no es divisible entre 4");
        }
      } else {
        console.log("a-1 no es divisible entre q");
      }
    } else {
      console.log("No son primos relativos");
    }
    const randomNums = [];
    for (let i = 0; i < iterations; i++) {
      const x0f = i == 0 ? x0 : randomNums[i - 1].randomNum * m;
      const operation = this.numGenerator(x0f, a, c, m);
      const res = {
        iteracion: i,
        a: a,
        c: c,
        m: m,
        x0: x0f,
        operacion: operation,
        randomNum: operation / m
      };
      randomNums.push(res);
    }
    this.setState({ ...this.state, randomNums });
  };

  primosRelativos = (n1, n2) => {
    let a = this.primosDivs(n1);
    let b = this.primosDivs(n2);

    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < b.length; j++) {
        if (a[i] == b[j]) {
          return false;
        }
      }
    }
    return true;
  };

  primosDivs = n => {
    const primos = this.findPrimos(n);
    let primosDivs = [];

    for (let i = 0; i < primos.length; i++) {
      if (n % primos[i] == 0) {
        primosDivs.push(primos[i]);
      }
    }
    return primosDivs;
  };

  findPrimos = n => {
    let a = [];
    for (let i = 1; i <= n; i++) {
      a.push(i);
    }
    for (let j = 1; j < a.length; j++) {
      for (let k = j + 1; k < a.length; k++) {
        if (a[k] % a[j] == 0) {
          a.splice(k, 1);
        }
      }
    }
    a.splice(0, 1);
    return a;
  };

  numGenerator = (x0, a, c, m) => {
    const op = (a * x0 + c) % m;
    return op;
  };

  render() {
    const { x0, a, c, m } = this.state;
    return (
      <div>
        <MuiThemeProvider>
          <Card>
            <CardHeader
              title="Método Congruencial Mixto"
              subtitle="Información"
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              <ul>
                <li>
                  Sea el generador congruencial:
                  <ul>
                    <br />
                    <img src={imgEq} alt="Equation" height="32" width="350" />
                    <p>Donde:</p>
                    <li>El valor inicial 𝑋0 es llamado semilla</li>
                    <li>𝑎 es llamado multiplicado</li>
                    <li>𝑐 es el incremento</li>
                    <li>m es el módulo 𝑖=0,1,2...</li>
                  </ul>
                  <br />
                </li>

                <li>
                  Los parámetros para un generador congruencial mixto se basan
                  en el Teorema de HULL-DOBELL.
                </li>
                <li>
                  El generador congruencial mixto tiene periodo completo si y
                  sólo si:
                  <ul>
                    <li>
                      i) Sea c y m primos relativo (el máximo común divisor
                      entero c y m es 1)
                    </li>

                    <li>
                      ii) Si q es un número primo que divide a m; entonces, q
                      divide a (a-1)
                      <ul>
                        <img
                          src={imgEq2}
                          alt="Equation"
                          height="22"
                          width="100"
                        />
                      </ul>
                    </li>
                    <li>
                      iii) Si 4 divide a m; entonces, 4 divide a (a-1). Es
                      decir, 𝑎 ≡ 1𝑚𝑜𝑑4
                    </li>
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
                label="c"
                placeholder="c"
                name="c"
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
                          ({row.a}*{row.x0}+{row.c})%{row.m}
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

export default Mixto;
