// Q1: Create an ES6 module with function getName, getSurname and default export of getFullName.

function getName() {
  return 'John';
}

function getSurname() {
  return 'Doe';
}

function getFullName() {
  return `${getName()} ${getSurname()}`;
}

export { getName, getSurname, getFullName as default };
