class Employee {
  constructor(id, name) {
    if (!id || !name) {
      throw new Error('id and name are required');
    }

    this.id = id;
    this.name = name;
  }

  setSalary(salary) {
    this.salary = salary;
  }
}

const employee = new Employee(1, 'Jack');
employee.setSalary(1000);
console.log(employee);

// Q1: Design the same classes as above but by using only JavaScript prototypes and not class keyword.
// With the Object.create() - linking an object to create a prototype object
const employeeThree = Object.create(Employee.prototype);
employeeThree.id = 1;
employeeThree.name = 'Jack';
console.log(employeeThree);

// Q2: Design the same classes as above but by using only JavaScript prototypes and not class keyword.
// With the Constructor Function
function EmployeeTwo(id, name) {
  if (!id || !name) {
    throw new Error('id and name are required');
  }

  this.id = id;
  this.name = name;
}

Employee.prototype.setSalary = function (salary) {
  this.salary = salary;
};

const employeeTwo = new EmployeeTwo(1, 'Jack');
console.log(employeeTwo);
