import React, { Component } from "react";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import imgEq from "../images/congruencialLineal.png";
import imgRi from "../images/congruencialLineal2.png";
import Send from "material-ui/svg-icons/content/send";
import FloatingActionButton from "material-ui/FloatingActionButton";
import RaisedButton from "material-ui/RaisedButton";
import _ from "lodash";

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
class Congruencial extends Component {
  constructor(props) {
    super();
    this.state = {
      x0: 4,
      a: 5,
      c: 7,
      m: 8,
      iterations: 10,
      randomNums: [],
      selected: 0.05,
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
      message: [],
      mensaje: [],
      selectK: 0,
      selectedSK: 0,
      kolsmir: [
        [
          0.975,
          0.842,
          0.708,
          0.624,
          0.565,
          0.532,
          0.486,
          0.457,
          0.432,
          0.41,
          0.391,
          0.375,
          0.361,
          0.349,
          0.338,
          0.328,
          0.318,
          0.309,
          0.301,
          0.294
        ],
        [
          0.95,
          0.776,
          0.642,
          0.564,
          0.51,
          0.47,
          0.438,
          0.411,
          0.388,
          0.368,
          0.352,
          0.338,
          0.325,
          0.314,
          0.304,
          0.295,
          0.286,
          0.278,
          0.272,
          0.264
        ]
      ],
      pruebaChi: [
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
      ]
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

  chiOperations = () => {
    let array = [];
    _.map(this.state.randomNums, o => {
      array.push(Number(o.randomNum));
    });

    console.log(array);
    const aleatorios = array.sort();
    const N = aleatorios.length;
    const max = aleatorios[aleatorios.length - 1];
    const min = aleatorios[0];
    const rango = max - min;
    const intervaloS = 1 + 3.222 * Math.log10(N);
    const k = Math.floor(1 + 3.222 * Math.log10(N));
    const intervaloR = Math.sqrt(N);
    const tamanio = (max - min) / k;
    let limInf = 0;
    let limSup = 0;
    let res = [];

    for (let i = 1; i < intervaloS; i++) {
      if (i <= 1) {
        limInf = min;
        limSup = min + tamanio;
        res = [
          ...res,
          {
            limInf: limInf,
            limSup: limSup,
            fo: this.calculateFo(limInf, limSup, aleatorios)
          }
        ];
      } else if (i >= 2) {
        limInf = limSup;
        limSup = limInf + tamanio;
        res = [
          ...res,
          {
            limInf: limInf,
            limSup: limSup,
            fo: this.calculateFo(limInf, limSup, aleatorios)
          }
        ];
      }
    }
    let fR = [];
    _.map(res, o => {
      fR.push(o.fo / N);
    });

    const ab = min - max;
    let fei = [];
    _.map(res, fx => {
      fei.push((fx.limInf - fx.limSup) / ab);
    });

    let F0FE2FE = [];
    let auxFOFE2 = 0;
    for (let l = 0; l < fei.length; l++) {
      auxFOFE2 = Math.pow(fei[l] - fR[l], 2) / fei[l];
      F0FE2FE.push(auxFOFE2);
    }

    let sumFinal = 0;
    for (let m = 0; m < F0FE2FE.length; m++) {
      sumFinal += F0FE2FE[m];
    }
    console.log("sumaFinal", sumFinal);

    const v = k - 1 - 1;
    const message = [];
    if (this.state.selected == 0.05) {
      if (sumFinal < this.state.chi[0][v - 1]) {
        const res = {
          m:
            "Pasa la prueba, " +
            sumFinal.toString() +
            " es menor que chi teórico: " +
            this.state.chi[0][v - 2]
        };
        message.push(res);
        console.log(
          "Pasa la prueba, ",
          sumFinal.toString(),
          " es menor que chi teórico:" + this.state.chi[0][v - 2]
        );
      } else {
        console.log(
          "No Pasa la prueba, es mayor que chi teórico:" +
            this.state.chi[0][v - 1]
        );
      }
    } else {
      if (sumFinal < this.state.chi[1][v - 1]) {
        console.log(
          "Pasa la prueba, es menor que chi teórico:",
          this.state.chi[0][v - 1]
        );
      } else {
        console.log(
          "No Pasa la prueba, es mayor que chi teórico" +
            this.state.chi[0][v - 1]
        );
      }
    }
    console.log("mensajeChi", message);
    this.setState({
      ...this.state,
      message
    });
  };

  calculateFo = (limInf, limSup, aleatorios) => {
    let TFo = 0;
    for (let i = 0; i < this.state.randomNums.length; i++) {
      if (aleatorios[i] >= limInf && aleatorios[i] <= limSup) {
        TFo++;
      }
    }
    return TFo;
  };

  handleSubmitKS = e => {
    const arrayNums = this.state.randomNums;
    let res = [];
    e.preventDefault();
    console.log(this.state.randomNums);
    res = this.onGenerateKilmogorov();
  };

  functionMethod = (x0, a, c, m, iterations) => {
    const randomNums = [];
    for (let i = 0; i < iterations; i++) {
      const x0f = i == 0 ? x0 : randomNums[i - 1].randomNum * m;
      const operation = this.numGenerator(x0f, a, c, m);
      const res = {
        iteracion: i,
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

  numGenerator = (x0, a, c, m) => {
    const op = (a * x0 + c) % m;
    return op;
  };

  onGenerateKilmogorov() {
    //let arreglados2=this.state.pruebaChi;
    //arreglados2.sort();
    let arreglados2 = [];
    for (var i = 0; i < this.state.randomNums.length; i++) {
      arreglados2.push(this.state.randomNums[i].randomNum);
    }
    arreglados2 = arreglados2.sort();
    let fe = 1 / arreglados2.length;
    let sum = 0;
    for (var i = 0; i < arreglados2.length; i++) {
      sum = sum + arreglados2[i];
    }
    let prom = sum / arreglados2.length;
    let met = "Kilmogorov - Smirnov";
    let lamb = 1 / prom;
    const mensaje = [];
    let fdx = [];
    let frec = [];
    let f1 = [];
    let f2 = [];
    let f1max = 0;
    let f2max = 0;
    let f = 0;
    for (let i = 0; i < arreglados2.length; i++) {
      frec.push(fe * (i + 1));
      fdx.push(1 - Math.exp(-lamb * arreglados2[i]));
      f1.push(Math.abs(frec[i] - fdx[i]));
      if (i == 0) {
        f2.push(Math.abs(fdx[i] - 0));
      } else {
        f2.push(Math.abs(fdx[i] - frec[i - 1]));
      }
    }
    f1.sort();
    f1max = f1[f1.length - 1];
    f2.sort();
    f2max = f2[f2.length - 1];
    if (f1max < f2max) {
      f = f2max;
    } else {
      f = f1max;
    }

    console.log(this.state.selectK);
    if (this.state.selectK == 1) {
      if (arreglados2.length < 21) {
        let ajustada =
          f *
          (Math.sqrt(arreglados2.length) +
            0.12 +
            0.11 / Math.sqrt(arreglados2.length));
        if (
          ajustada <
          this.state.kolsmir[this.state.selectedSK][arreglados2.length - 1]
        ) {
          //this.mostrarMensaje(ajustada+ 'Pasa la prueba pues Es mayor que el valor Kolmogrov Smirnov:' +this.state.kolsmir[this.state.selectedSK][arreglados2.length-1], true);
          console.log(
            ajustada +
              "Pasa la prueba, es mayor que el valor Kolmogrov Smirnov:" +
              this.state.kolsmir[this.state.selectedSK][arreglados2.length - 1]
          );
          const res = {
            mensaje: met,
            r:
              ajustada +
              " Pasa la prueba, es mayor que el valor Kolmogrov Smirnov: " +
              this.state.kolsmir[this.state.selectedSK][arreglados2.length - 1]
          };
          mensaje.push(res);
        } else {
          //this.mostrarMensaje(ajustada+ ' NO Pasa la prueba pues Es mayor que el valor Kolmogrov Smirnov:' +this.state.kolsmir[this.state.selectedSK][arreglados2.length-1], true);
          console.log(
            ajustada +
              " No pasa la prueba, es mayor que el valor Kolmogrov Smirnov:" +
              this.state.kolsmir[this.state.selectedSK][arreglados2.length - 1]
          );
          const res = {
            mensaje: met,
            r:
              ajustada +
              " No pasa la prueba, es mayor que el valor Kolmogrov Smirnov: " +
              this.state.kolsmir[this.state.selectedSK][arreglados2.length - 1]
          };
          mensaje.push(res);
        }
      } else {
        let ajustada =
          f *
          (Math.sqrt(arreglados2.length) +
            0.12 +
            0.11 / Math.sqrt(arreglados2.length));
        let compareKS = 0;
        if (this.state.selectedSK == 0) {
          compareKS = 1.36 / Math.sqrt(arreglados2.length);
        } else {
          compareKS = 1.22 / Math.sqrt(arreglados2.length);
        }
        if (ajustada < compareKS) {
          //this.mostrarMensaje(ajustada+ ' Pasa la prueba pues Es mayor que el valor Kolmogrov Smirnov' +compareKS, true);
          console.log(
            ajustada +
              " Pasa la prueba, es mayor que el valor Kolmogrov Smirnov" +
              compareKS
          );
          const res = {
            mensaje: met,
            r:
              ajustada +
              " Pasa la prueba, es mayor que el valor Kolmogrov Smirnov: " +
              compareKS
          };
          mensaje.push(res);
        } else {
          //this.mostrarMensaje(ajustada+ ' NO Pasa la prueba pues Es mayor que el valor Kolmogrov Smirnov: ' +compareKS, true);
          console.log(
            ajustada +
              " No pasa la prueba, es mayor que el valor Kolmogrov Smirnov: " +
              compareKS
          );
          const res = {
            mensaje: met,
            r:
              ajustada +
              " No pasa la prueba, es mayor que el valor Kolmogrov Smirnov: " +
              compareKS
          };
          mensaje.push(res);
        }
      }
    } else {
      if (arreglados2.length < 21) {
        if (
          f < this.state.kolsmir[this.state.selectedSK][arreglados2.length - 1]
        ) {
          //this.mostrarMensaje(f+ ' Pasa la prueba pues Es menor que el valor Kolmogrov Smirnov:' +this.state.kolsmir[this.state.selectedSK][arreglados2.length-1], true);
          console.log(
            f +
              " Pasa la prueba, es menor que el valor Kolmogrov Smirnov:" +
              this.state.kolsmir[this.state.selectedSK][arreglados2.length - 1]
          );
          const res = {
            mensaje: met,
            r:
              f +
              " Pasa la prueba, es mayor que el valor Kolmogrov Smirnov: " +
              this.state.kolsmir[this.state.selectedSK][arreglados2.length - 1]
          };
          mensaje.push(res);
        } else {
          //this.mostrarMensaje(f+ ' NO Pasa la prueba pues Es mayor que el valor Kolmogrov Smirnov:' +this.state.kolsmir[this.state.selectedSK][arreglados2.length-1], true);
          console.log(
            f +
              " No Pasa la prueba, es mayor que el valor Kolmogrov Smirnov:" +
              this.state.kolsmir[this.state.selectedSK][arreglados2.length - 1]
          );
          const res = {
            mensaje: met,
            r:
              f +
              " No pasa la prueba, es mayor que el valor Kolmogrov Smirnov: " +
              this.state.kolsmir[this.state.selectedSK][arreglados2.length - 1]
          };
          mensaje.push(res);
        }
      } else {
        let compareKS = 0;
        if (this.state.selectedSK == 0) {
          compareKS = 1.36 / Math.sqrt(arreglados2.length);
        } else {
          compareKS = 1.22 / Math.sqrt(arreglados2.length);
        }
        if (f < compareKS) {
          //this.mostrarMensaje(f+ ' Pasa la prueba pues Es menor que el valor Kolmogrov Smirnov:' +compareKS, true);
          console.log(
            f +
              " Pasa la prueba, es menor que el valor Kolmogrov Smirnov:" +
              compareKS
          );
          const res = {
            mensaje: met,
            r:
              f +
              " Pasa la prueba, es mayor que el valor Kolmogrov Smirnov: " +
              compareKS
          };
          mensaje.push(res);
        } else {
          //this.mostrarMensaje(f+ ' NO Pasa la prueba pues Es mayor que el valor Kolmogrov Smirnov:' +compareKS, true);
          console.log(
            f +
              " No pasa la prueba, es mayor que el valor Kolmogrov Smirnov:" +
              compareKS
          );
          const res = {
            mensaje: met,
            r:
              f +
              " No pasa la prueba, es mayor que el valor Kolmogrov Smirnov: " +
              compareKS
          };
          mensaje.push(res);
        }
      }
      this.setState({ ...this.state, mensaje });
    }
  }

  render() {
    const { x0, a, c, m } = this.state;
    return (
      <div>
        <MuiThemeProvider>
          <Card>
            <CardHeader
              title="Método Congruencial Lineal"
              subtitle="Información"
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              <ul>
                <li> Propuesto por Lehmer (1951).</li>
                <li>
                  El propuso una secuencia de números enteros entre 0 y 1
                  siguiendo la siguiente relación recursiva:
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
                  Nótese que se están generando enteros y no números aleatorios.
                  Estos enteros aleatorios deben aparecer uniformemente
                  distribuidos de cero a m.
                </li>
                <li>
                  Números aleatorios entre cero y 1 pueden ser generados de la
                  siguiente manera:
                  <ul>
                    <img src={imgRi} alt="Equation" height="42" width="200" />
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
                  <th>Operación</th>
                  <th>Ri</th>
                </tr>
              </thead>
              <tbody>
                {this.state.randomNums !== []
                  ? this.state.randomNums.map((row, i) => (
                      <tr key={i}>
                        <td>{row.iteracion}</td>
                        <td>{row.operacion}</td>
                        <td>{row.randomNum}</td>
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
              onClick={this.chiOperations}
            />

            <RaisedButton
              label="Kolmogorov - Smirnov"
              secondary={true}
              style={style.button}
              onClick={this.handleSubmitKS}
            />
          </Paper>
          <Card style={{ width: "50%" }}>
            <table className="MyClassName" style={{ width: "100%" }}>
              <thead>
                <tr style={{ textAlign: "left" }}>
                  <th>Método </th>
                  <th>Resultado </th>
                </tr>
              </thead>
              <tbody>
                {this.state.mensaje !== []
                  ? this.state.mensaje.map((row, i) => (
                      <tr key={i}>
                        <td>KS</td>
                        <td>{row.r}</td>
                      </tr>
                    ))
                  : null}
                {this.state.message !== []
                  ? this.state.message.map((row, i) => (
                      <tr key={i}>
                        <td>Chi^2</td>
                        <td>{row.m}</td>
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

export default Congruencial;
