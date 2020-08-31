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
    let horaCalculada = moment.duration(dataHoraSaida.diff(dataHoraEntrada));//moment.duration(0, 'seconds');

    

    const inicioHoraDiurnaEntrada = buscarInicioHoraDiurnaDia(dataHoraEntrada);
    const inicioHoraNoturnaEntrada = buscarInicioHoraNoturnaDia(dataHoraEntrada);
    const inicioHoraDiurnaSaida = buscarInicioHoraNoturnaDia(dataHoraSaida);
    const inicioHoraNoturnaSaida = buscarInicioHoraNoturnaDia(dataHoraSaida);

    if (dataHoraEntrada.isBefore(inicioHoraDiurnaEntrada)) {
        horaCalculada.subtract(moment.duration(inicioHoraDiurnaEntrada.diff(dataHoraEntrada)));
    }

    if (dataHoraEntrada.isBetween(inicioHoraNoturnaEntrada, inicioHoraDiurnaSaida)) {
        horaCalculada.subtract(moment.duration(inicioHoraDiurnaSaida.diff(dataHoraEntrada)));
    }

    if (inicioHoraNoturnaEntrada.isBetween(dataHoraEntrada, dataHoraSaida) && inicioHoraDiurnaSaida.isBetween(dataHoraEntrada, dataHoraSaida)) {
        horaCalculada.subtract(moment.duration(inicioHoraDiurnaSaida.diff(inicioHoraNoturnaEntrada)));
    }




    /*if (dataHoraEntrada.format(FORMATO_DATA) == dataHoraSaida.format(FORMATO_DATA)) {
        const inicioHoraDiurna = buscarInicioHoraDiurnaDia(dataHoraEntrada);
        const inicioHoraNoturna = buscarInicioHoraNoturnaDia(dataHoraSaida);


        if (dataHoraEntrada.isBetween(inicioHoraDiurna, inicioHoraNoturna) && dataHoraSaida.isBetween(inicioHoraDiurna, inicioHoraNoturna)) {
            horaCalculada.add(moment.duration(dataHoraSaida.diff(dataHoraEntrada)));
        } else if (dataHoraEntrada.isBetween(inicioHoraDiurna, inicioHoraNoturna) && !dataHoraSaida.isBetween(inicioHoraDiurna, inicioHoraNoturna)) {
            horaCalculada.add(moment.duration(inicioHoraNoturna.diff(dataHoraEntrada)));
        } else if (!dataHoraEntrada.isBetween(inicioHoraDiurna, inicioHoraNoturna) && dataHoraSaida.isBetween(inicioHoraDiurna, inicioHoraNoturna)) {
            horaCalculada.add(moment.duration(dataHoraSaida.diff(inicioHoraDiurna)));
        } else {
            horaCalculada.add(moment.duration(inicioHoraNoturna.diff(inicioHoraDiurna)));
        }
    } else {
        const inicioHoraDiurnaEntrada = buscarInicioHoraDiurnaDia(dataHoraEntrada);
        const inicioHoraNoturnaEntrada = buscarInicioHoraNoturnaDia(dataHoraEntrada);
        const inicioHoraNoturnaSaida = buscarInicioHoraNoturnaDia(dataHoraSaida);
        const inicioHoraNoturnaSaida = buscarInicioHoraNoturnaDia(dataHoraSaida);


        if (dataHoraEntrada.isBetween(inicioHoraDiurna, inicioHoraNoturna) && dataHoraSaida.isBetween(inicioHoraDiurna, inicioHoraNoturna)) {
            horaCalculada.add(moment.duration(dataHoraSaida.diff(dataHoraEntrada)));
        } else if (dataHoraEntrada.isBetween(inicioHoraDiurna, inicioHoraNoturna) && !dataHoraSaida.isBetween(inicioHoraDiurna, inicioHoraNoturna)) {
            horaCalculada.add(moment.duration(inicioHoraNoturna.diff(dataHoraEntrada)));
        } else if (!dataHoraEntrada.isBetween(inicioHoraDiurna, inicioHoraNoturna) && dataHoraSaida.isBetween(inicioHoraDiurna, inicioHoraNoturna)) {
            horaCalculada.add(moment.duration(dataHoraSaida.diff(inicioHoraDiurna)));
        } else {
            horaCalculada.add(moment.duration(inicioHoraNoturna.diff(inicioHoraDiurna)));
        }
    }*/

    
    return moment.utc(horaCalculada.as('milliseconds')).format("HH:mm");
};

const validaDiferencaEntreHoras = (dataHoraInicial, dataHoraFinal) => {

    const diferecaEntreEntradaSaida = dataHoraFinal.diff(dataHoraInicial);

    const totalHorasTrabalhadas = moment.duration(diferecaEntreEntradaSaida).asHours(); 

    return totalHorasTrabalhadas <= DURACAO_MAXIMA_PERIODO_TRABALHADO;
};


module.exports = {
    calcularHorasDiurnas,
    validaDiferencaEntreHoras,
    buscarInicioHoraDiurnaDia,
    buscarInicioHoraNoturnaDia
};

