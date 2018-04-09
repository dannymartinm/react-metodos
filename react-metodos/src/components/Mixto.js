import React, { Component } from "react";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import imgEq from "../images/congruencialMixto.png";
import imgEq2 from "../images/congruencialMixto2.png";
import Send from "material-ui/svg-icons/content/send";
import FloatingActionButton from "material-ui/FloatingActionButton";
import RaisedButton from "material-ui/RaisedButton";
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
class Mixto extends Component {
  constructor(props) {
    super();
    this.state = {
      x0: 4,
      a: 5,
      c: 7,
      m: 8,
      iterations: 10,
      randomNums: [],
      mensaje: [],
      selectK: 0,
      selectedSK: 0,
      kolsmir: [[0.975,0.842,0.708,0.624,0.565,0.532,0.486,0.457,0.432,0.410,0.391,0.375,0.361,0.349,
  0.338,0.328,0.318,0.309,0.301,0.294],
  [0.950,0.776,0.642,0.564, 0.510, 0.470, 0.438,0.411, 0.388, 0.368, 0.352, 0.338, 0.325, 0.314, 0.304, 0.295,
  0.286,0.278,0.272, 0.264]],
      pruebaChi: [
        0.0200,
        0.0356,
        0.1355,
        0.5011,
        1.5140,
        1.6055,
        2.3710,
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

  handleSubmitKS = e => {
    const arrayNums = this.state.randomNums;
    let res = [];
    e.preventDefault();
    console.log(this.state.randomNums);
    res = this.onGenerateKilmogorov();
  };

  functionMethod = (x0, a, c, m, iterations) => {
    console.log(this.state);
    if (this.primosRelativos(m, c)) {
      let q = this.findPrimos(m)[0];
      if ((a - 1) % q == 0) {
        if (m % 4 == 0) {
          if ((a - 1) % 4 == 0) {
            console.log("si cumple con el teorema");
          } else {
            console.log("a-1 no es divisble entre 4");
          }
        } else {
          console.log("M no es divisible entre 4");
        }
      } else {
        console.log("a-1 no es divisible entre q");
      }
    } else {
      console.log("No son primos relativos");
    }
    const randomNums = [];
    for (let i = 0; i < iterations; i++) {
      const x0f = i == 0 ? x0 : randomNums[i - 1].randomNum * m;
      const operation = this.numGenerator(x0f, a, c, m);
      const res = {
        iteracion: i,
        a: a,
        c: c,
        m: m,
        x0: x0f,
        operacion: operation,
        randomNum: operation / m
      };
      randomNums.push(res);
    }
    this.setState({ ...this.state, randomNums });
  };

  primosRelativos = (n1, n2) => {
    let a = this.primosDivs(n1);
    let b = this.primosDivs(n2);

    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < b.length; j++) {
        if (a[i] == b[j]) {
          return false;
        }
      }
    }
    return true;
  };

  primosDivs = n => {
    const primos = this.findPrimos(n);
    let primosDivs = [];

    for (let i = 0; i < primos.length; i++) {
      if (n % primos[i] == 0) {
        primosDivs.push(primos[i]);
      }
    }
    return primosDivs;
  };

  findPrimos = n => {
    let a = [];
    for (let i = 1; i <= n; i++) {
      a.push(i);
    }
    for (let j = 1; j < a.length; j++) {
      for (let k = j + 1; k < a.length; k++) {
        if (a[k] % a[j] == 0) {
          a.splice(k, 1);
        }
      }
    }
    a.splice(0, 1);
    return a;
  };

  numGenerator = (x0, a, c, m) => {
    const op = (a * x0 + c) % m;
    return op;
  };

  onGenerateKilmogorov(){
    //let arreglados2=this.state.pruebaChi;
    //arreglados2.sort();
    let arreglados2=[];
    for (var i = 0; i < this.state.randomNums.length; i++) {
      arreglados2.push(this.state.randomNums[i].randomNum);
    }
    arreglados2=arreglados2.sort();
    let fe=1/arreglados2.length;
    let sum=0;
    for (var i = 0; i < arreglados2.length; i++) {
      sum = sum + arreglados2[i];
    }
    let prom = sum/arreglados2.length;
    let met = "Kilmogorov - Smirnov";
    let lamb = 1/prom;
    const mensaje =[];
    let fdx=[];
    let frec=[];
    let f1=[];
    let f2=[];
    let f1max=0;
    let f2max=0;
    let f=0;
    for(let i=0; i<arreglados2.length;i++){
      frec.push(fe*(i+1));
      fdx.push(1-Math.exp((-lamb)*arreglados2[i]));
      f1.push(Math.abs(frec[i]-fdx[i]));
      if (i==0) {
        f2.push(Math.abs(fdx[i]-0));
      }else{
        f2.push(Math.abs(fdx[i]-frec[i-1]));
      }
      
    }
    f1.sort();
    f1max=f1[f1.length-1];
    f2.sort();
    f2max=f2[f2.length-1];
    if(f1max<f2max){
      f=f2max;
    }else{
      f=f1max;
    }
    
    console.log(this.state.selectK);
    if(this.state.selectK==1){
      if(arreglados2.length<21){
        let ajustada=f*(Math.sqrt(arreglados2.length)+0.12+(0.11/Math.sqrt(arreglados2.length)));
        if(ajustada<this.state.kolsmir[this.state.selectedSK][arreglados2.length-1]){
          //this.mostrarMensaje(ajustada+ 'Pasa la prueba pues Es mayor que el valor Kolmogrov Smirnov:' +this.state.kolsmir[this.state.selectedSK][arreglados2.length-1], true);
          console.log(ajustada+ 'Pasa la prueba pues Es mayor que el valor Kolmogrov Smirnov:' +this.state.kolsmir[this.state.selectedSK][arreglados2.length-1]);
          const res = {
            mensaje: met,
            r: ajustada+ ' Pasa la prueba pues es mayor que el valor Kolmogrov Smirnov: ' +this.state.kolsmir[this.state.selectedSK][arreglados2.length-1]
          };
          mensaje.push(res);
        }else{
          //this.mostrarMensaje(ajustada+ ' NO Pasa la prueba pues Es mayor que el valor Kolmogrov Smirnov:' +this.state.kolsmir[this.state.selectedSK][arreglados2.length-1], true);
          console.log(ajustada+ ' NO Pasa la prueba pues Es mayor que el valor Kolmogrov Smirnov:' +this.state.kolsmir[this.state.selectedSK][arreglados2.length-1]);
          const res = {
            mensaje: met,
            r: ajustada+ ' NO Pasa la prueba pues es mayor que el valor Kolmogrov Smirnov: ' +this.state.kolsmir[this.state.selectedSK][arreglados2.length-1]
          };
          mensaje.push(res);
        }
      }else{
        let ajustada=f*(Math.sqrt(arreglados2.length)+0.12+(0.11/Math.sqrt(arreglados2.length)));
        let compareKS=0;
        if(this.state.selectedSK==0){
          compareKS=1.36/Math.sqrt(arreglados2.length);
        }else{
          compareKS=1.22/Math.sqrt(arreglados2.length);
        }
        if(ajustada<compareKS){
          //this.mostrarMensaje(ajustada+ ' Pasa la prueba pues Es mayor que el valor Kolmogrov Smirnov' +compareKS, true);
          console.log(ajustada+ ' Pasa la prueba pues Es mayor que el valor Kolmogrov Smirnov' +compareKS);
          const res = {
            mensaje: met,
            r: ajustada+ ' Pasa la prueba pues es mayor que el valor Kolmogrov Smirnov: ' +compareKS
          };
          mensaje.push(res);
        }else{
          //this.mostrarMensaje(ajustada+ ' NO Pasa la prueba pues Es mayor que el valor Kolmogrov Smirnov: ' +compareKS, true);
          console.log(ajustada+ ' NO Pasa la prueba pues Es mayor que el valor Kolmogrov Smirnov: ' +compareKS);
          const res = {
            mensaje: met,
            r: ajustada+ ' NO Pasa la prueba pues es mayor que el valor Kolmogrov Smirnov: ' +compareKS
          };
          mensaje.push(res);
        }
      }
    }else{
      if(arreglados2.length<21){
        if(f<this.state.kolsmir[this.state.selectedSK][arreglados2.length-1]){
          //this.mostrarMensaje(f+ ' Pasa la prueba pues Es menor que el valor Kolmogrov Smirnov:' +this.state.kolsmir[this.state.selectedSK][arreglados2.length-1], true);
          console.log(f+ ' Pasa la prueba pues Es menor que el valor Kolmogrov Smirnov:' +this.state.kolsmir[this.state.selectedSK][arreglados2.length-1]);
          const res = {
            mensaje: met,
            r: f+ ' Pasa la prueba pues es mayor que el valor Kolmogrov Smirnov: ' +this.state.kolsmir[this.state.selectedSK][arreglados2.length-1]
          };
          mensaje.push(res);
        }else{
          //this.mostrarMensaje(f+ ' NO Pasa la prueba pues Es mayor que el valor Kolmogrov Smirnov:' +this.state.kolsmir[this.state.selectedSK][arreglados2.length-1], true);
          console.log(f+ ' NO Pasa la prueba pues Es mayor que el valor Kolmogrov Smirnov:' +this.state.kolsmir[this.state.selectedSK][arreglados2.length-1]);
          const res = {
            mensaje: met,
            r: f+ ' NO Pasa la prueba pues es mayor que el valor Kolmogrov Smirnov: ' +this.state.kolsmir[this.state.selectedSK][arreglados2.length-1]
          };
          mensaje.push(res);
        }
      }else{
        let compareKS=0;
        if(this.state.selectedSK==0){
          compareKS=1.36/Math.sqrt(arreglados2.length);
        }else{
          compareKS=1.22/Math.sqrt(arreglados2.length);
        }
        if(f<compareKS){
          //this.mostrarMensaje(f+ ' Pasa la prueba pues Es menor que el valor Kolmogrov Smirnov:' +compareKS, true);
          console.log(f+ ' Pasa la prueba pues Es menor que el valor Kolmogrov Smirnov:' +compareKS);
          const res = {
            mensaje: met,
            r: f+ ' Pasa la prueba pues es mayor que el valor Kolmogrov Smirnov: ' +compareKS
          };
          mensaje.push(res);
        }else{
          //this.mostrarMensaje(f+ ' NO Pasa la prueba pues Es mayor que el valor Kolmogrov Smirnov:' +compareKS, true);
          console.log(f+ ' NO Pasa la prueba pues Es mayor que el valor Kolmogrov Smirnov:' +compareKS);
          const res = {
            mensaje: met,
            r: f+ ' NO Pasa la prueba pues es mayor que el valor Kolmogrov Smirnov: ' +compareKS
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
              title="Método Congruencial Mixto"
              subtitle="Información"
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              <ul>
                <li>
                  Sea el generador congruencial:
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
                  Los parámetros para un generador congruencial mixto se basan
                  en el Teorema de HULL-DOBELL.
                </li>
                <li>
                  El generador congruencial mixto tiene periodo completo si y
                  sólo si:
                  <ul>
                    <li>
                      i) Sea c y m primos relativo (el máximo común divisor
                      entero c y m es 1)
                    </li>

                    <li>
                      ii) Si q es un número primo que divide a m; entonces, q
                      divide a (a-1)
                      <ul>
                        <img
                          src={imgEq2}
                          alt="Equation"
                          height="22"
                          width="100"
                        />
                      </ul>
                    </li>
                    <li>
                      iii) Si 4 divide a m; entonces, 4 divide a (a-1). Es
                      decir, 𝑎 ≡ 1𝑚𝑜𝑑4
                    </li>
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
                  <th>Valor Operación</th>
                  <th>Ri</th>
                </tr>
              </thead>
              <tbody>
                {this.state.randomNums !== []
                  ? this.state.randomNums.map((row, i) => (
                      <tr key={i}>
                        <td>{row.iteracion}</td>
                        <td>
                          ({row.a}*{row.x0}+{row.c})%{row.m}
                        </td>
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
              onClick={this.handleSubmitChi}
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
                        <td>{row.mensaje}</td>
                        <td>{row.r}</td>
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

export default Mixto;
