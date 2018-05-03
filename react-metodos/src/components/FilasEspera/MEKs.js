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
  s: 0,
  k: 0,
  res: {},
  resultado: [],
  resC: []
};

class MEKs extends Component {
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
    this.setState({
      lambda: lambda,
      miu: miu,
      n: n,
      s: s,
      k: k,
      res: {}
    });
    this.handleEquations(lambda, miu, n, s, k);
  };

  handleSubmitCosto = e => {
    e.preventDefault();
    const { cfila, cservicio } = this.state;
    this.setState({ cfila: cfila, cservicio: cservicio });
    this.handleEquationsCosto(cfila, cservicio);
  };

  handleEquationsCosto = (cfila, cservicio) => {
    const lqc = this.state.resultado[0].lq;
    const sc = this.state.s;
    const costo = lqc * cfila + sc * cservicio;
    const c = {
      costo: costo.toFixed(5)
    };
    this.state.resC.push(c);
  };

  handleEquations = (lambda, miu, n, s, k) => {
    //Distribución de Erlang de tiempos de servicio
    //Distribución no uniforme, s servidores con tiempos entre llegadas exponenciales.
    const ro = lambda / (miu * s);
    if (s > k) {
      alert("K debe ser mayor que s.");
    } else {
      if (ro < 1) {
        const p0 = 1 - ro;
        const pn = Math.pow(ro, n) * p0;
        const lq =
          (1 + k) / (2 * k) * (Math.pow(lambda, 2) / (miu * (miu - lambda)));
        const wq = lq / lambda;
        const w = wq + 1 / miu;
        const l = lambda * w;

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
        const r = {
          l: l.toFixed(5),
          lq: lq.toFixed(5),
          w: w.toFixed(5),
          wq: wq.toFixed(5),
          ro: ro.toFixed(5),
          p0: p0.toFixed(5),
          pn: pn.toFixed(5)
        };
        this.state.resultado.push(r);
      } else {
        alert("Ro debe ser menor a 1");
      }
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
                label="k"
                placeholder="k"
                name="k"
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
          <Paper style={{ padding: 16, marginBottom: 8 }}>
            <h2>Resultados</h2>
            {this.state.resultado !== []
              ? this.state.resultado.map((row, i) => (
                  <div id="res">
                    <label>
                      L:
                      <a>{"\t" + row.l + "\t clientes"}</a>
                    </label>
                    <p />
                    <label>
                      Lq:
                      <a>{"\t" + row.lq + "\t clientes"}</a>
                    </label>
                    <p />
                    <label>
                      W:
                      <a>{"\t" + row.w + "\t horas"}</a>
                    </label>
                    <p />
                    <label>
                      Wq:
                      <a>{"\t" + row.wq + "\t horas"}</a>
                    </label>
                    <p />
                    <label>
                      Ro:
                      <a>{row.ro}</a>
                    </label>
                    <p />
                    <label>
                      P0:
                      <a>{row.p0}</a>
                    </label>
                    <p />
                    <label>
                      Pn:
                      <a>{row.pn}</a>
                    </label>
                  </div>
                ))
              : null}
          </Paper>

          <Paper style={{ padding: 16, marginBottom: 8 }}>
            <h2>Costo</h2>
            <form onSubmit={this.handleSubmitCosto}>
              <TextField
                margin="normal"
                label="cfila"
                placeholder="Costo por Tiempo de Espera"
                name="cfila"
                onChange={this.handleChange}
                fullWidth
                required
              />
              <TextField
                margin="normal"
                label="cservicio"
                placeholder="Costo del Servicio"
                name="cservicio"
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
          <Paper style={{ padding: 16, marginBottom: 8 }}>
            <h2>Costo Total del Sistema</h2>
            {this.state.resC !== []
              ? this.state.resC.map((row, i) => (
                  <div id="res">
                    <label>
                      CT:
                      <a>{row.costo}</a>
                    </label>{" "}
                    <p />
                  </div>
                ))
              : null}
          </Paper>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default MEKs;
