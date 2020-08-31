const moment = require('moment')

const INICIO_HORA_DIURNA = '05:00';
const INICIO_HORA_NOTURNA = '22:00';

const DURACAO_MAXIMA_PERIODO_TRABALHADO = 24;
const FORMATO_DATA = "DD/MM/YYYY";
const FORMATO_DATA_HORA = "DD/MM/YYYY HH:mm";


const buscarInicioHoraDiurnaDia = (dataHora) => {
    const data = dataHora.format(FORMATO_DATA);
    const inicioHoraDiurna = moment(data + " " + INICIO_HORA_DIURNA, FORMATO_DATA_HORA);

    return inicioHoraDiurna.clone();
}

const buscarInicioHoraNoturnaDia = (dataHora) => {
    const data = dataHora.format(FORMATO_DATA);
    const inicioHoraNoturna = moment(data + " " + INICIO_HORA_NOTURNA, FORMATO_DATA_HORA);

    return inicioHoraNoturna.clone();
}

const calcularHorasDiurnas = (dataHoraEntrada, dataHoraSaida) => {
    let horaCalculada = moment.duration(dataHoraSaida.diff(dataHoraEntrada));

    const inicioHoraDiurnaEntrada = buscarInicioHoraDiurnaDia(dataHoraEntrada);
    const inicioHoraNoturnaEntrada = buscarInicioHoraNoturnaDia(dataHoraEntrada);
    const inicioHoraDiurnaSaida = buscarInicioHoraDiurnaDia(dataHoraSaida);
    const inicioHoraNoturnaSaida = buscarInicioHoraNoturnaDia(dataHoraSaida);

    if (dataHoraEntrada.isBefore(inicioHoraDiurnaEntrada)) {
        horaCalculada.subtract(moment.duration(inicioHoraDiurnaEntrada.diff(dataHoraEntrada)));
    }

    if (dataHoraEntrada.isBetween(inicioHoraNoturnaEntrada, inicioHoraDiurnaSaida)) {
        horaCalculada.subtract(moment.duration(inicioHoraDiurnaSaida.diff(dataHoraEntrada)));
    }

    if (dataHoraSaida.isBetween(inicioHoraNoturnaEntrada, inicioHoraDiurnaSaida)) {
        horaCalculada.subtract(moment.duration(dataHoraSaida.diff(inicioHoraNoturnaEntrada)));
    }

    if (inicioHoraNoturnaEntrada.isBetween(dataHoraEntrada, dataHoraSaida) && inicioHoraDiurnaSaida.isBetween(dataHoraEntrada, dataHoraSaida)) {
        horaCalculada.subtract(moment.duration(inicioHoraDiurnaSaida.diff(inicioHoraNoturnaEntrada)));
    }

    if (dataHoraSaida.isAfter(inicioHoraNoturnaSaida)) {
        horaCalculada.subtract(moment.duration(dataHoraSaida.diff(inicioHoraNoturnaSaida)));
    }
    
    return moment.utc(horaCalculada.as('milliseconds')).format("HH:mm");
};

const calcularHorasNoturnas = (dataHoraEntrada, dataHoraSaida) => {
    let horaCalculada = moment.duration(0, 'seconds');

    const inicioHoraDiurnaEntrada = buscarInicioHoraDiurnaDia(dataHoraEntrada);
    const inicioHoraNoturnaEntrada = buscarInicioHoraNoturnaDia(dataHoraEntrada);
    const inicioHoraDiurnaSaida = buscarInicioHoraDiurnaDia(dataHoraSaida);
    const inicioHoraNoturnaSaida = buscarInicioHoraNoturnaDia(dataHoraSaida);

    if (dataHoraEntrada.isBefore(inicioHoraDiurnaEntrada)) {
        horaCalculada.add(moment.duration(inicioHoraDiurnaEntrada.diff(dataHoraEntrada)));
    }

    if (dataHoraEntrada.isBetween(inicioHoraNoturnaEntrada, inicioHoraDiurnaSaida)) {
        horaCalculada.add(moment.duration(inicioHoraDiurnaSaida.diff(dataHoraEntrada)));
    }

    if (dataHoraSaida.isBetween(inicioHoraNoturnaEntrada, inicioHoraDiurnaSaida)) {
        horaCalculada.add(moment.duration(dataHoraSaida.diff(inicioHoraNoturnaEntrada)));
    }

    if (inicioHoraNoturnaEntrada.isBetween(dataHoraEntrada, dataHoraSaida) && inicioHoraDiurnaSaida.isBetween(dataHoraEntrada, dataHoraSaida)) {
        horaCalculada.add(moment.duration(inicioHoraDiurnaSaida.diff(inicioHoraNoturnaEntrada)));
    }

    if (dataHoraSaida.isAfter(inicioHoraNoturnaSaida)) {
        horaCalculada.add(moment.duration(dataHoraSaida.diff(inicioHoraNoturnaSaida)));
    }

    return moment.utc(horaCalculada.as('milliseconds')).format("HH:mm");
};

const validaDiferencaEntreHoras = (dataHoraInicial, dataHoraFinal) => {

    const diferecaEntreEntradaSaida = dataHoraFinal.diff(dataHoraInicial);

    const totalHorasTrabalhadas = moment.duration(diferecaEntreEntradaSaida).asHours(); 

    return totalHorasTrabalhadas <= DURACAO_MAXIMA_PERIODO_TRABALHADO;
};


module.exports = {
    calcularHorasDiurnas,
    calcularHorasNoturnas,
    validaDiferencaEntreHoras,
    buscarInicioHoraDiurnaDia,
    buscarInicioHoraNoturnaDia
};

