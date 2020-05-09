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

// var button = document.querySelector('.button')
// var label = document.querySelector('h4');
// var clickStream = Rx.Observable.fromEvent(button, 'click');
// var doubleClickStream = clickStream
//   .bufferWhen(() => clickStream.debounceTime(250))
//   .map(arr => arr.length)
//   .filter(len => len === 2);
// doubleClickStream.subscribe(event => {
//   label.textContent = 'double click';
// });
// doubleClickStream
//   .delay(1000)
//   .subscribe(suggestion => {
//     label.textContent = '-';
//   });

// #3
// What reactive programming lets you do: It allows you to specify the dynamic
// behaviour of a value at the time of creation.

// var streamA = Rx.Observable.of(3, 4); // specify the behaviour at declaration
// var streamB = streamA.map((a) => a * 10);
// streamB.subscribe((event) => {
//   console.log(event);
// });

// #4
// creating a request with reactive programming
// FlatMap is used when you have a stream of observables, to merge them 
// to the main stream so that you don't have to subscribe to the stream
// two times in order to get the value of the request

const createSuggestionStream = (responseStream) => {
  return responseStream
    .map((response) => {
      return response.data[Math.floor(Math.random() * response.data.length)];
    })
    .startWith(null)
    .merge(refreshClickStream.map((e) => null)); // effect of reloading
};

const renderSuggestion = (user, selector) => {
  if (user === null) {
    document.querySelector(selector).style.visibility = "hidden";
  } else {
    document.querySelector(selector).style.visibility = "visible";
    document.querySelector(selector).children[0].src = user.avatar;
    document.querySelector(
      selector
    ).children[1].innerText = `${user.first_name} ${user.last_name}`;
    document.querySelector(selector).children[1].href = user.email;
  }
};

const URL = "https://reqres.in/api/users?page=2";

var refreshButton = document.querySelector(".refresh");
var refreshClickStream = Rx.Observable.fromEvent(refreshButton, "click");

var requestOnClickStream = refreshClickStream.map(() => {
  return URL;
});

var requestOnStartUpStream = Rx.Observable.of(URL);

var responseStream = requestOnStartUpStream
  .merge(requestOnClickStream)
  .flatMap((requestUrl) => {
    return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
  })
  .shareReplay(1); // this means that all the subscribers later will share the same stream, ( this will prevent making three calls for every subscription)

var suggestion1Stream = createSuggestionStream(responseStream);
var suggestion2Stream = createSuggestionStream(responseStream);
var suggestion3Stream = createSuggestionStream(responseStream);

for (let i = 1; i <= 3; i++) {
  createSuggestionStream(responseStream).subscribe((user) => {
    console.log({ user });
    renderSuggestion(user, `.suggestion${i}`);
  });
}