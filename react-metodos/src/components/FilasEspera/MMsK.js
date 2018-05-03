import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Card, CardHeader, CardText } from "material-ui/Card";
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
  res: {},
  resultado: [],
  resC: []
};

class MMsK extends Component {
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

  handleSubmitCosto = e => {
    e.preventDefault();
    const { cfila, cservicio } = this.state;
    this.setState({ cfila: cfila, cservicio: cservicio });
    this.handleEquationsCosto(cfila, cservicio);
  };

  handleEquationsCosto = (cfila, cservicio) => {
  	const lqc = this.state.resultado[0].lq;
    const sc = this.state.s;
    const costo = lqc*cfila +  sc* cservicio;
    const c = {
      costo : costo.toFixed(5)};
    this.state.resC.push(c);
  }

  handleEquations = (lambda, miu, n, s, k) => {
    let p = [];
    let ro = 0;
    let p0 = 0;
    let pn = 0;
    let l = 0;
    let lq = 0;
    let w = 0;
    let wq = 0;
    let cn = 0;
    let lambdaE = 0;
    let pk = 0;
    ro = lambda / (s * miu);
    if (s > k) {
      alert("¡Cuidado! K debe ser mayor que s.");
    } if(ro > 1){
    	alert("Ro debe ser menor que 1");
    } else {
      
      if (s === 1) {
        p0 = (1 - ro) / (1 - Math.pow(ro, k + 1));
        p.push(p0);

        //Calculate pn
        p.push(Math.pow(ro, n) * p0);

        //Calculate Pk
        pk =
          Math.pow(lambda / miu, k) /
          (this.handleFactorial(s) * Math.pow(s, k - s)) *
          p0;
        l =
          ro / (1 - ro) -
          (k + 1) * Math.pow(ro, k + 1) / (1 - Math.pow(ro, k + 1));

        lq = l - 1 * (1 - p0);

        if (n <= k) {
          cn = Math.pow(lambda / miu, n);
        } else {
          cn = 0;
        }
        lambdaE = lambda * (1 - pk);
        wq = lq / lambdaE;
        w = wq + 1 / miu;
      } else {
        p0 =
          1 /
          (this.handleSumatoria(lambda, miu, s) +
            Math.pow(lambda / miu, s) /
              this.handleFactorial(s) *
              this.handleSumatoria2(lambda, miu, s, k));
        p.push(p0);
        lq =
          p0 *
          Math.pow(lambda / miu, s) *
          ro /
          (this.handleFactorial(s) * Math.pow(1 - ro, 2)) *
          (1 - Math.pow(ro, k - s) - (k - s) * Math.pow(ro, k - s) * (1 - ro));

        if (n < s) {
          p.push(Math.pow(lambda / miu, n) / this.handleFactorial(n) * p0);
        } else if (n >= s && n <= k) {
          p.push(
            Math.pow(lambda / miu, n) /
              (this.handleFactorial(s) * Math.pow(s, n - s)) *
              p0
          );
        } else if (n > k) {
          p.push(0);
        }

        pk =
          Math.pow(lambda / miu, k) /
          (this.handleFactorial(s) * Math.pow(s, k - s)) *
          p0;
        lambdaE = lambda * (1 - pk);
        wq = lq / lambdaE;
        w = wq + 1 / miu;
        l = lambdaE * w;

        if (n < s) {
          cn = Math.pow(lambda / miu, n) / this.handleFactorial(n);
        } else if (n <= k && n >= s) {
          cn =
            Math.pow(lambda / miu, n) /
            (this.handleFactorial(s) * Math.pow(s, n - s));
        } else if (n > k) {
          cn = 0;
        }
      }
    }

    pn = p[p.length - 1];
    const clProm = 1 - p0;

    this.setState({
      ...this.state,
      res: {
        ro: ro.toFixed(5),
        p0: p0.toFixed(5),
        pk: pk.toFixed(5),
        pn: pn.toFixed(5),
        cn: cn.toFixed(5),
        lambdaE: lambdaE.toFixed(5),
        lq: lq.toFixed(5),
        l: l.toFixed(5),
        wq: wq.toFixed(5),
        w: w.toFixed(5),
        clProm: clProm.toFixed(5)
      }
    });
    const r = {l: l.toFixed(5),
        lq: lq.toFixed(5),
        w: w.toFixed(5),
        wq: wq.toFixed(5),
        ro: ro.toFixed(5),
        p0: p0.toFixed(5),
        pn: pn.toFixed(5),
        pk: pk.toFixed(5),
        lambdaE: lambdaE.toFixed(5),
        clProm: clProm.toFixed(5),
        cn : cn.toFixed(5)};
    this.state.resultado.push(r);
  };

  handleFactorial = n => {
    if (n === 1) {
      return 1;
    } else if (n === 0) {
      return 1;
    } else {
      return this.handleFactorial(n - 1) * n;
    }
  };

  handleSumatoria = (lambda, miu, s) => {
    let res = 0;
    for (let i = 0; i <= s; i++) {
      res += Math.pow(lambda / miu, i) / this.handleFactorial(i);
    }
    return res;
  };

  handleSumatoria2 = (lambda, miu, s, k) => {
    let resultado = 0;
    for (let i = s + 1; i <= k; i++) {
      resultado += Math.pow(lambda / (s * miu), i - s);
    }
    return resultado;
  };

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Card>
            <CardHeader
              title="M/M/s/K"
              subtitle="Información"
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              <ul>
                <h2>Modelos de Colas: M/M/s/K</h2>
                <li>
                  Es un sistema abierto que contiene uno o más servidores con
                  tiempos de llegada y servicio Marcovianos.
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
                label="k"
                placeholder="K"
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
                       Pk:
                       <a>{row.pk}</a>
                      </label> <p></p>
                      <label>
                       Lambde E:
                       <a>{row.lambdaE}</a>
                      </label> <p></p>
                      <label>
                       Cl Promedio:
                       <a>{row.clProm}</a>
                      </label> <p></p>
                      <label>
                       Cn:
                       <a>{row.cn}</a>
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

export default MMsK;
