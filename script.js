// #1
// in reactive programming, you get a series of event that you react to,
// and you can deal with them in way that is similar to reacting with arrays
// as you see in this example

// var source = Rx.Observable.interval(400)
//   .take(9)
//   .map((i) => ["1", "1", "foo", "2", "3", "5", "bar", "8", "13"][i]);
// result = source
//   .map((i) => parseInt(i))
//   .filter((i) => !isNaN(i))
//   .reduce((x, y) => y + x);
// result.subscribe((x) => console.log(x));

var button = document.querySelector('.button')
var label = document.querySelector('h4');

var clickStream = Rx.Observable.fromEvent(button, 'click');

const timeout = 250;
const clicks$ = Rx.Observable.fromEvent(button, "click");
const doubleClickStream = clicks$
    .map(() => new Date())
    .bufferCount(2, 1)
    .map(([prev, next]) => (next - prev) < timeout)
    .scan((prev, next) => !prev && next, false)
    .filter(v => v)

doubleClickStream.subscribe(event => {
  label.textContent = 'double click';
});

doubleClickStream
  .delay(1000)
  .subscribe(suggestion => {
    label.textContent = '-';
  });