import {Fecha, FechaDiff} from './fechaDiff'

export default class CalcPrestaciones {
    readonly name: string;
    readonly salary: number;
    readonly startDate: Fecha;
    readonly endDate: Fecha;
    readonly diff: FechaDiff;
    readonly dailySalary: number;
    
    constructor(name: string, salary: number, start: string, end: string){
        this.name= name;
        this.salary= salary;
        this.startDate= new Fecha(start);
        this.endDate= new Fecha(end);
        this.diff= new FechaDiff(this.endDate, this.startDate);
        this.dailySalary= this.setDaylySalary(salary);
    }

    setDaylySalary(salary: number): number{
        return salary / 23.83;
    }

    setMonths(start: Date, end: Date): number{
        return end.getMonth() - start.getMonth();
    }

    calcExtraSalary(): number{
        let daysWorked: number= 0;
        let total: number= 0;

        if(this.diff.day / 12 >= 2)
            daysWorked=  24;
        else if(this.diff.day / 12 >= 1)
            daysWorked=  12 + (this.diff.day - 15);
        else 
            daysWorked= this.diff.day;

        total+= daysWorked * this.dailySalary / 12;

        if(this.diff.year > 0 || this.startDate.month > this.endDate.month){
            total+= this.salary * (this.endDate.month - 1) / 12;
        }else{
            total+= this.salary * this.diff.month / 12;
        }

        return total;
    }

    calcVacaciones(expired: boolean): number{
        let total: number=0;

        if(this.diff.year >0 && this.diff.year< 5 && expired)
            total+= this.dailySalary * 14;
        
        if(this.diff.year >= 5 && expired)
            total+= this.dailySalary * 18;

        if(this.diff.month > 5 && this.diff.month < 12)
            return this.dailySalary * (this.diff.month + 1) + total;

        return total;
    }

    calcCesantia(): number{
        let dayNumber: number= 0; 

        if(this.diff.year >= 5)
            dayNumber+= 23 * this.diff.year;
        else if(this.diff.year > 0 && this.diff.year < 5)
            dayNumber+=  21 * this.diff.year;

        if(this.diff.month >= 6 && this.diff.month < 12)
            return (dayNumber+= 13) * this.dailySalary;

        if(this.diff.month < 6 && this.diff.month >= 3)
            return (dayNumber+= 6) * this.dailySalary;

        return dayNumber * this.dailySalary;
    }

    calcPreaviso(): number{
        if(this.diff.year > 0)
            return this.dailySalary * 28;

        if(this.diff.month >= 3 && this.diff.month < 6)
            return this.dailySalary * 7;

        if(this.diff.month >= 6 && this.diff.month <= 12)
            return this.dailySalary * 14;

        return 0;
    }
}
