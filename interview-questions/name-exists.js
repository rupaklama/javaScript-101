// Q1: Write a function which accepts a list of users and a name to check if such user exists in the array.

const users = [
  { id: 1, name: 'Jack', isActive: true },
  { id: 2, name: 'John', isActive: true },
  { id: 3, name: 'Mike', isActive: false },
];

function isNameExists(name, usersArr) {
  // for (const user of usersArr) {
  //   if (user.name.toLowerCase().includes(name.toLowerCase())) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // The some() method checks if ANY of the element in an array pass a test.
  // Returns true if any of the elements in the array pass the test, otherwise it returns false
  // return usersArr.some(user => user.name.toLowerCase() === name.toLowerCase());

  // const user = usersArr.find(user => user.name.toLowerCase() === name.toLowerCase());
  // return Boolean(user)

  const userIndex = usersArr.findIndex(user => user.name.toLowerCase() === name.toLowerCase());
  // return userIndex !== -1;
  return userIndex >= 0; // same as above
}

console.log(isNameExists('Jack', users));
console.log(isNameExists('foo', users));
