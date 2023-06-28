'use strict';

const leftContainer = document.querySelector('.left');
const rightContainer = document.querySelector('.right');
const mainContainer = document.querySelector('.container');

// mouseenter is same as hover
leftContainer.addEventListener('mouseenter', () => mainContainer.classList.add('hover-left'));
leftContainer.addEventListener('mouseleave', () => mainContainer.classList.remove('hover-left'));

rightContainer.addEventListener('mouseenter', () => mainContainer.classList.add('hover-right'));
rightContainer.addEventListener('mouseleave', () => mainContainer.classList.remove('hover-right'));
