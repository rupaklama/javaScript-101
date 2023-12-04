// Q1: Write a function which get's an array and an element and returns an array with this element at the end.

const numbers = [1, 2];

function append(numbers, el) {
  return [...numbers, el];
}
console.log(append(numbers, 3));

//  Q2: Write a function which can concatenate 2 arrays
function mergeArrays(arr1, arr2) {
  // return arr1.concat(...arr2);
  return [...arr1, ...arr2];
}

console.log(mergeArrays([1], [2, 3]));
