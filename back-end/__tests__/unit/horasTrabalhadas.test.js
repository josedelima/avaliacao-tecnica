const moment = require('moment');
const {
        calcularHorasDiurnas,
        calcularHorasNoturnas,
        validaDiferencaEntreHoras,
        buscarInicioHoraDiurnaDia,
        buscarInicioHoraNoturnaDia
    } = require('../../src/horasTrabalhadas')

test('Calculo da hora diurna mesmo dia de entrada e saida', () => {
    const dataHoraInicial = moment("29/08/2020 15:00", "DD/MM/YYYY HH:mm");
    const dataHoraFinal = moment("29/08/2020 23:00", "DD/MM/YYYY HH:mm");

    const horasDiurnasTrabalhas = calcularHorasDiurnas(dataHoraInicial, dataHoraFinal)

    expect(horasDiurnasTrabalhas).toBe('07:00');
    
});

test('Calculo da hora diurna dias diferentes de entrada e saida, com saída no meio da horas noturnas', () => {
    const dataHoraInicial = moment("29/08/2020 19:00", "DD/MM/YYYY HH:mm");
    const dataHoraFinal = moment("30/08/2020 04:00", "DD/MM/YYYY HH:mm");

    const horasDiurnasTrabalhas = calcularHorasDiurnas(dataHoraInicial, dataHoraFinal)

    expect(horasDiurnasTrabalhas).toBe('03:00');
    
});

test('Calculo da hora diurna dias diferentes de entrada e saida, com saída no meio da horas diurnas', () => {
    const dataHoraInicial = moment("29/08/2020 19:00", "DD/MM/YYYY HH:mm");
    const dataHoraFinal = moment("30/08/2020 07:00", "DD/MM/YYYY HH:mm");

    const horasDiurnasTrabalhas = calcularHorasDiurnas(dataHoraInicial, dataHoraFinal)

    expect(horasDiurnasTrabalhas).toBe('05:00');
    
});

test('Calculo das horas noturnas mesmo dia de entrada e saida', () => {
    const dataHoraInicial = moment("29/08/2020 15:00", "DD/MM/YYYY HH:mm");
    const dataHoraFinal = moment("29/08/2020 23:00", "DD/MM/YYYY HH:mm");

    const horasDiurnasTrabalhas = calcularHorasNoturnas(dataHoraInicial, dataHoraFinal)

    expect(horasDiurnasTrabalhas).toBe('01:00');
    
});

test('Calculo da hora diurna dias diferentes de entrada e saida, com saída no meio da horas noturnas', () => {
    const dataHoraInicial = moment("29/08/2020 19:00", "DD/MM/YYYY HH:mm");
    const dataHoraFinal = moment("30/08/2020 04:00", "DD/MM/YYYY HH:mm");

    const horasDiurnasTrabalhas = calcularHorasNoturnas(dataHoraInicial, dataHoraFinal)

    expect(horasDiurnasTrabalhas).toBe('06:00');
    
});

test('Calculo da hora diurna dias diferentes de entrada e saida, com saída no meio da horas diurnas', () => {
    const dataHoraInicial = moment("29/08/2020 19:00", "DD/MM/YYYY HH:mm");
    const dataHoraFinal = moment("30/08/2020 07:00", "DD/MM/YYYY HH:mm");

    const horasDiurnasTrabalhas = calcularHorasNoturnas(dataHoraInicial, dataHoraFinal)

    expect(horasDiurnasTrabalhas).toBe('07:00');
    
});

test('Verifica se horas trabalhas é menor que 24 horas', () => {
    const dataHoraInicial = moment("29/08/2020 05:00", "DD/MM/YYYY HH:mm");
    const dataHoraFinal = moment("29/08/2020 05:00", "DD/MM/YYYY HH:mm");

    expect(validaDiferencaEntreHoras(dataHoraInicial, dataHoraFinal)).toBe(true);
});

test('Verifica se horas trabalhas não é menor que 24 horas', () => {
    const dataHoraInicial = moment("29/08/2020 05:00", "DD/MM/YYYY HH:mm");
    const dataHoraFinal = moment("30/08/2020 05:01", "DD/MM/YYYY HH:mm");

    expect(validaDiferencaEntreHoras(dataHoraInicial, dataHoraFinal)).toBe(false);
});

test('Buscar inicio da hora diurna do dia', () => {
    const dataHora = moment("30/08/2020 07:00", "DD/MM/YYYY HH:mm");
    const inicioHoraDiurna = moment("30/08/2020 05:00", "DD/MM/YYYY HH:mm");
    const inicioHoraDiurnaCalculada = buscarInicioHoraDiurnaDia(dataHora);

    expect(inicioHoraDiurnaCalculada).toStrictEqual(inicioHoraDiurna);
});

test('Buscar inicio da hora noturna do dia', () => {
    const dataHora = moment("29/08/2020 17:00", "DD/MM/YYYY HH:mm");
    const inicioHoraDiurna = moment("29/08/2020 22:00", "DD/MM/YYYY HH:mm");
    const inicioHoraDiurnaCalculada = buscarInicioHoraNoturnaDia(dataHora);

    expect(inicioHoraDiurnaCalculada).toStrictEqual(inicioHoraDiurna);
});
