// Find the number of occurrences of minimum value in the list of numbers

const arr = [3, 2, 5, 8, 2, 2];
const minValue = Math.min(...arr);
console.log(minValue);

const minArr = arr.filter(el => el === minValue);
console.log(minArr.length);
