function getMonthAndWeekDay() {
    let date = new Date()
    let day = date.getDate()
    let year = date.getFullYear()
    let wd = date.getDay()
    let mt = date.getMonth()
    var wds, mts;

    switch (wd) {
        case 0:
            wds = "Domingo"
        break;
        case 1:
            wds = "Segunda-feira"
        break;
        case 2:
            wds = "Terça-Feira"
        break;
        case 3:
            wds = "Quarta-feira"
        break;
        case 4:
            wds = "Quinta-feira"
        break;
        case 5:
            wds = "Sexta-feira"
        break;
        case 6:
            wds = "Sábado"
        break;
    }

    switch (mt) {
        case 0:
            mts = "Janeiro"
        break;
        case 1:
            mts = "Fevereiro"
        break;
        case 2:
            mts = "Março"
        break;
        case 3:
            mts = "Abril"
        break;
        case 4:
            mts = "Maio"
        break;
        case 5:
            mts = "Junho"
        break;
        case 6:
            mts = "Julho"
        break;
        case 7:
            mts = "Agosto"
        break;
        case 8:
            mts = "Setembro"
        break;
        case 9:
            mts = "Outubro"
        break;
        case 10:
            mts = "Novembro"
        break;
        case 11:
            mts = "Dezembro"
        break;
    }

    return `${wds}, ${day} de ${mts} de ${year}`
    
}

export { getMonthAndWeekDay }