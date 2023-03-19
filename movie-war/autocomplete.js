// reusable autocomplete function

const createAutoComplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData,
}) => {
  root.innerHTML = `
  <label for="input"><b>Search</b></label>
  <input class="input" id="input" />

  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results">
      </div>
    </div>
  </div>
`;

  const inputEl = root.querySelector('input');
  const dropdown = root.querySelector('.dropdown');
  const resultsWrapper = root.querySelector('.results');

  const onInputChange = async e => {
    const items = await fetchData(e.target.value);
    console.log(items);

    if (!items.length) {
      dropdown.classList.remove('is-active');
      return;
    }

    // clear previous rendered elements before displaying new list
    resultsWrapper.innerHTML = '';

    // open dropdown after fetch;
    dropdown.classList.add('is-active');

    for (let item of items) {
      const option = document.createElement('a');

      option.classList.add('dropdown-item');

      option.innerHTML = renderOption(item);

      option.addEventListener('click', () => {
        dropdown.classList.remove('is-active');

        input.value = inputValue(item);

        onOptionSelect(item);
      });

      resultsWrapper.appendChild(option);
    }
  };

  // note - debouncing an input, waiting for some time to pass after the last event to do something
  inputEl.addEventListener(
    'input',
    // e => {
    // clear previous timeout to stop making api calls on key press
    // if (timeoutId) {
    //   clearTimeout(timeoutId);
    // }

    // So basically - when we type into the input, a timer is going to be set to query the api starting in one second.
    // But - the trick is, every time we type AGAIN into the input, it cancels the previous timer.
    // note - if we wait for a full second, then the request will not be cancelled, it will successfully call the api.
    // timeoutId = setTimeout(() => {
    //   fetchData(e.target.value);
    // }, 1000);

    debounce(onInputChange, 500)
  );

  // global document
  document.addEventListener('click', e => {
    if (!root.contains(e.target)) {
      dropdown.classList.remove('is-active');
    }
  });
};
