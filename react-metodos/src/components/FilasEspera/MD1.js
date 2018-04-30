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
  marginLeft: "85%"
  //hacer mas pequeño el boton de enviar
};

const initialState = {
  lambda: 0,
  miu: 0,
  n: 0,
  res: {}
};

class MD1 extends Component {
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
    const { lambda, miu, n, desvS } = this.state;
    this.setState({ lambda: lambda, miu: miu, n: n, res: {} });
    this.handleEquations(lambda, miu, n);
  };

  handleEquations = (lambda, miu, n) => {
    //tiempo de servicio constantes: Distribución estándar. Ej: Caseta de cobro con puro TAG.
    //siempre s=1 para este caso
    //siempre varianza = 0
    //Este es un caso especial del MG1, cuando el tiempo de servicio cte la varianza es = 0

    const ro = lambda / miu;
    if (ro < 1) {
      const p0 = 1 - ro;
      const pn = Math.pow(ro, n) * p0;
      const lq = Math.pow(ro, 2) / (2 * (1 - ro));
      const l = ro + lq;
      const wq = lq / lambda;
      const w = wq + 1 / miu;

      this.setState({
        ...this.state,
        res: {
          ro: ro.toFixed(5),
          p0: p0.toFixed(5),
          pn: pn.toFixed(5),
          l: l.toFixed(5),
          lq: lq.toFixed(5),
          w: w.toFixed(5),
          wq: wq.toFixed(5)
        }
      });
    } else {
      alert("Ro debe ser menor a 1");
    }
  };

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Paper style={{ padding: 16, marginBottom: 8 }}>
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

export default MD1;
