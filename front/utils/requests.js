const API_KEY = process.env.API_KEY

export default {
    fetchTrending: {
        title: "Trending",
        url: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    },
    fetchTopRated: {
        title: "Top Rated",
        url: `/movie/top_rated/?api_key=${API_KEY}&language=en-US`,
    },
    fetchActionMovies: {
        title: "Action",
        url: `/discover/movie/?api_key=${API_KEY}&with_genres=10752`,
    },
    fetchComedyMovies: {
        title: "Comedy",
        url: `/discover/movie/?api_key=${API_KEY}&with_genres=35`,
    },
    fetchDramaMovies: {
        title: "Drama",
        url: `/discover/movie/?api_key=${API_KEY}&with_genres=18`,
    },
    fetchFantasyMovies: {
        title: "Fantasy",
        url: `/discover/movie/?api_key=${API_KEY}&with_genres=14`,
    },
    fetchHorrorMovies: {
        title: "Horror",
        url: `/discover/movie/?api_key=${API_KEY}&with_genres=27`,
    },
    fetchMisteryMovies: {
        title: "Mistery",
        url: `/discover/movie/?api_key=${API_KEY}&with_genres=9648`,
    },
    fetchRomanceMovies: {
        title: "Romance",
        url: `/discover/movie/?api_key=${API_KEY}&with_genres=10749`,
    },
    fetchSciFi: {
        title: "Sci-Fi",
        url: `/discover/movie/?api_key=${API_KEY}&with_genres=878`,
    },
    fetchWestern: {
        title: "Western",
        url: `/discover/movie/?api_key=${API_KEY}&with_genres=37`,
    },
}