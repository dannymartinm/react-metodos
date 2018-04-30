import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
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
  desvS: 0,
  res: {}
};

class MG1 extends Component {
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
    this.setState({ lambda: lambda, miu: miu, n: n, desvS: desvS, res: {} });
    this.handleEquations(lambda, miu, n, desvS);
  };

  handleEquations = (lambda, miu, n, desvS) => {
    //Siempre s=1 para este caso

    const ro = lambda / miu;
    let varianza = 0;
    if (ro < 1) {
      const p0 = 1 - ro;
      const pn = Math.pow(ro, n) * p0;
      //const media = 1 / miu;
      if (desvS === 0) {
        varianza = 1 / Math.pow(miu, 2);
      } else {
        varianza = Math.pow(desvS, 2);
      }
      const lq =
        (Math.pow(lambda, 2) * varianza + Math.pow(ro, 2)) / (2 * (1 - ro));
      const l = ro + lq;
      const wq = lq / lambda;
      const w = wq + 1 / miu;

      this.setState({
        ...this.state,
        res: {
          ro: ro.toFixed(5),
          p0: p0.toFixed(5),
          pn: pn.toFixed(5),
          varianza: varianza.toFixed(5),
          l: l.toFixed(5),
          lq: lq.toFixed(5),
          w: w.toFixed(5),
          wq: wq.toFixed(5)
        }
      });
    } else {
      alert("Ro debe ser menor que 1");
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
              <TextField
                margin="normal"
                label="desvS"
                placeholder="Desviación Estándar"
                name="desvS"
                onChange={this.handleChange}
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
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default MG1;
