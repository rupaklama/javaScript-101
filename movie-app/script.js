'use strict';
const API_KEY = 'GET_YOUR_OWN_KEY';
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;

const API_SEARCH_URL = `https://api.themoviedb.org/3/search/movie?&api_key=${API_KEY}&query=`;

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

const form = document.getElementById('form');
const searchInput = document.getElementById('search');
const main = document.getElementById('main');

// Get initial movies
getMovies(API_URL);

async function getMovies(url) {
  try {
    const res = await fetch(url);

    if (res.status === 200) {
      const data = await res.json();
      console.log(data.results);
      showMovies(data.results);
    }
  } catch (error) {
    console.error(error);
    alert(error.message);
    return error.message;
  }
}

function showMovies(movies) {
  main.innerHTML = '';

  let moviesList = [...movies];

  moviesList.map(movie => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');

    movieEl.innerHTML = `
        <img
          src="${IMG_PATH + poster_path}"
          alt="${title}"
        />

        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>

        <div class="overview">
          <h3>Overview</h3>
          <p>
            ${overview}
          </p>
        </div>
    `;

    main.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const searchTerm = searchInput.value;

  if (searchTerm && searchTerm !== '') {
    getMovies(API_SEARCH_URL + searchTerm);

    searchInput.value = '';
  } else {
    window.location.reload();
  }
});
