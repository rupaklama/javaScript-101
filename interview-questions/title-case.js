// Write a function to convert a string to title case

function titleCase(words) {
  return words
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

console.log(titleCase("I'm a LITTLE tea pot"));
