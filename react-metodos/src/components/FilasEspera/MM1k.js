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
  k: 0,
  res: {}
};

class MM1k extends Component {
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
    const { lambda, miu, n, s, k } = this.state;
    this.setState({ lambda: lambda, miu: miu, n: n, s: s, k: k, res: {} });
    this.handleEquations(lambda, miu, n, s, k);
  };

  handleEquations = (lambda, miu, n, s, k) => {
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
                <h2>Modelos de Colas: M/M/1/k</h2>
                <li>
                  Es un sistema abierto que contiene un servidor con tiempos de
                  llegada y servicio Marcovianos.
                </li>
                <li>Capacidad Infinita.</li>
                <li>Fuente de entrada de K clientes en el sistema.</li>
                <li>
                  Disciplina FCFS primero que llega, primero que se atiende.
                </li>
                <li>
                  Si el sistema esta lleno, no se permitirá la entrada de nuevos
                  clientes al sistema. Por lo que, la tasa de llegada efectiva
                  no es constante y varía con el tiempo.
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

export default MM1k;
