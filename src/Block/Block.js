import React,{Component} from 'react';
import { Rate } from 'antd';
import './Block.css';

async function getData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

class Block extends Component {

  state = {
    rating: 0
  }

  starChange = (value) => {
    console.log(value)
  }


  render () {
    const {title,date,info,poster,rating} = this.props

    let poster_url =''

    if(poster){
      poster_url = `https://image.tmdb.org/t/p/original${poster}`
    } 

    function shortenText(text) {
      const words = text.split(" ");
      if (words.length <= 50) {
        return text;
      }
      const shortWords = words.slice(0, 50);
      const shortenedText = shortWords.join(" ");
      return shortenedText + "...";
    }

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

export default Block;