// Q2: Create an Common JS module with function getName, getSurname and default export of getFullName.

function getName() {
  return 'John';
}

function getSurname() {
  return 'Doe';
}

function getFullName() {
  return `${getName()} ${getSurname()}`;
}

module.exports = { getName, getSurname, getFullName };
