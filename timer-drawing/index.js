// NOTE - using Class effectively around DOM Elements to generate Events
class Timer {
  constructor(durationInput, startButton, pauseButton) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;

    // note - Passed in Argument in bind, call & apply will override the default value of 'this' inside of a function
    // note - this is the older way, using Arrow function is the modern way now
    // this.start = this.start.bind(this);

    // auto setup Event listeners directly inside of our constructor
    // note - In an event handler, 'this' keyword is the Element that the event listener is attached to
    // Bind returns a new function where call & apply invoke function right away
    // this.startButton.addEventListener('click', this.start.bind(this));
    this.startButton.addEventListener('click', this.start);

    this.pauseButton.addEventListener('click', this.pause);
  }

  // note - Older way
  // start() {
  //   // note - 'this' refers to object instance here
  //   // This object instance will be pass as arg to the bind method above
  //   console.log(this);
  // }

  // modern way - note: This will get added to the class constructor above
  start = () => {
    // first start it immediately
    this.tick();

    // continue on every seconds
    // note - rather than assigning value to a variable like this - const timer
    // assigning value by creating a 'intervalId' property in our object instance
    this.intervalId = setInterval(this.tick, 1000);
  };

  pause = () => {
    clearInterval(this.intervalId);
  };

  tick = () => {
    // getter
    const timeRemaining = this.timeRemaining;

    // setter
    if (this.timeRemaining <= 0) {
      this.pause();
    } else {
      this.timeRemaining = timeRemaining - 1;
    }
    // same as above
    // this.timeRemaining = this.timeRemaining - 1
  };

  // Helper methods
  // Getter method - to get a value
  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }

  // Setter method - to set a value
  set timeRemaining(time) {
    this.durationInput.value = time;
  }
}

// Elements
const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');

// new object instance
const timer = new Timer(durationInput, startButton, pauseButton);
// timer.start();
