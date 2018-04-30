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
  res: {}
};

class MM1 extends Component {
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
    const { lambda, miu, n } = this.state;
    this.setState({ lambda: lambda, miu: miu, n: n, res: {} });
    this.handleEquations(lambda, miu, n);
  };

  handleEquations = (lambda, miu, n) => {
    console.log(lambda, miu, n);
    let p = [];
    const l = lambda / (miu - lambda);
    const lq = Math.pow(lambda, 2) / (miu * (miu - lambda));
    const w = l / lambda;
    const wq = lq / lambda;
    const ro = lambda / miu;
    const p0 = 1 - ro;
    p[0] = p0;
    p.push(Math.pow(ro, n) * (1 - ro));
    const pn = p[p.length - 1];

    this.setState({
      ...this.state,
      res: {
        l: l,
        lq: lq,
        w: w,
        wq: wq,
        ro: ro,
        p0: p0,
        pn: pn
      }
    });
  };

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Card>
            <CardHeader
              title="M/M/1"
              subtitle="Información"
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              <ul>
                <h2>Modelos de Colas: M/M/1</h2>
                <li>
                  Es un sistema abierto que contiene un único servidor con
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

export default MM1;
