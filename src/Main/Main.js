import React, { Component } from 'react'
import './Main.css'
import Block from '../Block/Block.js'
import { searchMovies } from '../apiFunc/api.js'
import { Pagination, Spin, Alert } from 'antd'

const MyComponent = () => (
  // <div>  //
    <Spin size="large" tip="Loading..." style={{ margin: 'auto' }} />
  /* </div> */
);

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      error: null,
      isOffline: false,
      currentPage: 1,
      total: 1,
    };
  }

  componentDidMount() {
    window.addEventListener('offline', this.handleOffline);
    window.addEventListener('online', this.handleOnline);
    const apiKey = '928ffe3d29017199a700e964c38bdedb'
    let toFind = this.props.findMovie  ? 
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(this.props.findMovie)}&page=${this.state.currentPage}` :
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${this.state.currentPage}`
    fetch(toFind)
      .then(response => response.json())
      .then(data => {
        if (data && Array.isArray(data.results)) {
          this.setState({ data: data.results, loading: false, error: null , total: Math.ceil(data.total_results / 20)});
        } else {
          console.error("Invalid data format returned from API.");
          this.setState({ loading: false, error: 'Invalid data format returned from API.' });
        }
      })
      .catch(error => {
        console.error(error)
        this.setState({ loading: false, error: error.message });
      })
  }

  componentDidUpdate(prevState) {
    console.log(this.state.currentPage,111111111111111111111111111)
    console.log(prevState.currentPage,this.state.currentPage)
    if (prevState.currentPage !== this.state.currentPage) {
      const apiKey = '928ffe3d29017199a700e964c38bdedb'
      let toFind = this.props.findMovie ? 
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(this.props.findMovie)}&page=${this.state.currentPage}` :
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${this.state.currentPage}`
      fetch(toFind)
        .then(response => response.json())
        .then(data => {
          if (data && Array.isArray(data.results)) {
            console.log('ОБНОВА')
            this.setState({ data: data.results, loading: false, error: null , total: Math.ceil(data.total_results / 20)});
          } else {
            console.error("Invalid data format returned from API.");
            this.setState({ loading: false, error: 'Invalid data format returned from API.' });
          }
        })
        .catch(error => {
          console.error(error)
          this.setState({ loading: false, error: error.message});
        })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('offline', this.handleOffline);
    window.removeEventListener('online', this.handleOnline);
  }

  handleOffline = () => {
    this.setState({ isOffline: true });
  }
  
  handleOnline = () => {
    this.setState({ isOffline: false });
  }

  handlePageChange = (page) => {
    this.setState(prevState => ({ 
      currentPage: page 
    }));
    console.log("handlePageChange", page)
  };
    



  render() {
    if (this.state.loading) {
      // показываем индикатор загрузки, пока данные еще не загружены
      return MyComponent()
    }

    if (this.state.error) {
      // если возникла ошибка, выводим компонент Alert
      return <Alert message="Ошибка" description="По вашему запросу ничего не найдено" type="error" />;
    }

    if (!Array.isArray(this.state.data)) {
      // если данные не массив, выводим сообщение об ошибке
      return <p>Error loading data.</p>;
    }
    if (this.state.isOffline) {
      // если отсутствует интернет-соединение
      return <Alert message="Ошибка" description="Отсутствует интернет-соединение" type="error" />;
    } 

    const { currentPage, total} = this.state;
    console.log(total,"РЕНДЕР")
    return (
      <section className='Main-section'>
        {this.state.data.map(item => (
          <Block
            key={item.id}
            title={item.title}
            date={item.release_date}
            info={item.overview}
            poster={item.poster_path}
            rating={item.vote_average}
          ></Block>
        ))}
        <Pagination
          current={currentPage}
          total={total}
          pageSize={20}
          onChange={this.handlePageChange}
        />
      </section>
    )
  }
}

export default Main
