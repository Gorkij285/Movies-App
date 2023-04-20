import React from 'react'
import ReactDOM from 'react-dom/client'
import { Tabs } from 'antd';
import './index.css'
import Main from './Main/Main.js'
import InputWithState from './InputWithState/InputWithState'



class App extends React.Component {
  state = {
    data: [
      
    ],
    inputValue: '',
    guestSessionId: ''
  }

  componentDidMount() {
    const API_KEY = '928ffe3d29017199a700e964c38bdedb';
    const API_URL = `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${API_KEY}`;

    fetch(API_URL)
      .then(response => response.json())
      .then(data => this.setState({ guestSessionId: data.guest_session_id }))
      .catch(error => console.error(error));
  }

  fetchRatedMovies = () => {
    const { guestSessionId } = this.state;
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=your_api_key&language=en-US&guest_session_id=${guestSessionId}`)
      .then(response => response.json())
      .then(data => {
        const ratedMovies = data.results.filter(movie => movie.rating !== 0);
        this.setState({ movies: ratedMovies });
      })
      .catch(error => console.error(error));
  };

  inputValue = (str) => {
    this.setState({ inputValue: str})
  }

  render() {
    const { guestSessionId } = this.state
    console.log('id',guestSessionId)
    return (
      <div className='app'>
        <InputWithState inputValue={this.inputValue}/>
        <Main findMovie={this.state.inputValue}/>
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.querySelector('.movies'))
root.render(
    <App />
)
