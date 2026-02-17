import Rx from 'rxjs/Rx';


var source = Rx.Observable.interval(100).take(10)
    .flatMap(x => Rx.Observable.timer(500).map(() => x))

source.subscribe(x => console.log(x));