export async function searchMovies(searchTerm) {
  const apiKey = '928ffe3d29017199a700e964c38bdedb'
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchTerm)}`
  const response = await fetch(url)
  const data = await response.json()
  return data.results
}
