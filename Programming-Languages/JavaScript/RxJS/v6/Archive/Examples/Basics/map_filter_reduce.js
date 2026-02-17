import * as Rx from "rxjs";

let myArray = [1,2,'3','foo', 'bar', 'phi', 3,4,5, '7'];

let stream$ = Rx.Observable.interval(300).take(10)
    .map (x => parseInt(myArray[x]))
    .filter(x => !isNaN(x))
    .reduce((i,j) => {
        console.log(`Addition von ${i} mit ${j} = ${i+j}`);
        return i+j;
    },10);

let result$ = stream$;

result$.subscribe(
    x => console.log(x),
    err => console.log(err),
    () => console.log ('done')
);

