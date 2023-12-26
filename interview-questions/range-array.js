'use strict';

// Write a function which implements a range

function range(start, end) {
  const result = [];

  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}

console.log(range(1, 50)); // [1,2,3,4,5...,50]

// without for loop
// const createArray = [...new Array(50).keys()].map(el => el + 1);
const rangeWithoutLoop = (start, end) => {
  return [...new Array(end).keys()].map(el => el + start);
};
console.log(rangeWithoutLoop(1, 50));
