// A Closure is a function tha captures variables from its Lexical scope - outer parent scope.
// The Closure remembers the variables from the place where it is defined, no matter where it is executed.
// Lexical scoping used to preserve variables from the outer scope of a function in the inner scope of a function.

// JavaScript variables can belong to the local or global scope.
// Global variables can be made local (private) with closures.

// A function can access all variables defined inside the function, like this:
function numberGenerator() {
  // num is global variable here
  var num = 1;
  function checkNumber() {
    console.log(num);
  }
  num++;
  return checkNumber;
}

var number = numberGenerator();
number();

function counter() {
  let count = 0;

  return {
    increment: (value = 1) => {
      count += value;
    },
    getValue: () => {
      return count;
    },
  };
}

// note: the closer value is available outside the function after the closure is executed
// addCount property has access into the Closure after 'storing' closure into it
const addCount = counter();
console.log(addCount.getValue());
addCount.increment();
console.log(addCount.getValue());

console.dir(counter.getValue);
