import React, { Component } from "react";
import _ from "lodash";
import Pagination from "./common/pagination";
import GenreList from "./common/genrelist";
import MoviesTable from "./common/MoviesTable";
import { paginate } from "./utils/paginate";
import * as moviesAPI from "./services/fakeMovieService";
import { getGenres } from "./services/fakeGenreService";

class App extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    sortColumn: {
      path: "title",
      order: "asc"
    }
  };

  componentDidMount() {
    const genres = [{ name: "All", _id: "12312312313" }, ...getGenres()];
    this.setState({
      movies: moviesAPI.getMovies(),
      genres: genres,
      selectedGenre: genres[0]
    });
  }

  styles = {
    topPad: {
      paddingTop: "25px"
    }
  };

  handleDelete = id => {
    this.setState({
      movies: this.state.movies.filter(movie => {
        return movie._id !== id;
      })
    });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  getPageData = () => {
    const {
      movies: allMovies,
      currentPage,
      pageSize,
      selectedGenre,
      sortColumn
    } = this.state;

    const filtered =
      selectedGenre && !(selectedGenre.name === "All")
        ? allMovies.filter(m => m.genre.name === selectedGenre.name)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const {
      sortColumn,
      selectedGenre,
      genres,
      pageSize,
      currentPage
    } = this.state;

    const { totalCount, data: movies } = this.getPageData();

    return (
      <main className="container">
        <div className="row">
          <div className="col-3" style={this.styles.topPad}>
            <GenreList
              items={genres}
              onItemSelect={this.handleGenreSelect}
              selectedItem={selectedGenre}
            />
          </div>
          <div className="col">
            {(() => {
              if (totalCount === 0)
                return (
                  <p style={this.styles.topPad}>
                    There are no movies in the selected database.
                  </p>
                );
              else
                return (
                  <div>
                    <p style={this.styles.topPad}>
                      Showing {totalCount} movies in the database.
                    </p>
                    <React.Fragment>
                      <MoviesTable
                        movies={movies}
                        onLike={this.handleLike}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}
                        sortColumn={sortColumn}
                      />
                      <Pagination
                        pageCount={totalCount}
                        pageSize={pageSize}
                        onPageChange={this.handlePageChange}
                        currentPage={currentPage}
                      />
                    </React.Fragment>
                  </div>
                );
            })()}
          </div>
        </div>
      </main>
    );
  }
}

export default App;
