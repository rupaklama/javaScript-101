// Elements
const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const circleSVG = document.querySelector('circle');

// circle radius
const perimeter = circleSVG.getAttribute('r') * 2 * Math.PI;
// drawing circle
circleSVG.setAttribute('stroke-dasharray', perimeter);

// NOTE - using Class effectively around DOM Elements to generate Events
class Timer {
  constructor(durationInput, startButton, pauseButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;

    // making callbacks optional in this class
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }

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
    if (this.onStart) {
      this.onStart(this.timeRemaining);
    }

    // first start it immediately
    this.tick();

    // continue on every seconds
    // note - rather than assigning value to a variable like this - const timer
    // assigning value by creating a 'intervalId' property in our object instance
    this.intervalId = setInterval(this.tick, 20);
  };

  pause = () => {
    clearInterval(this.intervalId);
  };

  tick = () => {
    // getter
    const timeRemaining = this.timeRemaining;

    if (this.timeRemaining <= 0) {
      this.pause();

      if (this.onComplete) {
        this.onComplete();
      }
    } else {
      // setter
      this.timeRemaining = timeRemaining - 0.02;

      if (this.tick) {
        this.onTick(this.timeRemaining);
      }
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
    this.durationInput.value = time.toFixed(2);
  }
}

// default value
let duration;

// new object instance
const timer = new Timer(durationInput, startButton, pauseButton, {
  // Optional Object - to keep track of events to update the UI
  // passing callbacks here as events that will be invoked on timer life cycle phases
  onStart(totalDuration) {
    // draw the border
    duration = totalDuration;
  },

  onTick(timeRemaining) {
    // update the border with spaces
    circleSVG.setAttribute(
      'stroke-dashoffset',
      (perimeter * timeRemaining) / duration - perimeter
    );
  },

  onComplete() {
    // reset the border
    console.log('timer just completed');
  },
});
