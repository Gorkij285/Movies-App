import React from 'react'
import ReactDOM from 'react-dom/client'
<<<<<<< HEAD
import { Tabs } from 'antd'

import RatedMovies from './Rated/Rated.js'
=======
import { Tabs } from 'antd';
>>>>>>> 90322494beee8bec8f24374a01121b502f4690d3
import './index.css'
import Main from './Main/Main.js'
import InputWithState from './InputWithState/InputWithState'

const { TabPane } = Tabs

const API_KEY = '928ffe3d29017199a700e964c38bdedb'

const MyContext = React.createContext('')

class App extends React.Component {
  state = {
<<<<<<< HEAD
    data: [],
    inputValue: '',
    guestSessionId: '',
    clicks: 0,
  }

  componentDidMount() {
    const API_URL = `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${API_KEY}`

    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => this.setState({ guestSessionId: data.guest_session_id }))
      .catch(() => console.log('ЧТО-ТО С ЗАПИСЬЮ guest_session_id'))
  }

  fetchRatedMovies = () => {
    const { guestSessionId } = this.state
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&guest_session_id=${guestSessionId}`)
      .then((response) => {
        response.json()
        console.log(response.json())
      })
      .then((data) => {
        const ratedMovies = data.results.filter((movie) => movie.rating !== 0)
        this.setState({ movies: ratedMovies })
      })
      .catch((error) => console.error(error))
=======
    data: [
      
    ],
    inputValue: '',
    guestSessionId: ''
>>>>>>> 90322494beee8bec8f24374a01121b502f4690d3
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
    this.setState({ inputValue: str })
  }

  onChange = () => {
    this.setState((prevState) => ({
      clicks: prevState.clicks + 1,
    }))
  }

  render() {
<<<<<<< HEAD
    const { guestSessionId, clicks } = this.state
=======
    const { guestSessionId } = this.state
    console.log('id',guestSessionId)
>>>>>>> 90322494beee8bec8f24374a01121b502f4690d3
    return (
      <div className="app">
        <Tabs className="center" size="large" onChange={this.onChange}>
          <TabPane key="1" tab="Search">
            <InputWithState inputValue={this.inputValue} />
            <MyContext.Provider value={guestSessionId}>
              <Main findMovie={this.state.inputValue} guestSessionId="" guestID={this.state.guestSessionId} />
            </MyContext.Provider>
          </TabPane>

          <TabPane key="2" tab="Rated">
            <div className="app">
              <RatedMovies guestID={this.state.guestSessionId} apiKey={API_KEY} clicksValue={clicks} />
            </div>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.querySelector('.movies'))
root.render(<App />)
