import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Main from './Main/Main.js'
import InputWithState from './InputWithState/InputWithState'



class App extends React.Component {
  state = {
    data: [
      
    ],
    inputValue: ''
  }

  inputValue = (str) => {
    this.setState({ inputValue: str})
  }

  render() {
    console.log(this.state.inputValue)
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
