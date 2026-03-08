export default async function handler(req, res) {
  const { path, query } = req.query;

  const API_KEY = process.env.TMDB_API_KEY;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${path}?api_key=${API_KEY}&${query || ""}`
    );

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch from TMDB" });
  }
}