function isTouching(a, b) {
  // element's position
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();

  return !(
    aRect.top + aRect.height < bRect.top ||
    aRect.top > bRect.top + bRect.height ||
    aRect.left + aRect.width < bRect.left ||
    aRect.left > bRect.left + bRect.width
  );
}

const avatar = document.querySelector('#player');

const extractPosition = pos => {
  if (!pos) return 100;
  return parseInt(pos.slice(0, -2));
};

// move avatar
window.addEventListener('keyup', function (e) {
  if (e.key === 'ArrowDown' || e.key === 'Down') {
    const currTop = extractPosition(avatar.style.top);
    avatar.style.top = `${currTop + 50}px`;
  } else if (e.key === 'ArrowUp' || e.key === 'Up') {
    const currTop = extractPosition(avatar.style.top);
    avatar.style.top = `${currTop - 50}px`;
  } else if (e.key === 'ArrowRight' || e.key === 'Right') {
    const currLeft = extractPosition(avatar.style.left);
    avatar.style.left = `${currLeft + 50}px`;
    avatar.style.transform = 'scale(1,1)';
  } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
    const currLeft = extractPosition(avatar.style.left);
    avatar.style.left = `${currLeft - 50}px`;
    avatar.style.transform = 'scale(-1,1)';
  }

  // when two elements touching
  if (isTouching(avatar, coin)) moveCoin();
});

// move coin
const coin = document.querySelector('#coin');

const moveCoin = () => {
  const y = Math.floor(Math.random() * window.innerHeight);
  const x = Math.floor(Math.random() * window.innerWidth);

  coin.style.top = `${y}px`;
  coin.style.left = `${x}px`;
};

moveCoin();
