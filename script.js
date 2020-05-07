
// #1
// in reactive programming, you get a series of event that you react to,
// and you can deal with them in way that is similar to reacting with arrays
// as you see in this example

var source = Rx.Observable.interval(400).take(9)
  .map(i => ['1', '1', 'foo', '2', '3', '5', 'bar', '8', '13'][i]);
result = source.map(i => parseInt(i)).filter((i) => !isNaN(i)).reduce((x, y) => y + x);
result.subscribe(x => console.log(x));
