// note - Prototype is a template object to inherit properties and methods to other new objects

// String Prototype - adding a new property 'yell'
String.prototype.yell = function () {
  // 'this' refers to String Value
  console.log(this.toUpperCase());
};

console.log('hello'.yell()); // HELLO

// factory function - returns an Object
function makeColor(r, g, b) {
  const color = {};

  color.r = r;
  color.g = g;
  color.b = b;

  // adding methods for color object
  color.rgb = function () {
    // current object instance
    // console.log(this);

    const { r, g, b } = this;
    return `rgb(${r}, ${g}, ${b})`;
  };

  color.hex = function () {
    const { r, g, b } = this;
    return '#' + ((1 << 24) + (r << 16) + (g << 8)).toString(16).slice(1);
  };

  return color;
}

const firstColor = makeColor(234, 344, 140);

// note - a factory is a function that returns an object ,
// while a class is a template for an object

// note - Factory function always creates a brand new unique copy of all its Methods in the memory with New Object
// A new method which does not reference to the Factory Object anymore.

// note - Constructor Function will resolve the above issue of function reference.
// Constructor Function to create Objects
function Color(r, g, b) {
  // const o = {};

  this.r = r;
  this.g = g;
  this.b = b;

  // console.log(this); with new keyword, 'this' will be referring to this object
}
// note - MUST define this method outside of Constructor Function
// this method will be always reference to the prototype object of Constructor Function on creating new objects
Color.prototype.hex = function () {
  const { r, g, b } = this;
  return '#' + ((1 << 24) + (r << 16) + (g << 8)).toString(16).slice(1);
};

// creates an empty object like in above  Constructor Function
const color1 = new Color(255, 40, 100);
const color2 = new Color(0, 40, 0);

// both objects referring to the same method of
// console.log(color1.hex === color2.hex ) true

// NOTE  - Constructor Function syntax are not grouped together, kind of messy
// THIS IS WHY THE CLASS KEYWORD & NEW CLASS SYNTAX INTRODUCED
// Class is a template for an object, a Syntactical Sugar for doing the same thing in Constructor Function above
class ColorNew {
  // note - constructor function will execute immediately whenever new Object Instances are created
  // The purpose of a constructor is to CREATE a new object and SET Properties for a new object instance
  // Same as Prototype's Constructor Function function Color(r, g, b) {} above
  constructor(r, g, b, name) {
    console.log('INSIDE CONSTRUCTOR');
    // note - 'this' will always refer & apply to new object instances
    this.r = r;
    this.g = g;
    this.b = b;

    this.name = name;
  }

  // adding methods for this class where new objects will have references to all these methods
  greet() {
    return 'hello from ColorNew class!';
  }

  innerRGB() {
    const { r, g, b } = this;
    return `rgb(${r}, ${g}, ${b})`;
  }

  rgba(a = 1.0) {
    return `rgba(${this.innerRGB()}, ${a})`;
  }

  hex() {
    const { r, g, b } = this;
    return '#' + ((1 << 24) + (r << 16) + (g << 8)).toString(16).slice(1);
  }
}

// 'this' keyword inside of a class will always refer to all the New Object Instances below
const newColor = new ColorNew(255, 78, 89, 'my color');

// inheritance & sub classes

// Parent Class - methods that can be share with other classes
class Pet {
  constructor(name, age) {
    console.log('IN PET CONSTRUCTOR');
    this.name = name;
    this.age = age;
  }

  eat() {
    return `${this.name} is eating!`;
  }
}

// Children Classes
class Cat extends Pet {
  constructor(name, age, livesLeft = 9) {
    // NOTE:
    // if we want to add additional information or properties in the current Cat class
    // and don't want to duplicate same properties in the parent class then we can use 'super' keyword
    // 'super' will call parent's class constructor
    console.log('IN CAT CONSTRUCTOR');
    // this.name = name;
    // this.age = age;
    super(name, age);

    this.livesLeft = livesLeft;
  }

  meow() {
    return 'meowwwwwww!';
  }
}

const monty = new Cat('monty', 9);

class Dog extends Pet {
  bark() {
    return 'Woof!';
  }

  // the parent class 'eat' method will be call if this method don't exists
  // eat() {
  //   return 'this method will be call instead of parent class `eat` method';
  // }
}

const wyatt = new Dog('wyatt', 12);
