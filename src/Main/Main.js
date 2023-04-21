import React, { Component } from 'react'
import './Main.css'
import { Spin, Alert, Pagination } from 'antd'

import Block from '../Block/Block.js'
import { searchMovies } from '../apiFunc/api.js'
import { Spin, Alert } from 'antd'

const MyComponent = () => (
  // <div>  //
    <Spin size="large" tip="Loading..." style={{ margin: 'auto' }} />
  /* </div> */
);

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      loading: true,
      error: null,
      isOffline: false
    };
  }

  componentDidMount() {
    window.addEventListener('offline', this.handleOffline)
    window.addEventListener('online', this.handleOnline)
    const { currentPage } = this.state
    const { findMovie } = this.props
    const apiKey = '928ffe3d29017199a700e964c38bdedb'
    let toFind = this.props.findMovie  ? 
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(this.props.findMovie)}` :
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`
    fetch(toFind)
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.results)) {
          this.setState({ data: data.results, loading: false, error: null });
        } else {
          console.error('Invalid data format returned from API.')
          this.setState({ loading: false, error: 'Invalid data format returned from API.' })
        }
      })
      .catch((error) => {
        console.error(error)
        this.setState({ loading: false, error: error.message })
      })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.findMovie !== this.props.findMovie) {
      const apiKey = '928ffe3d29017199a700e964c38bdedb'
      let toFind = this.props.findMovie ? 
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(this.props.findMovie)}` :
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`
      fetch(toFind)
        .then((response) => response.json())
        .then((data) => {
          if (data && Array.isArray(data.results)) {
            this.setState({ data: data.results, loading: false, error: null});
          } else {
            console.error('Invalid data format returned from API.')
            this.setState({ loading: false, error: 'Invalid data format returned from API.' })
          }
        })
        .catch((error) => {
          console.error(error)
          this.setState({ loading: false, error: error.message })
        })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('offline', this.handleOffline)
    window.removeEventListener('online', this.handleOnline)
  }

  handleOffline = () => {
    this.setState({ isOffline: true })
  }

  handleOnline = () => {
    this.setState({ isOffline: false })
  }


  render() {
    if (this.state.loading) {
      // показываем индикатор загрузки, пока данные еще не загружены
      return MyComponent()
    }

    if (this.state.error) {
      // если возникла ошибка, выводим компонент Alert
      return <Alert message="Ошибка" description="По вашему запросу ничего не найдено" type="error" />
    }

    if (!Array.isArray(this.state.data)) {
      // если данные не массив, выводим сообщение об ошибке
      return <p>Error loading data.</p>
    }
    if (this.state.isOffline) {
      // если отсутствует интернет-соединение
      return <Alert message="Ошибка" description="Отсутствует интернет-соединение" type="error" />
    }

    if (this.state.data.length < 1) return <h2>ничего не найдено попробуйте изменить запрос</h2>

    const { currentPage, total } = this.state

    const { currentPage, total} = this.state;
    console.log(total,"РЕНДЕР")
    return (
      <section className="Main-section">
        {this.state.data.map((item) => (
          <Block key={item.id} title={item.title} date={item.release_date} info={item.overview} poster={item.poster_path} rating={item.vote_average} id={item.id} SessionId={this.props.guestID}></Block>
        ))}
      </section>
    )
  }
}

export default Main
