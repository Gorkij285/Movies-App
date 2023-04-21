<<<<<<< HEAD
import React, { Component } from 'react'
import { Rate } from 'antd'
=======
import React,{Component} from 'react';
import { Rate } from 'antd';
import './Block.css';
>>>>>>> 90322494beee8bec8f24374a01121b502f4690d3

import MovieGenres from '../utils/MovieGenres.js'
import './Block.css'

class Block extends Component {
  state = {
    rating: 0,
    genres: [],
  }

<<<<<<< HEAD
  componentDidMount() {
    MovieGenres(this.props.id).then((genres) => {
      this.setState({ genres })
    })
  }
=======
  state = {
    rating: 0
  }

  starChange = (value) => {
    console.log(value)
  }


  render () {
    const {title,date,info,poster,rating} = this.props
>>>>>>> 90322494beee8bec8f24374a01121b502f4690d3

  starChange = (newRating) => {
    console.log(newRating)
    const { id, SessionId } = this.props
    const API_KEY = '928ffe3d29017199a700e964c38bdedb'

    fetch(`https://api.themoviedb.org/3/movie/${id}/rating?api_key=${API_KEY}&guest_session_id=${SessionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ value: newRating }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Failed to update rating')
      })
      .then((data) => {
        this.setState({ rating: data.value })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  render() {
    const { title, date, info, poster, rating, ratings } = this.props

    const { genres } = this.state

    let poster_url = ''

    if (poster) {
      poster_url = `https://image.tmdb.org/t/p/original${poster}`
    }

<<<<<<< HEAD
    let borderColor = '#E90000'
    if (rating >= 3 && rating < 5) {
      borderColor = '#E97E00'
    } else if (rating >= 5 && rating < 7) {
      borderColor = '#E9D100'
    } else if (rating >= 7) {
      borderColor = '#66E900'
    }
=======
    return (
      <div className='wrapper-block'>
         <div className='block-img'>
           <img src={poster_url}></img>
         </div>
         <div className='block-info'>
            <div className='rat'><span>{Math. round (rating * 10)/ 10}</span></div>
           <h3>{title}</h3>
           <p>{date}</p>
           <button>Action</button>
           <button>Drama</button>
           <p className='info'>{shortenText(info)}</p>

            <div className='rate'>
              <Rate 
              allowHalf 
              // defaultValue={rating}
              count={10}
              onChange={this.starChange}
               />
            </div>
            
         </div>
      </div>
     )
  }
};
>>>>>>> 90322494beee8bec8f24374a01121b502f4690d3

    function shortenText(text) {
      const words = text.split(' ')
      if (words.length <= 50) {
        return text
      }
      const shortWords = words.slice(0, 50)
      const shortenedText = shortWords.join(' ')
      return shortenedText + '...'
    }

    let Poster = poster_url ? poster_url : 'https://www.vokrug.tv/pic/product/f/9/9/c/f99cc0c6948c95170009df1a785203bc.jpg'

    return (
      <div className="wrapper-block">
        <div className="block-img">
          <img src={Poster}></img>
        </div>
        <div className="block-info">
          <div
            className="rat"
            style={{
              border: '2px solid',
              borderColor: borderColor,
              padding: '2px',
            }}
          >
            <span>{Math.round(rating * 10) / 10}</span>
          </div>
          <h3>{title}</h3>
          <p>{date}</p>
          <div>
            {genres.map((item) => (
              <button key={item.id}>{item.name}</button>
            ))}
          </div>
          <p className="info">{shortenText(info)}</p>

          <div className="rate">
            <Rate allowHalf defaultValue={ratings} count={10} onChange={this.starChange} />
          </div>
        </div>
      </div>
    )
  }
}

export default Block
