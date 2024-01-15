// note: 'this' always does not refer to Window object.
// note: Inside Function, 'this' refers to the Global Object which could be Window, undefined or
// something else as it always depends on the Context.

// Q1: What will be logged here?
function getItem() {
  // note: 'this' inside of 'function' keyword declared without any nesting, it will always be the 'Window object'
  console.log(this); // Window
}
getItem();

// Q2: What will be logged here?
const item = {
  title: 'Ball',
  getItem() {
    console.log(this); // Current Object
  },
};
item.getItem();

// Q2: What will be logged here?
class Item {
  title = '';

  constructor(title) {
    this.title = title;
  }

  getItem() {
    console.log(this); // New Object Instance

    // fixing 'this' issues below where Global Object is referring to 'undefined'
    // Older approach
    const this_ = this;

    function someFn() {
      // Inside Nested Function, 'this' refers to the Global Object which is 'undefined'
      console.log(this); // undefined

      console.log(this_);
    }
    someFn();

    // another example
    [1, 2, 3].map(function (item) {
      console.log(this); // undefined
    });

    // Newer Approach using Arrow Function ES6
    // NOTE: Arrow Function do not have binding of 'this', it context depends on the Parent Scope
    [1, 2, 3].map(item => {
      console.log(this);
    });
  }
}
const item1 = new Item();
item1.getItem();
