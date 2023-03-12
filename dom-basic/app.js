const btn = document.querySelector('button');

// window - browser window
// document - html page inside of browser window
btn.addEventListener('mouseover', () => {
  btn.innerText = 'mouse over me';

  // window.screen - device screen dimension
  // NOTE - window.innerWidth - browser window dimension
  const width = Math.floor(Math.random() * window.innerWidth);
  const height = Math.floor(Math.random() * window.innerHeight);
  console.log(width, height);

  btn.style.left = `${width}px`;
  btn.style.top = `${height}px`;
});

btn.addEventListener('click', () => {
  btn.innerText = 'you got me';
  document.body.style.backgroundColor = 'green';
});

// btn.addEventListener('mouseout', () => {
//   btn.innerText = 'Click me!';
// });

// Adding Event on the Window object
window.addEventListener('scroll', () => {
  console.log('stop scrolling!!');
});

// Events on Multiple Elements
const colors = ['red', 'orange', 'blue', 'violet', 'green', 'yellow'];

const container = document.querySelector('#boxes');

// const printColor = function (box) {
//   console.log(box.style.backgroundColor);
// };

const h1 = document.querySelector('h1');

// note - EVENT object is pass in by default in this function since it is an event handler
const printColor = function (e) {
  // current event
  // console.log(e);

  // currentTarget is an element that event listener is attached to
  console.log(e.currentTarget === this);
  // console.log(this.style.backgroundColor);
  console.log(e.currentTarget.style.backgroundColor);

  h1.style.color = this.style.backgroundColor;
};

for (let color of colors) {
  const box = document.createElement('div');
  box.classList.add('box');
  box.style.backgroundColor = color;

  container.append(box);

  // NOTE - adding event listener on each box in the loop
  // box.addEventListener('click', () => {
  //   console.log(box.style.backgroundColor);
  // });

  // note - not to call the print function right away
  // box.addEventListener('click', function () {
  //   printColor(box);
  // });

  box.addEventListener('click', printColor);
}

// Key Events
// note - EVENT object is pass in by default in this function

const input = document.querySelector('#username');

// note - Three options for listening for event in input
// note - keydown: shift, tab, caps lock, command, control etc on any key press down
// and characters on any key press of any keys
input.addEventListener('keydown', function (e) {
  console.log('keydown');
});

// keyup - after key press on release of any keys
input.addEventListener('keyup', function (e) {
  console.log('keyup');
});

// keypress is only on characters + enter/return key
document.body.addEventListener('keypress', function (e) {
  // note - information about current event
  console.log('keypress');
});

const addItemInput = document.querySelector('#addItem');
const itemsUl = document.querySelector('#items');

// NOTE - listening for Enter key
addItemInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    if (!this.value) return;

    // get a value
    const item = this.value;

    const newItem = document.createElement('li');
    newItem.innerText = item;

    itemsUl.append(newItem);

    this.value = '';
  }
});

// form
const form = document.querySelector('#signup-form');

const creditCard = document.querySelector('#cc');
const termsCheckbox = document.querySelector('#terms');
const veggieSelect = document.querySelector('#veggie');

form.addEventListener('submit', function (e) {
  // prevents submitting form and reloading
  e.preventDefault();

  // current form event object
  console.log(e);
  console.log(creditCard.value);
  console.log(termsCheckbox.checked);
  console.log(veggieSelect.value);
});

const formData = {};

// input event
creditCard.addEventListener('input', e => {
  console.log('input value', e);
  // adding property with a value in the object
  formData['cc'] = e.target.value;
});

veggieSelect.addEventListener('input', e => {
  // adding property with a value in the object
  formData['veggie'] = e.target.value;
});

termsCheckbox.addEventListener('input', e => {
  // adding property with a value in the object
  formData['terms'] = e.target.checked;
});

// best practice
const formDataTwo = {};

for (let input of [creditCard, termsCheckbox, veggieSelect]) {
  input.addEventListener('input', e => {
    console.log(e);
    // console.log(e.target.name);
    // Creating object with Input fields name prop as key & values from input elements
    formDataTwo[e.target.name] =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
  });
}

// note - input event & change event does the same thing
// change event only updates on loosing focus and on enter
