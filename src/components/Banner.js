import React, { Component } from 'react'
import {movies} from "../MovieData"

export class Banner extends Component {
  
  render() {
    let moviesArr = movies.results[Math.floor((Math.random() * 10) + 1)];
    let backDrop = moviesArr.backdrop_path;
    return (
        <div className="card banner-card">
            <img src={`https://image.tmdb.org/t/p/original${backDrop}`}className="card-img-top" alt="movie poster"/>

            <h5 className="card-title banner-title">{moviesArr.title}</h5>
            <p className="card-text banner-text">Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      </div>
    )
  }
}

export default Banner