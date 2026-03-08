const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEy = '29c4d2a018dee2ff27a0c7dc544374bd';

export const getMovies = async () => {
    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEy}`)
    const data = await res.json();
    return data.results;
}

export const searchMovie = async (query) => {
    const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEy}&query=${encodeURIComponent(query)}`)
    const data = await res.json();
    return data.results;
}