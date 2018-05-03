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
  res: {},
  resultado: [],
  resC: []
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

  handleSubmitCosto = e => {
    e.preventDefault();
    const { cfila, cservicio } = this.state;
    this.setState({ cfila: cfila, cservicio: cservicio });
    this.handleEquationsCosto(cfila, cservicio);
  };

  handleEquationsCosto = (cfila, cservicio) => {
    const lqc = this.state.resultado[0].lq;
    const sc = 1;
    const costo = lqc*cfila +  sc* cservicio;
    const c = {
      costo : costo.toFixed(5)};
    this.state.resC.push(c);
  }

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
      const r = {l: l.toFixed(5),
        lq: lq.toFixed(5),
        w: w.toFixed(5),
        wq: wq.toFixed(5),
        ro: ro.toFixed(5),
        p0: p0.toFixed(5),
        pn: pn.toFixed(5),
        varianza: varianza.toFixed(5)};
    this.state.resultado.push(r);
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
          <Paper style={{ padding: 16, marginBottom: 8 }}>
            <h2>Resultados</h2>
            {this.state.resultado !== []
                  ? this.state.resultado.map((row, i) => (
                  <div id="res">
                      <label>
                       L: 
                       <a>{row.l}</a>
                      </label> <p></p>
                      <label>
                       Lq:
                       <a>{row.lq}</a>
                      </label> <p></p>
                      <label> 
                       W:
                       <a>{row.w}</a>
                      </label> <p></p>
                      <label>
                       Wq: 
                       <a>{row.wq}</a>
                      </label> <p></p>
                      <label>
                       Ro:
                       <a>{row.ro}</a>
                      </label> <p></p>
                      <label>
                       P0:
                       <a>{row.p0}</a>
                      </label> <p></p>
                      <label>
                       Pn:
                       <a>{row.pn}</a>
                      </label> <p></p>
                      <label>
                       Varianza:
                       <a>{row.varianza}</a>
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
                placeholder="Costo en Fila"
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
                      </label> <p></p>
                      
                  </div>
                    ))
                  : null}
          </Paper>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default MG1;
