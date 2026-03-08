const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEy = '29c4d2a018dee2ff27a0c7dc544374bd';

export const getMovies = async () => {
    const res = await fetch(`/api/tmdb?path=movie/popular`)
    const data = await res.json();
    return data.results;
}

export const searchMovie = async (query) => {
    const res = await  fetch(`/api/tmdb?path=search/movie&query=${encodeURIComponent(query)}`)
    const data = await res.json();
    return data.results;
}
