'use strict';

const boxes = document.querySelectorAll('.box');

window.addEventListener('scroll', checkBoxes);

function checkBoxes() {
  const triggerPointBottom = (window.innerHeight / 5) * 4;
  console.log('triggerPointBottom', triggerPointBottom);

  boxes.forEach(box => {
    const boxTop = box.getBoundingClientRect().top;
    console.log('boxTop', boxTop);

    if (boxTop < triggerPointBottom) {
      box.classList.add('show');
    } else {
      box.classList.remove('show');
    }
  });
}
