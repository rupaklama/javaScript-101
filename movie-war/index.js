// const root = document.querySelector('.autocomplete');

// root.innerHTML = `
//   <label for="input"><b>Search For a Movie</b></label>
//   <input class="input" id="input" />

//   <div class="dropdown">
//     <div class="dropdown-menu">
//       <div class="dropdown-content results" >

//       </div>
//     </div>
//   </div>
// `;

// const inputEl = document.querySelector('input');
// const dropdown = document.querySelector('.dropdown');
// const resultsWrapper = document.querySelector('.results');

// const fetchData = async searchTerm => {
//   try {
//     const response = await axios.get('http://www.omdbapi.com/', {
//       params: {
//         apikey: '686ae639',
//         // i: 'tt0848228',
//         s: searchTerm,
//       },
//     });

//     if (response.data.Error) {
//       return [];
//     }

//     return response.data.Search;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const onInputChange = async e => {
//   const movies = await fetchData(e.target.value);
//   console.log(movies);

//   if (!movies.length) {
//     dropdown.classList.remove('is-active');
//     return;
//   }

//   // clear previous rendered elements before displaying new list
//   resultsWrapper.innerHTML = '';

//   // open dropdown after fetch;
//   dropdown.classList.add('is-active');

//   for (let movie of movies) {
//     const option = document.createElement('a');
//     const imgSrc = movie.Poster === 'N/A' ? ' ' : movie.Poster;

//     option.classList.add('dropdown-item');

//     option.innerHTML = `
//       <img src="${imgSrc}"  />
//       <span>${movie.Title}</span>
//     `;

//     option.addEventListener('click', () => {
//       dropdown.classList.remove('is-active');

//       input.value = movie.Title;

//       onMovieSelect(movie);
//     });

//     resultsWrapper.appendChild(option);
//   }
// };

// inputEl.addEventListener(

//   debounce(onInputChange, 500)
// );

// document.addEventListener('click', e => {
//   if (!root.contains(e.target)) {
//     dropdown.classList.remove('is-active');
//   }
// });

// reusable funcs between autocomplete widgets
const autoCompleteConfig = {
  renderOption(movie) {
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;

    return `
    <img src="${imgSrc}"  />
    ${movie.Title} (${movie.Year})
  `;
  },

  inputValue(movie) {
    return movie.Title;
  },

  async fetchData(searchTerm) {
    try {
      const response = await axios.get('http://www.omdbapi.com/', {
        params: {
          apikey: '686ae639',
          // i: 'tt0848228',
          s: searchTerm,
        },
      });

      if (response.data.Error) {
        return [];
      }

      return response.data.Search;
    } catch (error) {
      console.log(error);
    }
  },
};

// note - using our reusable autocomplete widget
createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector('#left-autocomplete'),
  onOptionSelect(movie) {
    document.querySelector('.tutorial').classList.add('is-hidden');
    onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
  },
});
createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector('#right-autocomplete'),
  onOptionSelect(movie) {
    document.querySelector('.tutorial').classList.add('is-hidden');
    onMovieSelect(movie, document.querySelector('#right-summary'), 'right');
  },
});

// to compare values
let leftMovie;
let rightMovie;

// helper function
const onMovieSelect = async (movie, summaryElement, side) => {
  try {
    const response = await axios.get('http://www.omdbapi.com/', {
      params: {
        apikey: '686ae639',
        i: movie.imdbID,
      },
    });

    summaryElement.innerHTML = movieTemplate(response.data);

    if (side === 'left') {
      leftMovie = response.data;
    } else {
      rightMovie = response.data;
    }
  } catch (error) {
    console.log(error);
  }

  if (leftMovie && rightMovie) {
    runComparison();
  }
};

const runComparison = () => {
  const leftSideStats = document.querySelector('#left-summary').querySelectorAll('.notification');

  const rightSideStats = document.querySelector('#right-summary').querySelectorAll('.notification');

  // looping both arrays on the same time
  leftSideStats.forEach((leftItem, i) => {
    const rightItem = rightSideStats[i];

    const leftSideValue = parseInt(leftItem.dataset.value);
    const rightSideValue = parseInt(rightItem.dataset.value);

    if (rightSideValue > leftSideValue) {
      leftItem.classList.remove('is-primary');
      leftItem.classList.add('is-warning');
    } else {
      rightItem.classList.remove('is-primary');
      rightItem.classList.add('is-warning');
    }
  });
};

const movieTemplate = movieDetail => {
  const dollars = parseInt(movieDetail.BoxOffice.replace('$', '').replaceAll(',', ''));

  const metaScore = parseInt(movieDetail.Metascore);
  const imdbRating = parseFloat(movieDetail.imdbRating);
  const imdbVotes = parseInt(movieDetail.imdbVotes.replaceAll(',', ''));

  let awards = 0;
  movieDetail.Awards.split(' ').forEach(word => {
    const value = parseInt(word);

    // checking to see if a value is not a number
    if (isNaN(value)) {
      return;
    } else {
      awards = awards + value;
    }
  });

  return `
    <article class="media">
      <figure class="media-left">
        <p class="image">
          <img src="${movieDetail.Poster}" alt="${movieDetail.Title}" />
        </p>
      </figure>

      <div class="media-content">
        <div class="content">
          <h1>${movieDetail.Title}</h1>
          <h4>${movieDetail.Genre}</h4>
          <p>${movieDetail.Plot}</p>
        </div>
      </div>
    </article>

    <article class="notification is-primary" data-value=${awards}>
      <p class="title">${movieDetail.Awards}</p>
      <p class="subtitle">Awards</p>
    </article>

    <article class="notification is-primary" data-value=${dollars}>
      <p class="title">${movieDetail.BoxOffice}</p>
      <p class="subtitle">BoxOffice</p>
    </article>

    <article class="notification is-primary" data-value=${metaScore}>
      <p class="title">${movieDetail.Metascore}</p>
      <p class="subtitle">Metascore</p>
    </article>

    <article class="notification is-primary" data-value=${imdbRating}>
      <p class="title">${movieDetail.imdbRating}</p>
      <p class="subtitle">imdb Rating</p>
    </article>
    <article class="notification is-primary" data-value=${imdbVotes}>
      <p class="title">${movieDetail.imdbVotes}</p>
      <p class="subtitle">imdb Votes</p>
    </article>
  `;
};
