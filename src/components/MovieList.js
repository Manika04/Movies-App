import React, { Component } from 'react'
// import {movies} from '../MovieData'
import axios from 'axios'
import { movies } from '../MovieData';

//api - https://api.themoviedb.org/3/movie/popular?api_key=b2a22312b2f5bd402c6b9d48fee71a6d&language=en-US&page=1

export class MovieList extends Component {

  constructor(){
    console.log('constructor');
    super();
    
    this.state = {
      hover: '',
      paginationArr: [1],
      movies: [],
      currPage: 1,
      fav: [], 
    }
  }

   
  async componentDidMount(){
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=b2a22312b2f5bd402c6b9d48fee71a6d&language=en-US&page=${this.state.currPage}`);
    // console.log(response);
    let movieData = response.data;
    console.log(movieData);
    this.setState({
      movies: [...movieData.results]
    })
  }

  //same code isliye copy kiya kyuki componentdidmount bas ek h baar chalta hai isko hum kabhi bhi call kar sakte hai
  changeMovies = async() => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=b2a22312b2f5bd402c6b9d48fee71a6d&language=en-US&page=${this.state.currPage}`);
    let movieData = response.data;

    this.setState({
      movies: [...movieData.results]
    })
  }

  handleNext = () => {
    let tempArr = [];
  
    for(let i = 1; i <= this.state.paginationArr.length + 1; i++){
      tempArr.push(i);
      // console.log(tempArr);
    }

    this.setState({
      paginationArr: [...tempArr],
      currPage: this.state.currPage + 1
    }, this.changeMovies)
  }

  handlePrev = () => {
    if(this.state.currPage != 1){
      this.setState({
        currPage: this.state.currPage - 1,
      }, this.changeMovies)
    }
  }

  handlePageClick = (value) => {
    if(value != this.state.currPage){
      this.setState({
        currPage: value,
      }, this.changeMovies);
    }
  }

  handleFav = (movieObj) => {
      let oldData = JSON.parse(localStorage.getItem('movies-app') || '[]');
      
      if(this.state.fav.includes(movieObj.id)){
          oldData = oldData.filter((m) => m.id != movieObj.id);
      }
      else{
        oldData.push(movieObj);
      }
      localStorage.setItem("movies-app", JSON.stringify(oldData));
      console.log(oldData);
      this.handleFavState();
  }

  handleFavState = () => {
    let oldData = JSON.parse(localStorage.getItem('movies-app') || '[]');

    let tempArr = oldData.map((movie) => movie.id);

    this.setState({
      fav : [...tempArr],
    })
  }

  render() {
    console.log('render');
    // let moviesArr = movies.results;   moviesArr.map()
    // console.log(moviesArr);
    //this.state.hover == movieEle.id &&  if this.state.hover == movieEle.id stannds true then do(&&) or show the button

    return (
      <> 
        <div>
          <h3 className='text-center'><strong>Trending</strong></h3>
        </div>
        <div className='movies-list'>
          {
            this.state.movies.map((movieEle) => (
              <div className="card movie-card" onMouseEnter={() => this.setState({hover: movieEle.id})} onMouseLeave={() => this.setState({hover : ''})}>
                <img src={`https://image.tmdb.org/t/p/original${movieEle.backdrop_path}`}
                className="card-img-top movie-img" style={{height:'40vh' , width:'20vw'}} alt="movie poster" />

                <h5 className="card-title movie-title">{movieEle.title}</h5>
                <div className='btn-wrapper' style={{display: 'flex', justifyContent: 'center'}}>
                  {
                    this.state.hover == movieEle.id && 
                    <a className='btn btn-primary movies-btn text-center' onClick={() => this.handleFav(movieEle)}>{this.state.fav.includes(movieEle.id) ? "Remove from favourites" : "Add to Favourites"}</a>
                  }
                  
                </div>
                
              </div>
            ))
          }
        </div>

          <div style={{display:'flex', justifyContent: 'center'}}>
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                <li class="page-item"><a class="page-link" onClick={this.handlePrev}>Previous</a></li>
                {
                  this.state.paginationArr.map((value) => (
                    <li class="page-item"><a class="page-link" onClick={() => this.handlePageClick(value)}>{value}</a></li>
                  ))
                }
                <li class="page-item"><a class="page-link" onClick={this.handleNext}>Next</a></li>
              </ul>
            </nav>
          </div>
      </>
    )
  }
}

export default MovieList