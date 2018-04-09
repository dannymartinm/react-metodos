import React, { Component } from "react";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import imgEq from "../images/cuadradosMediosImg.png";
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
  randomNums: [],
  resChi: [],
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
  /*pruebaChi: [
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
  ]*/
  pruebaChi: [
    0.0044,
    0.0097,
    0.0301,
    0.0575,
    0.0775,
    0.0805,
    0.1059,
    0.1111,
    0.1313,
    0.1502,
    0.1655,
    0.1676,
    0.1956,
    0.196,
    0.2095,
    0.2927,
    0.3161,
    0.3356,
    0.3366,
    0.3508,
    0.3553,
    0.3561,
    0.367,
    0.3746,
    0.43,
    0.4694,
    0.4796,
    0.5027,
    0.5315,
    0.5382,
    0.5494,
    0.552,
    0.5977,
    0.6514,
    0.6526,
    0.6845,
    0.7008,
    0.7154,
    0.7262,
    0.7468,
    0.7533,
    0.7636,
    0.788,
    0.7982,
    0.8206,
    0.8417,
    0.8732,
    0.9022,
    0.968,
    0.9744
  ]
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

  chiOperations = () => {
    let array = [];
    _.map(this.state.randomNums, o => {
      array.push(Number("0." + o.randomNum));
    });

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

    if (this.state.selected == 0.05) {
      if (sumFinal < this.state.chi[0][v - 1]) {
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
              onClick={this.chiOperations}
            />

            <RaisedButton
              label="Kolmogorov - Smirnov"
              secondary={true}
              style={style.button}
              onClick={this.handleSubmit}
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
