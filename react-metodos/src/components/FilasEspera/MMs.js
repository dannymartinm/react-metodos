import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import FloatingActionButton from "material-ui/FloatingActionButton";
import Send from "material-ui/svg-icons/content/send";

const style = {
  button: {
    margin: 12
  },
  marginLeft: "95%"
};

const initialState = {
  lambda: 0,
  miu: 0,
  n: 0,
  s: 0,
  res: {}
};

class MMs extends Component {
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
    const { lambda, miu, n, s } = this.state;
    this.setState({ lambda: lambda, miu: miu, n: n, s: s, res: {} });
    this.handleEquations(lambda, miu, n, s);
  };

  handleEquations = (lambda, miu, n, s) => {
    let p = [];
    let cn = 0;
    const ro = lambda / (s * miu);

    //Calculate p0
    let sumatoria = 0;
    for (let i = 0; i <= s - 1; i++) {
      sumatoria += Math.pow(lambda / miu, i) / this.handleFactorial(i);
    }
    const suma = Math.pow(lambda / miu, s) / this.handleFactorial(s);
    const p0 = 1 / (sumatoria + suma * (1 / (1 - lambda / (s * miu))));

    //Calculate lq, l, wq and w
    const lq =
      p0 *
      (Math.pow(lambda / miu, s) * ro) /
      (this.handleFactorial(s) * Math.pow(1 - ro, 2));
    const l = lq + lambda / miu;
    const wq = lq / lambda;
    const w = wq + 1 / miu;

    p[0] = p0;

    if (n <= s) {
      p.push(Math.pow(lambda / miu, n) / this.handleFactorial(n) * p0);
    } else {
      p.push(
        Math.pow(lambda / miu, n) /
          (this.handleFactorial(s) * Math.pow(s, n - s)) *
          p0
      );
    }
    //Calculate Cn
    // if (n < s) {
    //   cn = Math.pow(lambda / miu, n) / this.handleFactorial(n);
    // }

    // if (n >= s) {
    //   cn =
    //     Math.pow(lambda / miu, n) /
    //     (this.handleFactorial(s) * Math.pow(s, n - s));
    // }
    let count = 1;
    while (count <= n) {
      p.push(
        Math.pow(lambda / miu, count) /
          (this.handleFactorial(s) * Math.pow(s, count - s)) *
          p0
      );
      count++;
    }
    const pn = p[p.length - 1];
    this.setState({
      ...this.state,
      res: {
        ro: ro.toFixed(5),
        p0: p0.toFixed(5),
        pn: pn.toFixed(5),
        lq: lq.toFixed(5),
        l: l.toFixed(5),
        wq: wq.toFixed(5),
        w: w.toFixed(5)
      }
    });
  };

  handleFactorial = n => {
    if (n == 1) {
      return 1;
    } else if (n == 0) {
      return 1;
    } else {
      return this.handleFactorial(n - 1) * n;
    }
  };
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Card>
            <CardHeader
              title="M/M/s"
              subtitle="Información"
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              <ul>
                <h2>Modelos de Colas: M/M/s</h2>
                <li>
                  Es un sistema abierto que contiene varios servidores con
                  tiempos de llegada y servicio Marcovianos.
                </li>
                <li>Capacidad Infinita.</li>
                <li>Una Fuente Infinita de Clientes.</li>
                <li>
                  Disciplina FCFS primero que llega, primero que se atiende.
                </li>
              </ul>
            </CardText>
          </Card>
          <Paper style={{ padding: 16, marginBottom: 8 }}>
            <h2>Datos Requeridos</h2>
            <form onSubmit={this.handleSubmit}>
              <TextField
                margin="normal"
                label="lambda"
                placeholder="Lambda"
                name="lambda"
                onChange={this.handleChange}
                fullWidth
                required
              />
              <TextField
                margin="normal"
                label="miu"
                placeholder="Mu"
                name="miu"
                onChange={this.handleChange}
                fullWidth
                required
              />
              <TextField
                margin="normal"
                label="n"
                placeholder="n"
                name="n"
                onChange={this.handleChange}
                fullWidth
                required
              />
              <TextField
                margin="normal"
                label="s"
                placeholder="s"
                name="s"
                onChange={this.handleChange}
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
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default MMs;
