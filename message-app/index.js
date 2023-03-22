// elements
const form = document.querySelector('form');
const input = document.querySelector('input');
const linkInput = document.querySelector('#link-input');

const messageForm = document.querySelector('#message-form');
const messageShow = document.querySelector('#message-show');
const linkForm = document.querySelector('#link-form');

const { hash } = window.location;
// console.log(atob(hash.replace('#', '')));

const message = atob(hash.replace('#', ''));

if (message) {
  messageForm.classList.add('hide');
  messageShow.classList.remove('hide');

  document.querySelector('h1').innerHTML = message;
}

form.addEventListener('submit', e => {
  e.preventDefault();

  messageForm.classList.add('hide');
  linkForm.classList.remove('hide');

  // note - ASCII characters into base64
  // Encoding - btoa() method creates a Base64-encoded string
  const encrypted = btoa(input.value);
  linkInput.value = `${window.location}#${encrypted}`;

  // to auto select input value
  linkInput.select();

  // Decoding - atob() function decodes a string of data which has been encoded using Base64 encoding
});

// note - when console logging window.location object as a string, we get current URL href PATH
// `${window.location}` - 'http://127.0.0.1:5501/message-app/index.html'
