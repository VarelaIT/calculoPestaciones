"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_sync_1 = __importDefault(require("readline-sync"));
const calculoPrestaciones_1 = __importDefault(require("./calculoPrestaciones"));
const CURRENCY = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const WELCOME = `
    Alterna Academy, Fundamentos de Programación.
    Practica Final: Calculo de Prestaciones Laborales.

    Este programa es interactivo, solo siga las instrucciones
    y llene el formulario.

    Para salir puede presionar '<Ctrl-c>' en cualquier momento.
`;
function calculaPestaciones() {
    let prestaciones = 0;
    console.log('Complete el formulario para calcular sus prestaciones labores.\n');
    const name = readline_sync_1.default.question('Nombre: ');
    const salarioStr = readline_sync_1.default.question('Salario mensual: ');
    const salary = parseFloat(salarioStr.replace(/,/, ''));
    const startDate = readline_sync_1.default.question('Fecha de inicio de labores: ');
    const endDate = readline_sync_1.default.question('Fecha de Terminación: ');
    const calculator = new calculoPrestaciones_1.default(name, salary, startDate, endDate);
    //const calculator= new CalcPestaciones('Ismael', 33333, '2016-7-31', '2023-6-28');
    if (!readline_sync_1.default.question('¿Ha sido preavisado? [Si/No] ', { limit: ['Si', 'No'] }).match(/s/i) ? true : false) {
        prestaciones += calculator.calcPreaviso();
        console.log('Monto de preaviso: RD' + CURRENCY.format(calculator.calcPreaviso()));
    }
    if (readline_sync_1.default.question('¿Desea incluir la cesantia? [Si/No] ', { limit: ['Si', 'No'] }).match(/s/i) ? true : false) {
        prestaciones += calculator.calcCesantia();
        console.log('Monto de cesantia: RD' + CURRENCY.format(calculator.calcCesantia()));
    }
    if (readline_sync_1.default.question('¿Desea incluir las vacaciones? [Si/No] ', { limit: ['Si', 'No'] }).match(/s/i) ? true : false) {
        prestaciones += calculator.calcVacaciones(true);
        console.log('Monto de vacaciones: RD' + CURRENCY.format(calculator.calcVacaciones(true)));
    }
    else {
        prestaciones += calculator.calcVacaciones(false);
        console.log('Monto de vacaciones: RD' + CURRENCY.format(calculator.calcVacaciones(false)));
    }
    if (readline_sync_1.default.question('¿Desea incluir El salario trece? [Si/No] ', { limit: ['Si', 'No'] }).match(/s/i) ? true : false) {
        prestaciones += calculator.calcExtraSalary();
        console.log('Salario trece: RD' + CURRENCY.format(calculator.calcExtraSalary()));
    }
    console.log('\n' + name + ', sus prestaciones labores ascienden a un total de: RD' + CURRENCY.format(prestaciones), '\nPor una duracion de ' + calculator.diff.year + ' años, ' + calculator.diff.month + ' mesese y ' + calculator.diff.day + ' dias.', '\n\n\n');
}
console.log(WELCOME);
while (true) {
    calculaPestaciones();
}
/*jj
const mycalc= new CalcPestaciones('El sujeto', 10000, '1/5/2020', '27/11/2023');
console.log('preaviso: RD'+ CURRENCY.format(mycalc.calcPreaviso()));
console.log('Cesantia: RD'+ CURRENCY.format(mycalc.calcCesantia()));
console.log('Vacaciones: RD'+ CURRENCY.format(mycalc.calcVacaciones(false)));
console.log('Extra: RD'+ CURRENCY.format(mycalc.calcExtraSalary()));
*/
process.exit();
