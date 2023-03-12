'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

/* scrolling */
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

// Event Delegation is when event bubbles up to the parent elements
// document.querySelectorAll('.nav__link').forEach(el => {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();

//     const id = this.getAttribute('href');
//     console.log(id);

//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// note above is not just an Efficient solution when there are many links
// therefore, Event Delegation will solve the above issue with performance
// note - we do this by putting an Event Listener to the Common Parent of all the Elements we want
document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();

  // console.log('target', e.target, e.currentTarget);

  // NOTE - The Event Bubbles up to the Parent element to make this work
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// using event delegation to boost performance here
tabsContainer.addEventListener('click', e => {
  e.preventDefault();

  // closest method is to Find the closest element that matches the CSS selector
  // returns 'null' if no matching element found
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  // guard clause
  if (!clicked) return;

  // remove active classes on button click
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // add class for active tab
  clicked.classList.add('operations__tab--active');

  // Select active content area element at the same time dynamically with data attrib
  // console.log(clicked.dataset.tab); // to access data attrib value
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    // after selecting add a class for style
    .classList.add('operations__content--active');
});

// TEST
btnScrollTo.addEventListener('click', e => {
  // The getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
  // getBoundingClientRect() method returns a DOMRect object with eight properties: left, top, right, bottom, x, y, width, height.
  // note - x position value is measured from the left side, y value is from the top
  const s1coords = section1.getBoundingClientRect();
  console.log('section', s1coords);

  // button
  console.log('button', e.target.getBoundingClientRect());

  // scroll positions from the Browser Window
  // pageXOffset - read-only Window property pageXOffset is an alias for scrollX
  // pageYOffset - vertical scroll position from the top to the element
  console.log('Current scroll (x/y)', window.pageXOffset, window.pageYOffset);

  // viewport/document dimension - HTML
  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    // document.documentElement.clientWidth
    document.querySelector('html').clientWidth
  );
    
    // old way
    window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset)

  // modern way by selecting element
  section1.scrollIntoView({ behavior: 'smooth' });
});

/* DOM Traversing - to traverse the DOM (also known as walking or navigating the DOM) with parent, child, and sibling properties */
const h1 = document.querySelector('h1');

// note - node can be anything like text, element, comment etc

// note - going downwards: child, selecting child elements
console.log(h1.querySelectorAll('.highlight'));

// direct children nodes
console.log(h1.childNodes);

// direct children collections - html elements
console.log(h1.children);

// first & last child elements
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// note - going upwards: parent, selecting parent elements
console.log(h1.parentNode);
console.log(h1.parentElement);

// closest parent elements
h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-primary)';

// note - going sideways: siblings, selecting sibling elements
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

// note - HTMLCollection CAN UPDATE
[...h1.parentElement.children].forEach(function (el) {
  // comparing elements here
  if (el !== h1) el.style.transform = 'scale(1.1)';
});

/* Selecting Elements from the top of DOM */

// entire document object
// console.log(document.documentElement); // <html>...</html>

// single dom element
// console.log(document.head); // <head>...</head>
// console.log(document.body); // <body>...</body>

/* Modern way of doing same as above or selecting elements */
// console.log(document.querySelector('head')); // single element

// Returns NodeList(4) - NodeList CANNOT UPDATE
// console.log(document.querySelectorAll('.section')); // array of multiple elements

// console.log(document.getElementById('section--1')); // by id

// Returns HTMLCollection(9) - HTMLCollection CAN UPDATE
console.log(document.getElementsByTagName('button')); // array of multiple elements

// Returns HTMLCollection(5)
// console.log(document.getElementsByClassName('btn'));

/* Creating & Inserting Elements */

// creating dom element
const message = document.createElement('div');

// adding class name
message.classList.add('cookie-message');

// adding text
// message.textContent = 'we use cookies to improve functionalities & analytics.';

// inserting html element
message.innerHTML =
  'we use cookies to improve functionalities & analytics. <button class="btn btn--close-cookie">Got it</button>';

// Inserting into Header element
const headerElement = document.querySelector('header');

// to add before as a first child inside of Header element
// headerElement.prepend(message);

// to add as a last child of an element
// cloneNode(true) to make copy of an element
// headerElement.append(message.cloneNode(true));
// headerElement.append(message.cloneNode(true));

// To insert before or after as a Sibling Element
headerElement.before(message);
// headerElement.after(message);

// to Delete Element
document.querySelector('.cookie-message').addEventListener('click', () => {
  // remove this element
  message.remove();
});

// styles - set as Inline Styles
message.style.backgroundColor = '#37383d';
message.style.width = '100%';

// to access Inline Styles we manually set
// console.log(message.style.backgroundColor);

// to access Styles defined in our styling & default styles
// console.log(getComputedStyle(message).height);

// manually updating the default height
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
// console.log(getComputedStyle(message).height);

// setProperty - to update styles directly in CSS Variables
// documentElement is to select entire document object/DOM
document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
const logo = document.querySelector('.nav__logo');
// console.log(logo.className);

// accessing custom Data attribute with 'dataset'
// console.log(logo.dataset.versionNumber);
