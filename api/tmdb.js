
export default async function handler(req, res) {
    const { path, ...query } = req.query;
    const API_KEY = process.env.TMDB_API_KEY; 

    if (!API_KEY) {
        return res.status(500).json({ error: "TMDB_API_KEY not set" });
    }

    try {
        const queryString = new URLSearchParams(query).toString();
        const response = await fetch(
            `https://api.themoviedb.org/3/${path}?api_key=${API_KEY}&${queryString}`
        );
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("TMDB fetch error:", error);
        res.status(500).json({ error: "Failed to fetch from TMDB" });
    }
}