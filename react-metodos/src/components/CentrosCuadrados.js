import React, { Component } from "react";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import imgEq from "../images/cuadradosMediosImg.png";
import Send from "material-ui/svg-icons/content/send";
import FloatingActionButton from "material-ui/FloatingActionButton";
import RaisedButton from "material-ui/RaisedButton";
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

class CentrosCuadrados extends Component {
  constructor(props) {
    super();
    this.state = {
      x0: 0,
      iterations: 0,
      randomNums: [],
      resChi: [],
      finalcompare: 0,
      selected: 0,
      chi: [
        [
          3.8415,
          5.9915,
          7.8147,
          9.4877,
          11.0705,
          12.5916,
          14.0671,
          15.5073,
          16.919,
          18.307,
          19.6752,
          21.0261,
          22.362,
          23.6848,
          24.9958,
          26.2962,
          27.5871,
          28.8693,
          30.1435,
          31.4104,
          32.6706
        ],
        [
          2.7055,
          4.6052,
          6.2514,
          7.7794,
          9.2363,
          10.6446,
          12.017,
          13.3616,
          14.6837,
          15.9872,
          12.275,
          18.5493,
          19.8119,
          21.0641,
          22.3071,
          23.5418,
          24.769,
          24.1555,
          25.3289,
          26.4976,
          27.662
        ]
      ],
      pruebaKS: [
        0.02,
        0.0356,
        0.1355,
        0.5011,
        1.514,
        1.6055,
        2.371,
        3.2225,
        8.8836,
        19.0123
      ],
      pruebaChi: [
        0.411,
        0.73,
        0.553,
        0.719,
        0.383,
        0.819,
        0.281,
        0.469,
        0.791,
        0.771,
        0.191,
        0.408,
        0.392,
        0.213,
        0.914,
        0.037,
        0.541,
        0.598,
        0.77,
        0.826,
        0.894,
        0.995,
        0.434,
        0.671,
        0.018,
        0.575,
        0.233,
        0.668,
        0.156,
        0.984
      ]
    };
  }

