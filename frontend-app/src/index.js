import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { Button, DatePicker, TimePicker } from "react-materialize";

class CustomDatePicker extends React.Component {
  formatarData(data) {
    let dia = String(data.getDate());
    if (dia.length === 1) {
      dia = "0" + dia;
    }

    let mes = String(parseInt(data.getMonth() + 1));

    if (mes.length === 1) {
      mes = "0" + mes;
    }

    let dataFormatada = dia + "/" + mes + "/" + data.getFullYear();
    return dataFormatada;
  }

  render() {
    let valor = "";
    return (
      <div>
        <DatePicker
          label={this.props.label}
          id={this.props.id}
          options={{
            autoClose: false,
            container: null,
            defaultDate: null,
            disableDayFn: null,
            disableWeekends: false,
            events: [],
            firstDay: 0,
            format: "dd/mm/yyyy",
            i18n: {
              cancel: "Cancelar",
              clear: "Limpar",
              done: "Ok",
              months: [
                "Janeiro",
                "Fevereiro",
                "Março",
                "Abril",
                "Maio",
                "Junho",
                "Julho",
                "Agosto",
                "Setembro",
                "Outubro",
                "Novembro",
                "Dezembro",
              ],
              monthsShort: [
                "Jan",
                "Fev",
                "Mar",
                "Abr",
                "Mai",
                "Jun",
                "Jul",
                "Ago",
                "Set",
                "Out",
                "Nov",
                "Dez",
              ],
              nextMonth: "›",
              previousMonth: "‹",
              weekdays: [
                "Domingo",
                "Segunda-feira",
                "Terça-Feira",
                "Quarta-feira",
                "Quinta-feira",
                "Sexta-feira",
                "Sábado",
              ],
              weekdaysAbbrev: ["D", "S", "T", "Q", "Q", "S", "S"],
              weekdaysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
            },
            isRTL: false,
            maxDate: null,
            minDate: null,
            onClose: () => {
              this.props.onChange(valor);
            },
            onDraw: null,
            onOpen: null,
            onSelect: (e) => {
              valor = this.formatarData(e);
            },
            parse: null,
            setDefaultDate: false,
            showClearBtn: false,
            showDaysInNextAndPreviousMonths: false,
            showMonthAfterYear: false,
            yearRange: 10,
          }}
        />
      </div>
    );
  }
}

class CustomTimerPicker extends React.Component {
  selecionar() {
    console.log("aqui");
  }
  render() {
    let valor = "";
    return (
      <div>
        <TimePicker
          label={this.props.label}
          id={this.props.id}
          onSelect={(event) => {
            valor = event.target.value;
          }}
          options={{
            autoClose: false,
            container: null,
            defaultTime: "now",
            duration: 350,
            fromNow: 0,
            i18n: {
              cancel: "Cancelar",
              clear: "Limpar",
              done: "Ok",
            },
            onCloseEnd: () => {
              this.props.onChange(valor);
            },
            onCloseStart: null,
            onOpenEnd: null,
            onOpenStart: null,
            onSelect: (e) => {
              valor = e;
            },
            showClearBtn: false,
            twelveHour: false,
            vibrate: true,
          }}
        />
      </div>
    );
  }
}

class Formulario extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data_entrada: "",
      hora_entrada: "",
      data_saida: "",
      hora_saida: "",
    };

    this.enviarFormulario = this.enviarFormulario.bind(this);
  }

  enviarFormulario() {
    const dataHoraEntrada =
      this.state.data_entrada + " " + this.state.hora_entrada;
    const dataHoraSaida = this.state.data_saida + " " + this.state.hora_saida;

    const periodo = {
      data_hora_entrada: dataHoraEntrada,
      data_hora_saida: dataHoraSaida,
    };

    fetch("http://localhost:3030/calculo-horas", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data_hora_entrada: dataHoraEntrada,
        data_hora_saida: dataHoraSaida,
      }),
    }).then(res => {
      return res.json();
    }).then(json => {
      console.log(json);

      let mensagem = "Diurnas: " + json.horas_diurnas + " e Nortunas " + json.horas_noturnas;

      if (json.mensagem) {
        mensagem = json.mensagem;
      }

      this.props.onSubmit(mensagem);

    })
    console.log(periodo);
  }

  render() {
    return (
      <div>
        <div>
          <CustomDatePicker
            label="Data Entrada"
            id="data_entrada"
            onChange={(event) => {
              this.setState({ data_entrada: event });
              console.log(event);
            }}
          />
        </div>
        <div>
          <CustomTimerPicker
            label="Hora Entrada"
            id="hora_entrada"
            onChange={(event) => {
              this.setState({ hora_entrada: event });
              console.log(event);
            }}
          />
        </div>
        <div>
          <CustomDatePicker
            label="Data Saída"
            id="data_saida"
            onChange={(event) => {
              this.setState({ data_saida: event });
              console.log(event);
            }}
          />
        </div>
        <div>
          <CustomTimerPicker
            label="Hora Saída"
            id="hora_saida"
            onChange={(event) => {
              this.setState({ hora_saida: event });
              console.log(event);
            }}
          />
        </div>

        <Button
          node="button"
          style={{
            marginRight: "5px",
          }}
          waves="light"
          onClick={() => this.enviarFormulario()}
        >
          Enviar informações
        </Button>
      </div>
    );
  }
}

class Principal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mensagem: ""
    }
  }

  render() {

    return (
      <div>
        <Formulario onSubmit={(mensagem) => {this.setState({mensagem: mensagem})}} />
      
      
        <h3>Horas trabalhadas</h3>
        <h4>{this.state.mensagem}</h4>
      </div>
    );
  }
}

ReactDOM.render(<Principal />, document.getElementById("root"));
