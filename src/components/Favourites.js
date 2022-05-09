import React, { Component } from "react";
import {movies} from "../MovieData"

export class Favourites extends Component {
    constructor(){
        super();
        this.state = {
            genres: [],
            currgenre: 'All Genres',
            movies: [],
            currText: "",
        }
    }

    componentDidMount(){
      let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
       27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};

      let tempArr = [];
      let data = JSON.parse(localStorage.getItem('movies-app') || '[]');

      data.map((movieObj) => {
        if(!tempArr.includes(genreids[movieObj.genre_ids[0]])){
            tempArr.push(genreids[movieObj.genre_ids[0]])
        }
      });

      tempArr.unshift('All Genres');
      this.setState({
        movies: [...data],
        genres: [...tempArr],
      })
    }

    handleGenreChange = (genre) => {
      this.setState({
        currgenre: genre
      })
    }

    sortPopularityDesc = () => {
      let temp = this.state.movies;
      temp.sort(function(objA, objB){
        return objB.popularity - objA.popularity
      });

      this.setState({
        movies: [...temp]
      })
    }
    sortPopularityAsc = () => {
      let temp = this.state.movies;
      temp.sort(function(objA, objB){
        return objA.popularity - objB.popularity
      });

      this.setState({
        movies: [...temp]
      })
    }
    sortRatingDesc = () => {
      let temp = this.state.movies;
      temp.sort(function(objA, objB){
        return objB.vote_average - objA.vote_average
      });

      this.setState({
        movies: [...temp]
      })
    }
    sortRatingAsc = () => {
      let temp = this.state.movies;
      temp.sort(function(objA, objB){
        return objA.vote_average - objB.vote_average
      });

      this.setState({
        movies: [...temp]
      })
    }

  render() {
      // const moviesArr = movies.results;
        //console.log(moviesArr);
      let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
      27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};

        //if we need more that 2 genres
        //<td>{genreids[movieEle.genre_ids[0]]}{genreids[movieEle.genre_ids[1]]}{genreids[movieEle.genre_ids[2]]}</td>

      let filterArr = [];
      if(this.state.currText === ''){
        filterArr = this.state.movies;
      }
      else{
        filterArr = this.state.movies.filter((movieObj) => {
          let title = movieObj.original_title.toLowerCase();
          return title.includes(this.state.currText.toLowerCase().trim());
        })
      }

      if(this.state.currgenre !== 'All Genres'){
        filterArr = this.state.movies.filter((movieObj) => genreids[movieObj.genre_ids[0]] == this.state.currgenre)
      }

      // console.log(this.state.currText)

    return (
      <div className="main">
        <div className="row">
          <div className="col-3">
            <ul class="list-group genre-selector">
                {
                    this.state.genres.map((genres) => (
                        this.state.currgenre == genres ? 
                        <li style={{background: '#3f51b5', color: 'white', fontWeight: 'bold'}} class="list-group-item ">{genres}</li> :
                        <li class="list-group-item " style={{ color: '#3f51b5'}} onClick={() => this.handleGenreChange(genres)}>{genres}</li>
                    ))
                }
              
            </ul>
          </div>
          <div className="col-9 favourites-table">
            <div className="row">
              <input type="text" className="input-group-text col" placeholder="Search" value={this.state.currText} onChange={(e) => this.setState({currText : e.target.value})}/>
              <input type="number" className="input-group-text col" placeholder="Movies per Page"/>
            </div>
            <div className="row">
              <table class="table">
                <thead>
                  <tr>
                    <th colSpan={"2"}>Title</th>
                    <th scope="col">Genre</th>
                    <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.sortPopularityDesc}></i>Popularity<i class="fa-solid fa-sort-down" onClick={this.sortPopularityAsc}></i></th>
                    <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.sortRatingDesc}></i>Rating<i class="fa-solid fa-sort-down" onClick={this.sortRatingAsc}></i></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                    {
                        filterArr.map((movieEle) => (
                            <tr>
                                <td><img src={`https://image.tmdb.org/t/p/original${movieEle.backdrop_path}`} style={{height:'12vh' , width:'8vw'}} alt="movie poster"/></td>
                                <th scope="row">{movieEle.title}</th>
                                <td>{genreids[movieEle.genre_ids[0]]}</td>
                                <td>{movieEle.popularity}</td>
                                <td>{movieEle.vote_average}</td>
                                <td><button type="button" class="btn btn-danger">Delete</button></td>
                            </tr>
                        ))
                    }
                  
                </tbody>
              </table>
            </div>
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                </ul>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default Favourites;
