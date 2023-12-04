// note: Variable, function and class declaration are moved to the top of the scope in js.
// We can access values before executing the declarations.

// note: All variables are hoisted. VAR is initialized with 'undefined' but not 'let, const & class'
// It is always GOOD to use Let & Const to prevent 'initialization' errors
// ReferenceError:  Cannot access 'variable' before initialization

// note: If you access a variable that doesn't exists, the js will throw a different error
// ReferenceError: 'variable' is not defined

// note: ReferenceError meaning variable is not defined properly
// Uncaught ReferenceError: foo is not defined
console.log(foo);
// Using an undeclared variable before its assignment will also throw a ReferenceError
// because no declaration was hoisted since the variable keyword is missing here.
foo = 1;

// VAR is initialized with 'undefined'
console.log(moo); // undefined
var moo = 2;

// note: undefined here since no value is assigned here
var counter;
console.log(counter); // undefined
counter = 3;

// note: Function Declaration is hoisted but the Function Expressions & Arrow Functions
// function callMeBefore() {
//   console.log('i am hoisted');
// }
callMeBefore();
// note: this will move top or before the function call like above
function callMeBefore() {
  console.log('i am hoisted');
}

// Function Expressions & Arrow Functions are not Hoisted
console.log(notHoisted()); // "TypeError: notHoisted is not a function"
const notHoisted = function () {};
sameNotHoisted();
const sameNotHoisted = () => {};
