// note: Curring is to create individual function call for each parameters of the function with multiple arguments.
// Currying in JavaScript transforms a function with multiple arguments into a nested series of functions,
// each taking a single argument.

// Write a function which helps to achieve multiply(a)(b) and returns multiplication of a and b

// function multiply(a, b) {
//   return a * b;
// }
// console.log(multiply(2, 3));

// note: why use Currying?
// Currying helps you avoid passing the same variable arguments multiple times,
// and it helps you create a higher order function.
// note: HOC is a function that receives another function as an argument or returns a new function.
// note: Factory function is a function which returns a new object.
function multiply(num1) {
  return num2 => {
    // note: curry function is a func so need to return a function
    return num1 * num2;
  };
}
console.log(multiply(2)(3)); // 6
