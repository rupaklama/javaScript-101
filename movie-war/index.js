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

const fetchData = async searchTerm => {
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
};

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

// note - using our reusable autocomplete widget
createAutoComplete({
  root: document.querySelector('.autocomplete'),
  renderOption(movie) {
    const imgSrc = movie.Poster === 'N/A' ? ' ' : movie.Poster;

    return `
    <img src="${imgSrc}"  />
    ${movie.Title} (${movie.Year})
  `;
  },
});

// helper function
const onMovieSelect = async movie => {
  try {
    const response = await axios.get('http://www.omdbapi.com/', {
      params: {
        apikey: '686ae639',
        i: movie.imdbID,
      },
    });

    console.log(response.data);
    document.querySelector('#summary').innerHTML = movieTemplate(response.data);
  } catch (error) {
    console.log(error);
  }
};

const movieTemplate = movieDetail => {
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

    <article class="notification is-primary">
      <p class="title">${movieDetail.Awards}</p>
      <p class="subtitle">Awards</p>
    </article>

    <article class="notification is-primary">
      <p class="title">${movieDetail.BoxOffice}</p>
      <p class="subtitle">BoxOffice</p>
    </article>

    <article class="notification is-primary">
      <p class="title">${movieDetail.Metascore}</p>
      <p class="subtitle">Metascore</p>
    </article>

    <article class="notification is-primary">
      <p class="title">${movieDetail.imdbRating}</p>
      <p class="subtitle">imdb Rating</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.imdbVotes}</p>
      <p class="subtitle">imdb Votes</p>
    </article>
  `;
};
