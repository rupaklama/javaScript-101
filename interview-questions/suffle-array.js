//  Write a shuffle function which changes the position of array elements

function shuffleArray(arr) {
  const newArray = [];

  arr.forEach((el, i) => {
    const randomIdx = Math.floor(Math.random() * arr.length);
    console.log(randomIdx);

    newArray.push(arr[randomIdx]);
  });

  return newArray;
}

console.log(shuffleArray([1, 2]));

const shuffleItems = items => {
  return items
    .map(item => {
      console.log(item);
      return { sort: Math.floor(Math.random() * items.length) + 1, value: item };
    })
    .sort((item1, item2) => {
      console.log(item1, item2);
      return item1.sort - item2.sort;
    })

    .map(a => a.value);
};
console.log(shuffleItems([1, 2]));
