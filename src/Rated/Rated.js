import React from 'react'

import Block from '../Block/Block.js'

class RatedMovies extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      guestSessionId: this.props.guestID,
      key: this.props.apiKey,
      ratedMovies: [],
    }
  }

  componentDidMount() {
    const { guestSessionId, key } = this.state
    fetch(`https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=${key}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results)
        this.setState({ ratedMovies: data.results })
      })
      .catch((err) => {
        console.log('ОШИБКА ЗАПРОСА', err)
      })
  }

  componentDidUpdate(prevProps) {
    const { guestSessionId, key } = this.state
    if (prevProps.clicksValue !== this.props.clicksValue) {
      // Получаем список фильмов, которые мы оценили
      fetch(`https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?api_key=${key}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.results)
          this.setState({ ratedMovies: data.results })
        })
        .catch((err) => {
          console.log('ОШИБКА ЗАПРОСА', err)
        })
    }
  }

  render() {
    const { ratedMovies } = this.state
    if (ratedMovies.length < 1) return <h2>нет оцененных фильмов</h2>
    return (
      <>
        <h2>Фильмы, которые вы оценили:</h2>
        <ul>
          {ratedMovies.map((item) => (
            <Block key={item.id} title={item.title} date={item.release_date} info={item.overview} poster={item.poster_path} rating={item.vote_average} id={item.id} SessionId={this.props.guestID} ratings={item.rating}></Block>
          ))}
        </ul>
      </>
    )
  }
}

export default RatedMovies
