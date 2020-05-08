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


// #2
// buffer, takes the events that happened in the last 250 ms
// and bundles them into an array
// there is a really cool diagram that shows how events are transforming
// https://d2eip9sf3oo6c2.cloudfront.net/asciicasts/Introduction%20to%20Reactive%20Programming/original_rxjs-use-an-event-stream-of-double-clicks-in-rxjs/rxjs-use-an-event-stream-of-double-clicks-in-rxjs-click-stream-diagram-one.png?1501284674

var button = document.querySelector('.button')
var label = document.querySelector('h4');
var clickStream = Rx.Observable.fromEvent(button, 'click');
var doubleClickStream = clickStream
  .bufferWhen(() => clickStream.debounceTime(250))
  .map(arr => arr.length)
  .filter(len => len === 2);
doubleClickStream.subscribe(event => {
  label.textContent = 'double click';
});
doubleClickStream
  .delay(1000)
  .subscribe(suggestion => {
    label.textContent = '-';
  });