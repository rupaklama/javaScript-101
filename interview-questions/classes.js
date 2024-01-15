// Design a class for employee which takes id and name in during construction of object and has a salary property
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

// Design a class for manager which is employee and can have a department property
class Manager extends Employee {
  constructor(id, name, department) {
    super(id, name);
    // this.department = department;
  }

  setDepartment(department) {
    this.department = department;
  }

  getDepartment() {
    return this.department;
  }
}

const manager = new Manager(1, 'Jack');
manager.setSalary(1000);
manager.setDepartment('Development');
console.log(manager.getDepartment());
