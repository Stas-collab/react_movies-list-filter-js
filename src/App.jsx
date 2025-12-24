import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import moviesFromServer from './api/movies.json';

function getPrepearedMovies(movies, { query }) {
  const prepearedMovies = [...movies];

  if (query) {
    const q = query.trim().toLowerCase();

    const visiable = prepearedMovies.filter(
      movie =>
        movie.title.toLowerCase().includes(q) ||
        movie.description.toLowerCase().includes(q),
    );

    return visiable;
  }

  return prepearedMovies;
}

export const App = () => {
  const [query, setQuery] = useState('');
  const visibleMovies = getPrepearedMovies(moviesFromServer, { query });

  return (
    <div className="page">
      <div className="page-content">
        <div className="box">
          <div className="field">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="search-query" className="label">
              Search movie
            </label>

            <div className="control">
              <input
                type="text"
                value={query}
                id="search-query"
                className="input"
                onChange={event => setQuery(event.currentTarget.value)}
                placeholder="Type search word"
              />
            </div>
          </div>
        </div>

        <MoviesList movies={visibleMovies} />
      </div>

      <div className="sidebar">Sidebar goes here</div>
    </div>
  );
};
