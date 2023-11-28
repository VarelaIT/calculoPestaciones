export class Fecha {
    readonly originalDate: string[];
    readonly year: number;
    readonly month: number;
    readonly day: number;
    constructor(fecha: string){
        if(fecha.match(/-/))
            this.originalDate= fecha.split('-');
        else if(fecha.match(/\//))
            this.originalDate= fecha.split('/');
        else 
            throw new Error("Can't initialize Object of type Fecha; string provided does not match the pattern ( DD/MM/YYYY ).");
        
        this.year= parseInt(this.originalDate[2]);
        this.month= parseInt(this.originalDate[1]);
        this.day= parseInt(this.originalDate[0]);
    }

    getYear(){
        return this.year;
    }

    getMonth(){
        return this.month;
    }

    getDay(){
        return this.day;
    }
}




export class FechaDiff extends Fecha{

    constructor(one: Fecha, two: Fecha){
        let year= one.getYear() - two.getYear();
        let month= one.getMonth() - two.getMonth();
        let day= one.getDay() - two.getDay();
        if(day < 0){
            day = one.getDay()
            month--
        }
        if(month < 0){
            month = month + 12;
            year--;
        }
        if(day > 29){
            day - 30;
            month++;
        }
        if(month > 29){
            month = 0;
            year++;
        }
        const myFecha= day + '/' + month + '/' + year ;
        super(myFecha);
    }
}
