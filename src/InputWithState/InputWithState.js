import React, { Component } from 'react'
import './InputWithState.css'
import { Input } from 'antd'
import { debounce } from 'lodash'

class InputWithState extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
    }
    this.debouncedSubmit = debounce(this.handleSubmit, 600)
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value })
    this.debouncedSubmit()
  }

  handleSubmit = () => {
    // здесь можно передать this.state.inputValue в другой компонент для отображения
    this.props.inputValue(this.state.inputValue)
  }

  render() {
    return (
      <div className="search-bar">
        <Input
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              e.preventDefault()
              this.setState({ inputValue: '' })
            }
          }}
        />
      </div>
    )
  }
}

export default InputWithState
