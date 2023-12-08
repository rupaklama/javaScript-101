'use strict';

const smallCups = document.querySelectorAll('.cup-small');
const liters = document.getElementById('liters');
const percentage = document.querySelector('.percentage');
const remained = document.querySelector('.remained');

updateBigCup();

smallCups.forEach((cup, idx) => {
  cup.addEventListener('click', () => highlightCups(idx));
});

function highlightCups(clickedIdx) {
  if (
    smallCups[clickedIdx].classList.contains('full') &&
    !smallCups[clickedIdx].nextElementSibling.classList.contains('full')
  ) {
    clickedIdx--;
  }

  smallCups.forEach((cup, currentIdx) => {
    // all the ones before should filled up on clicking the current one as well
    if (currentIdx <= clickedIdx) {
      cup.classList.add('full');
    } else {
      cup.classList.remove('full');
    }
  });

  updateBigCup();
}

function updateBigCup() {
  const fullCups = document.querySelectorAll('.cup-small.full').length;
  const totalCups = smallCups.length;

  if (fullCups === 0) {
    percentage.style.visibility = 'hidden';
    percentage.style.height = 0;
  } else {
    percentage.style.visibility = 'visible';
    // multiply by the height of large cup at the end
    percentage.style.height = `${(fullCups / totalCups) * 330}px`;

    // in percentage
    percentage.innerText = `${(fullCups / totalCups) * 100}%`;
  }

  if (fullCups === totalCups) {
    remained.style.visibility = 'hidden';
    remained.style.height = 0;
  } else {
    remained.style.visibility = 'visible';
    // liters count, 2 - total liters
    liters.innerText = `${2 - (250 * fullCups) / 1000}L`;
  }
}
