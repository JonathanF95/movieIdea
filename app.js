const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e4e758156ee953ca6dffecc97c17f6d8&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=e4e758156ee953ca6dffecc97c17f6d8&query="';
const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');
const mylikes = document.getElementById('mylikes');
const thumbsDown = document.getElementById('thumbs-down')

function shortenText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength - 3) + '...';
  }
  

getMovies(API_URL);
async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();

    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = '';

    movies.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;
        const shortOverview = shortenText(overview, 200);  // Shorten the overview

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML = `
        <img
        src="${IMG_PATH + poster_path}"
        alt="${title}">
        <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassbyRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
        <h3>Overview</h3>
        <p>${shortOverview}</p>  <!-- Use the shortened overview -->
        <div class="icons">
        <i class="fa-regular fa-thumbs-up" id="thumbs-up"></i>
        <i class="fa-regular fa-thumbs-down" id="thumbs-down"></i>
        </div>
        </div>
        `

        main.appendChild(movieEl)

    })
}


function getClassbyRate(vote){
    if(vote >= 8){
        return 'green';
    }else if(vote >= 5){
        return 'orange';
    }else{
        return 'red'
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm);

        search.value = '';
    } else {
        window.location.reload();
    }

})
