// Helper functions

// Reusable debounce function
const debounce = (func, delay = 1000) => {
  let timeoutId;

  // if more than one arguments, the rest syntax will create an array of args
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      // apply() method calls the specified function with a given this value, and arguments provided as an array
      // call the func & pass all args as a separate arg to the original function - func(arg1, arg2, arg3)
      func.apply(null, args);
    }, delay);
  };
};
