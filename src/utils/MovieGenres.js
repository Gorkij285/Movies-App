function getMovieGenres(movieId) {
  const apiKey = '928ffe3d29017199a700e964c38bdedb'

  return fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`)
      }
      return response.json()
    })
    .then((data) => data.genres)
    .catch((error) => console.log(error))
}

export default getMovieGenres
