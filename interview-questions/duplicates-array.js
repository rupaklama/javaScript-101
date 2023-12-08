function uniqueArr(arr) {
  return arr.filter((item, i) => {
    // note: if the item presents more than once, indexOf() returns the index position of first occurrence
    console.log(arr.indexOf(item));
    console.log(i);

    // filter items whose Index is equal to the current array index
    return arr.indexOf(item) === i;
  });
}

console.log(uniqueArr([1, 1, 2])); // [1,2]

// Set Object stores unique value of any data type.
// Spread can also be used to convert a set, or any other iterable to an Array.
const uniqueArr2 = arr => {
  return [...new Set(arr)];
};
console.log(uniqueArr2([1, 1, 2])); // [1,2]

console.log(new Set('fooooooood'));
console.log([...new Set('fooooooood')].join(''));

function uniqueArr3(arr) {
  const result = [];

  arr.forEach(item => {
    if (!result.includes(item)) {
      result.push(item);
    }
  });

  return result;
}
console.log(uniqueArr3([1, 1, 2]));

const uniqueArr4 = arr => {
  return arr.reduce((acc, item) => {
    return acc.includes(item) ? acc : [...acc, item];
  }, []);
};

console.log(uniqueArr4([1, 1, 2]));
