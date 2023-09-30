'use strict';

const navBar = document.getElementById('nav');
const button = document.getElementById('toggle');

button.addEventListener('click', () => {
  console.log('toggled!');
  navBar.classList.toggle('active');
});
