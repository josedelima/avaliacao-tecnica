const express = require("express");
const moment = require("moment");
const {
  calcularHorasDiurnas,
  calcularHorasNoturnas,
  validaDiferencaEntreHoras
} = require('./horasTrabalhadas')



const app = express();

const port = 3000;

app.use(express.json());

app.post("/calculo-horas", (req, res) => {

  json = req.body;

  let dataHoraEntrada = moment(json.data_hora_entrada, "DD/MM/YYYY HH:mm");
  let dataHoraSaida = moment(json.data_hora_saida, "DD/MM/YYYY HH:mm");

  if (!validaDiferencaEntreHoras(dataHoraEntrada, dataHoraSaida)) {
    res.send(
      {
        mensagem: 'Difenrença em entrada e sáida não pode ser maior que 24 horas'
      }
    ).status(402);
  }

  let horasDiurnas = calcularHorasDiurnas(dataHoraEntrada, dataHoraSaida);

  let horasNotunas = calcularHorasNoturnas(dataHoraEntrada, dataHoraSaida);

  res.send(
    {
      horas_diurnas: horasDiurnas,
      horas_noturnas: horasNotunas
    }
  ).status(200)

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
