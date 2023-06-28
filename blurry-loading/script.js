'use strict';

const loadText = document.querySelector('.loading-text');
const bgImage = document.querySelector('.bg');

let loadPercentage = 0;

let timeInterval = setInterval(blurring, 30);

function blurring() {
  loadPercentage++;

  loadText.innerText = `${loadPercentage}%`;
  loadText.style.opacity = scale(loadPercentage, 0, 100, 1, 0);
  bgImage.style.filter = `blur(${scale(loadPercentage, 0, 100, 30, 0)}px)`;

  if (loadPercentage === 100) {
    clearInterval(timeInterval);
  }
}

// map a range of numbers to another range of numbers
function scale(number, inMin, inMax, outMin, outMax) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