  handleChange = e => {
    const { target: { name, value } } = e;
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

  handleSubmitChi = e => {
    const arrayNums = this.state.randomNums;
    let res = [];
    e.preventDefault();
    console.log(this.state.randomNums);
    res = this.chiGenerator(this.state.pruebaChi.length);
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

  chiGenerator = gLibertad => {
    let kin = Math.floor(1 + 3.222 * Math.log10(gLibertad));
    let k = Math.floor(1 + 3.222 * Math.log10(gLibertad));

    let v = kin - 1;
    //let arreglados =

    // let array = _.map(
    //   _.sortBy(this.state.randomNums, ["randomNum"]),
    //   "randomNum"
    // );

    // let arreglados = [];
    // for (let i in array) {
    //   arreglados.push(array[i]);
    // }
    let arreglados = this.state.pruebaChi.sort();
    console.log(arreglados);

    let max = arreglados[arreglados.length - 1];
    let lit = max / kin;
    let tablas = [];
    let fabs = [];
    let fersteorica = [];
    let fers = [];
    let final = [];
    let l = 0;
    this.state.finalcompare = 0;
    for (let contador = 1; contador <= kin; contador++) {
      //console.log("%f", arreglados.sort[arreglados.length - 1]);
      tablas.push(arreglados[arreglados.length - 1] / kin * contador);

      fabs.push(0);
    }
    tablas.forEach(element => {
      console.log("%f", element);
    });

    for (let n = 0; n < this.state.pruebaChi.length; n++) {
      let r = false;
      let count = 0;
      while (r == false && count < kin) {
        if (arreglados[n] <= tablas[count]) {
          fabs[count] = fabs[count] + 1;
          r = true;
        } else {
          count++;
        }
      }
    }

    tablas.forEach(element => {
      console.log("element", element);
    });

    if (gLibertad > 20) {
      for (let n = 0; n < kin; n++) {
        if (fabs[n] < 5) {
          fabs[n - 1] = fabs[n - 1] + fabs[n];
          for (let m = n; m < k - 1; m++) {
            console.log("M es: " + m);
            let h = m + 1;
            console.log;
            let counting = 1;
            let rin = false;
            while (fabs[h] < 5 && h < k - 1) {
              fabs[n - 1] = fabs[n - 1] + fabs[h];
              rin = true;
              tablas[n - 1] = tablas[h];

              h++;
              counting++;
            }
            for (let tab = n; tab < k; tab++) {
              if (h < k) {
                tablas[tab] = tablas[h];
                h++;
              }
            }

            if (rin == true) {
              fabs[m] = fabs[m + counting];
              fabs[n - 1 + counting] = fabs[m + counting + 1];
              fabs[m + counting] = fabs[m + counting + 1];
              fabs.forEach(element => {
                console.log("Each element true", element);
              });
              console.log("El fabs counting es" + fabs[m]);
              m = n - 1 + counting;
              console.log("M ahora es", m);
            } else {
              fabs[m] = fabs[m + 1];
            }
            k = k - counting;
          }
        }
      }
    }

    for (let newn = 0; newn < k; newn++) {
      fers.push(fabs[newn] / gLibertad);

      if (newn == 0) {
        fersteorica.push(tablas[newn]);
      } else {
        fersteorica.push(tablas[newn] - tablas[newn - 1]);
      }

      final.push(
        Math.pow(fersteorica[newn] - fers[newn], 2) / fersteorica[newn]
      );
    }

    final.forEach(element => {
      this.state.finalcompare = element + this.state.finalcompare;
    });

    v = k - 1;
    l = v - 1;

    if (this.state.selected == 0.05) {
      if (this.state.finalcompare < this.state.chi[0][v - 1]) {
        // this.mostrarMensaje(
        //   this.finalcompare +
        //     " Pasa la prueba pues Es menor que el valor chi:" +
        //     this.state.chi[0][v - 1],
        //   true
        // );
        console.log(
          "Pasa la prueba, Es menor que el valor chi:1" +
            this.state.chi[0][v - 1]
        );
        const resC = { res: this.mostrarMensaje };
      } else {
        // this.mostrarMensaje(
        //   this.finalcompare +
        //     " No Pasa la prueba pues Es mayor que el valor chi:" +
        //     this.state.chi[0][v - 1],
        //   true
        // );
        console.log(
          "No Pasa la prueba, Es mayor que el valor chi:2" +
            this.state.chi[0][v - 1]
        );
        const resC = { res: this.mostrarMensaje };
      }
    } else {
      if (this.state.finalcompare < this.state.chi[1][v - 1]) {
        // this.mostrarMensaje(
        //   this.state.finalcompare +
        //     " Pasa la prueba pues Es menor que el valor chi:" +
        //     this.state.chi[1][v - 1],
        //   true
        // );
        console.log(
          "Pasa la prueba, Es menor que el valor chi:",
          this.state.chi[0][v - 1]
        );
        const resC = { res: this.mostrarMensaje };
      } else {
        // this.mostrarMensaje(
        //   this.state.finalcompare +
        //     " No Pasa la prueba pues Es mayor que el valor chi:" +
        //     this.state.chi[1][v - 1],
        //   true
        // );
        console.log(
          "No Pasa la prueba, Es mayor que el valor chi:4" +
            this.state.chi[0][v - 1]
        );
        const resC = { res: this.mostrarMensaje };
      }
    }
    this.state.resChi.push(this.state.resC);
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
          <Paper style={{ padding: 16, marginBottom: 8 }}>
            <h2>Comprobar Resultados</h2>

            <RaisedButton
              label="Chi - Cuadrada"
              secondary={true}
              style={style.button}
              onClick={this.handleSubmitChi}
            />

            <RaisedButton
              label="Kolmogorov - Smirnov"
              secondary={true}
              style={style.button}
              onClick={this.handleSubmitChi}
            />
          </Paper>
          <Card style={{ width: "50%" }}>
            <table className="MyClassName" style={{ width: "100%" }}>
              <thead>
                <tr style={{ textAlign: "left" }}>
                  <th>Resultado de Chi - Cuadrada</th>
                </tr>
              </thead>
              <tbody>
                {/* {this.state.resChi !== []
                  ? this.state.resChi.map((row, i) => (
                      <tr key={i}>
                        <td>{row.res}</td>
                      </tr>
                    ))
                  : null} */}
              </tbody>
            </table>
          </Card>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default CentrosCuadrados;
