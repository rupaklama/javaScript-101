'use strict';

const counters = document.querySelectorAll('.counter');

counters.forEach(el => {
  el.innerText = 0;

  const updateCounter = () => {
    const targetValue = +el.getAttribute('data-target');

    // console.log(typeof el.innerText);
    const count = +el.innerText;

    // This increment value will increment up in a good speed
    const incrementValue = targetValue / 200;
    console.log(incrementValue);

    if (count < targetValue) {
      el.innerText = `${Math.ceil(count + incrementValue)}`;
      setTimeout(updateCounter, 1);
    } else {
      el.innerText = targetValue;
    }
  };

  updateCounter();
});
