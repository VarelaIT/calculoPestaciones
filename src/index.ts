import Readline from 'readline-sync';
import CalcPestaciones from './calculoPrestaciones'

const CURRENCY= new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"});
const WELCOME = `
    Alterna Academy, Fundamentos de Programación.
    Practica Final: Calculo de Prestaciones Laborales.

    Este programa es interactivo, solo siga las instrucciones
    y llene el formulario.

    Para salir puede presionar '<Ctrl-c>' en cualquier momento.
`;



function getSalaries(): number| false{
    const fixed = Readline.question('Sueldo fijo: [Si/No] ', {limit: ['Si', 'No']}).match(/s/i)? true : false;
    
    if(fixed){
        const salarioStr = Readline.question('Salario mensual: ');
        return parseFloat(salarioStr.replace(/,/, ''));
    }

    let salaries: number[]= [];

    for(let i= 0; i < 10; i++){
        const salary= parseFloat(Readline.question(Salario ${i + 1}:));
        
        if(!Number.isNaN(salary))
            salaries.push(salary);
        else
            break;
    }

    if(salaries.length < 0)
        return false;

    return salaries.reduce((first, second)=> (first + second), 0) / salaries.length;
}



function calculateBenefits () {
    let prestaciones: number= 0;
    console.log('Complete el formulario para calcular sus prestaciones labores.\n');
    const name = Readline.question('Nombre: ');
    const startDate = Readline.question('Fecha de inicio de labores: ');
    const endDate = Readline.question('Fecha de Terminación: ');
    const salary= getSalaries();
    
    if(!salary)
        return;

    console.log(Su salario promedio es de: RD$ ${CURRENCY.format(salary)}\n);
    const calculator= new CalcPestaciones(name, salary, startDate, endDate);
    //const calculator= new CalcPestaciones('Ismael', 33333, '2016-7-31', '2023-6-28');

    if(!Readline.question('¿Ha sido preavisado? [Si/No] ', {limit: ['Si', 'No']} ).match(/s/i)? true : false){
        prestaciones+= calculator.calcPreaviso();
        console.log('Monto de preaviso: RD' + CURRENCY.format(calculator.calcPreaviso()));
    }

    if(Readline.question('¿Desea incluir la cesantia? [Si/No] ', {limit: ['Si', 'No']} ).match(/s/i)? true : false){
        prestaciones+= calculator.calcCesantia();
        console.log('Monto de cesantia: RD' + CURRENCY.format(calculator.calcCesantia()));
        
    }

    if(Readline.question('¿Desea incluir las vacaciones? [Si/No] ', {limit: ['Si', 'No']} ).match(/s/i)? true : false){
        prestaciones+= calculator.calcVacaciones(true);
        console.log('Monto de vacaciones: RD' + CURRENCY.format(calculator.calcVacaciones(true)));
    }else{
        prestaciones+= calculator.calcVacaciones(false);
        console.log('Monto de vacaciones: RD' + CURRENCY.format(calculator.calcVacaciones(false)));
    }

    if(Readline.question('¿Desea incluir El salario trece? [Si/No] ', {limit: ['Si', 'No']} ).match(/s/i)? true : false){
        prestaciones+= calculator.calcExtraSalary();
        console.log('Salario trece: RD' + CURRENCY.format(calculator.calcExtraSalary()));
    }

    console.log('\n' + name +', sus prestaciones labores ascienden a un total de: RD' + CURRENCY.format(prestaciones), 
        '\nPor una duracion de ' + calculator.diff.year + ' años, ' + calculator.diff.month + ' mesese y ' + calculator.diff.day + ' dias.',
        '\n\n\n');
}


console.log(WELCOME);

while(true){
    calculaPestaciones();
}

process.exit();
