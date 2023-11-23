// Write code to get an array of names from given array of users
// Result
// ['Jack', 'John', 'Mike']
const users = [
  { id: 1, name: 'Jack', isActive: true, age: 20 },
  { id: 2, name: 'John', isActive: true, age: 18 },
  { id: 3, name: 'Mike', isActive: false, age: 30 },
];

const persons = users.map(user => user.name);
console.log(persons);

const names = [];
users.forEach(user => {
  names.push(user.name);
});
console.log(names);

const people = [];
for (i = 0; i < users.length; i++) {
  people.push(users[i].name);
}
console.log(people);

const activeUsers = users.filter(user => user.isActive === true).map(user => user.name);
console.log(activeUsers);

const sortedDescending = users.sort((a, b) => b.age - a.age).map(user => user.name);
console.log(sortedDescending);
