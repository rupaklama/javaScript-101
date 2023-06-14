// elements
const form = document.querySelector('form');
const input = document.querySelector('#input');
const linkInput = document.querySelector('#link-input');

const messageForm = document.querySelector('#message-form');
const messageShow = document.querySelector('#message-show');
const linkForm = document.querySelector('#link-form');

// http://127.0.0.1:5501/message-app/index.html#YWRmZA==
// # - Hash/Fragment is to store data temporarily in the browser
const { hash } = window.location; // "#YWRmZA=="
// console.log(atob(hash.replace('#', '')));

// Decoding - atob() function is to convert Base64 into ASCII - normal characters
const message = atob(hash.replace('#', ''));

if (message) {
  messageForm.classList.add('hide');
  messageShow.classList.remove('hide');

  document.querySelector('h1').innerText = message;
}

form.addEventListener('submit', e => {
  e.preventDefault();

  messageForm.classList.add('hide');
  linkForm.classList.remove('hide');

  // note - ASCII characters into base64
  // Encoding - btoa() method creates a Base64-encoded string
  // btoa() - default browser api method to convert Normal Characters (ascii) into Base64 characters
  const encrypted = btoa(input.value);
  linkInput.value = `${window.location}#${encrypted}`;

  // to auto select input value
  linkInput.select();
});

// note - when console logging window.location object as a string, we get current URL href PATH
// `${window.location}` - 'http://127.0.0.1:5501/message-app/index.html'
