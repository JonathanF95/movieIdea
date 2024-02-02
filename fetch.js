const axios = require('axios');

async function fetchData() {
    try {
        const response = await axios.get('https://api.imdb.com/your_endpoint', {
            params: {
                api_key: 'your_api_key'
            }
        });
        const movies = response.data;
        // Process and store data
        movies.forEach(movie => {
            storeMovieData(movie);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();
