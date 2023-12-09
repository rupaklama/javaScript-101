'use strict';

// Q1: Sort the array of numbers
function sortNumbers(arr) {
  // using compare func since sort method does sorting based on strings by default
  // 5 - 3 = 2 which is > 0 then sort b before a as an ascending order
  return arr.sort((a, b) => a - b);
}

console.log(sortNumbers([5, 3, 9, 1, 6]));

// Q2: Sort an array of objects by author's last name
function sortByLastName(arr) {
  return arr.sort((a, b) => {
    const author1LastName = a.author.split(' ')[1];
    const author2LastName = b.author.split(' ')[1];

    // note - must use -1 & 1 since we can't subtract strings
    // if return > 0 then B is before A - switch order
    // if return < 0 then A is before B - keep order
    // return author1LastName < author2LastName ? -1 : 1; // ascending order
    return author1LastName > author2LastName ? 1 : -1; // same as above
  });
}

const books = [
  { name: 'Harry Potter', author: 'Joanne Rowling' },
  { name: 'Warcross', author: 'Marie Lu' },
  { name: 'THe Hunger Games', author: 'Suzanne Collins' },
];
console.log(sortByLastName(books));
