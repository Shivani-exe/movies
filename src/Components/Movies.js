import React, { Component } from 'react'
import { getMovies } from './getMovies'
import axios from 'axios';

export default class Movies extends Component {


    constructor() {
        super();
        this.state = {
            movies: [],
            currSearchText: '',
            limit: 4,
            currPage: 1,
            cGenre: 'All Genres',
            genres: [{ _id: 'abcd', name: 'All Genres' }]


        }
    }

    async componentDidMount() {
        console.log('Component DID Mount');
        let res = await axios.get('https://backend-react-movie.herokuapp.com/movies');
        let genreRes = await axios.get('https://backend-react-movie.herokuapp.com/genres');
        console.log(res);
        this.setState({
            movies: res.data.movies,
            genres: [...this.state.genres, ...genreRes.data.genres]

        })
    }
    handleChange = (e) => {
        let val = e.target.value;
        console.log(val);
        this.setState(
            {
                currSearchText: val
            }
        )
    }

    onDelete = (id) => {
        let arr = this.state.movies.filter((movieObj) => {
            return movieObj._id != id

        })
        this.setState({
            movies: arr
        })
    }

    sortByRatings = (e) => {
        let className = e.target.className;
        console.log(className);
        let sortedMovies = [];
        if (className == "fa fa-sort-asc") {
            sortedMovies = this.state.movies.sort((movieObjA, movieObjB) => {
                return movieObjA.dailyRentalRate - movieObjB.dailyRentalRate;
            }
            )
        }
        else {
            sortedMovies = this.state.movies.sort((movieObjA, movieObjB) => {
                return movieObjB.dailyRentalRate - movieObjA.dailyRentalRate;
            }
            )
        }
        this.setState({
            movies: sortedMovies
        })

    }
    sortByStock = (e) => {
        let className = e.target.className;
        console.log(className);
        let sortedMovies = [];
        if (className == "fa fa-sort-asc") {
            sortedMovies = this.state.movies.sort((movieObjA, movieObjB) => {
                return movieObjA.numberInStock - movieObjB.numberInStock;
            }
            )
        }
        else {
            sortedMovies = this.state.movies.sort((movieObjA, movieObjB) => {
                return movieObjB.numberInStock - movieObjA.numberInStock;
            }
            )
        }
        this.setState({
            movies: sortedMovies
        })

    }
    handlePageChange = (pageNumber) => {
        this.setState({
            currPage: pageNumber,
        })
    }
    handleGenreChange=(genre)=>{
        this.setState({
            cGenre:genre
        })

    }

    render() {
        console.log('render');
        let { movies, currSearchText, limit, currPage ,cGenre,genres} = this.state;
        let filteredArr = [];
        if (currSearchText == "") {
            filteredArr = movies;
        }
        else {
            filteredArr = movies.filter((movieObj) => {
                let title = movieObj.title.toLowerCase();
                return title.includes(currSearchText.toLowerCase());
            })
        }

        if(cGenre!='All Genres')
        {
            filteredArr=filteredArr.filter((movieObj)=>{
                return movieObj.genre.name=cGenre
            })
        }



        let numberOfPage = Math.ceil(filteredArr.length / limit);
        let si = (currPage - 1) * limit;
        let ei = (si + limit);
        filteredArr = filteredArr.slice(si, ei);

        //   if(filteredArr.length==0)
        //   {
        //       this.setState({
        //           currPage:1
        //       })
        //   }
        let pageNumberArr = [];

        for (let i = 0; i < numberOfPage; i++) {
            pageNumberArr.push(i + 1);
        }

        return (
            <>
                {this.state.movies.length == 0 ? <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div> :

                    <div className='container'>
                        <div className='row'>
                            <div className='col-3'>
                                <ul className="list-group">
                                {
                                    genres.map((genreObj)=>(
                                        <li onClick={()=>this.handleGenreChange(genreObj.name)} key={genreObj._id} className='list-group-item'>
                                            {genreObj.name}
                                        </li>
                                    ))
                                }
                                </ul>
                                <h5>Current Genre: {cGenre}</h5>

                            </div>
                            <div className='col-9'>
                                <input type='search' value={this.state.currSearchText} onChange={this.handleChange}></input>

                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Genre</th>
                                            <th scope="col"><i onClick={this.sortByStock} class="fa fa-sort-asc" aria-hidden="true"></i>Stock<i class="fa fa-sort-desc" onClick={this.sortByStock} aria-hidden="true"></i></th>
                                            <th scope="col"><i onClick={this.sortByRatings} class="fa fa-sort-asc" aria-hidden="true"></i>Rate<i onClick={this.sortByRatings} class="fa fa-sort-desc" aria-hidden="true"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filteredArr.map((movieObj) => {
                                                return (
                                                    <tr key={movieObj._id} scope='row'>
                                                        <td></td>
                                                        <td>{movieObj.title}</td>
                                                        <td>{movieObj.genre.name}</td>
                                                        <td>{movieObj.numberInStock}</td>
                                                        <td>{movieObj.dailyRentalRate}</td>
                                                        <td><button type='button' class="btn btn-danger" onClick={() => {
                                                            this.onDelete(movieObj._id)
                                                        }}>Delete</button></td>
                                                    </tr>

                                                )
                                            })
                                        }


                                    </tbody>
                                </table>


                                <nav aria-label="...">
                                    <ul class="pagination">
                                        {
                                            pageNumberArr.map((pageNumber) => {
                                                let classStyle = pageNumber == currPage ? "page-item active" : "page-item";
                                                return (
                                                    <li cursor='pointer' key={pageNumber} onClick={() => this.handlePageChange(pageNumber)} className={classStyle}>
                                                        <span className='page-link'>{pageNumber} </span>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </nav>

                                {/* /<nav aria-label="...">
  <ul class="pagination">
    <li class="page-item disabled">
      <a class="page-link">Previous</a>
    </li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item active" aria-current="page">
      <a class="page-link" href="#">2</a>
    </li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item">
      <a class="page-link" href="#">Next</a>
    </li>
  </ul>
</nav> */}
                            </div>


                        </div>
                    </div>
                } </>
        )
    }
}
