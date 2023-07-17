import "./App.css";
import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";

interface IsMovieData {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

interface IsWatchedData extends IsMovieData {
  runtime: number;
  imdbRating: number;
  userRating: number;
}

type _RFC<Type extends object> = (props: Type) => JSX.Element;

const makeFetch = async (query?, movies?, loading?, error?, controller?) => {
  try {
    error("");
    loading(true);
    const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {
      signal: controller.signal,
    });
    if (!res.ok) {
      throw new Error("some thing went wrong with fetching movies");
    }
    const data = await res.json();
    if (data.Response === "False") {
      throw new Error(data.Error);
    }
    movies(data.Search);
  } catch (err: any) {
    movies([]);
    if (err.name !== "AbortError") error(err.message);
  } finally {
    loading(false);
  }
};

const KEY = "dc0ee99a";

function App() {
  const [moviesData, setMoviesData] = useState<IsMovieData[]>([]);
  const [watchedData, setWatchedData] = useState<IsWatchedData[]>((): any => {
    const storedData: any = localStorage.getItem("watched");

    return JSON.parse(storedData);
  });
  const [loading, setLoading] = useState(false);
  const [selectedID, setSelectedID] = useState(null);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    if (query.length < 3) {
      setMoviesData([]);
      setError("");
      return;
    }
    setSelectedID(null);
    const delaySearch = setTimeout(() => {
      makeFetch(query, setMoviesData, setLoading, setError, controller);
    }, 1000);

    return () => {
      clearTimeout(delaySearch);
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watchedData));
  }, [watchedData]);

  return (
    <div className='App'>
      <Navbar>
        <>
          <SearchMovie query={query} setQuery={setQuery} />
          <FoundResults searchData={moviesData as IsMovieData[]} />
        </>
      </Navbar>
      <Main>
        <Box>
          <>
            {loading && <Loading />}
            {!loading && !error && (
              <ListFilms>
                {moviesData.map((el: IsMovieData) => {
                  return <SearchFilm onSelectedFilm={setSelectedID} key={el.imdbID} data={el} />;
                })}
              </ListFilms>
            )}
            {error && <ErrorPage error={error} />}
          </>
        </Box>
        <Box>
          {!!selectedID ? (
            <MovieDetailsBox
              watchedMovie={watchedData}
              handleAddFav={setWatchedData}
              selectedID={selectedID}
              handleSelectedID={setSelectedID}
            />
          ) : (
            <>
              <FavSummary films={watchedData as IsWatchedData[]} />
              <ListFilms>
                {watchedData.map((el: IsWatchedData) => {
                  return <FavFilm key={el.imdbID} data={el} onRemove={setWatchedData} />;
                })}
              </ListFilms>
            </>
          )}
        </Box>
      </Main>
    </div>
  );
}

const makeFetchMovie = async (query?, movies?, loading?, error?) => {
  try {
    error("");
    loading(true);
    const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${query}`);
    if (!res.ok) {
      throw new Error("some thing went wrong with fetching movies");
    }
    const data = await res.json();
    if (data.Response === "False") {
      throw new Error(data.Error);
    }
    movies(data);
  } catch (err: any) {
    error(err.message);
    movies(null);
  } finally {
    loading(false);
  }
};

const MovieDetailsBox = ({ watchedMovie, handleAddFav, selectedID, handleSelectedID }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [movie, setMovie] = useState<any>(null);
  const condition = watchedMovie.filter((el) => el.imdbID === selectedID);
  const defaultRating = !!condition[0] ? condition[0].userRating : 0;
  useEffect(() => {
    makeFetchMovie(selectedID, setMovie, setLoading, setError);
  }, [selectedID]);

  useEffect(() => {
    const callback = (e) => {
      if (e.code === "Escape") {
        handleSelectedID(null);
      }
    };
    document.addEventListener("keydown", callback);
    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [handleSelectedID]);
  return (
    <div>
      {loading && <Loading />}
      {!loading && !error && (
        <MovieDetail
          condition={condition}
          defaultRating={defaultRating}
          handleAddFav={handleAddFav}
          movie={movie}
          handlerSelectedID={handleSelectedID}
        />
      )}
      {error && <ErrorPage error={error} />}
    </div>
  );
};

const MovieDetail = ({ defaultRating, condition, handleAddFav, movie, handlerSelectedID }) => {
  const [rating, setRating] = useState(0);
  useEffect(() => {
    if (!!movie) {
      document.title = `Movie | ${movie.Title}`;
    }
    return () => {
      document.title = "usePopcorn";
    };
  }, [movie]);
  if (!movie) return <></>;
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: realeased,
    Actors: actors,
    Director: director,
    Genre: genre,
    Language: language,
  } = movie;

  return (
    <div>
      <header>
        <button onClick={() => handlerSelectedID(null)}>&larr;</button>
        <img src={poster} alt={`Poster of ${movie}`} />
        <div>
          <h2>{title}</h2>
          <p>
            {realeased} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐</span>
            {imdbRating} IMDb rating
          </p>
          <p>{language}</p>
          <p>{year}</p>
        </div>
      </header>
      <section>
        <div>
          {!condition[0] ? (
            <>
              <StarRating
                defaultRating={defaultRating}
                numberStar={10}
                size={36}
                onGetRating={setRating}
              />
              <button
                onClick={() => {
                  handlerSelectedID(null);
                  handleAddFav((prev) => {
                    const newMovie = {
                      imdbID: movie.imdbID,
                      title: title,
                      year: year,
                      poster: poster,
                      runtime: Number(runtime.split(" ")[0]),
                      imdbRating: Number(imdbRating),
                      userRating: Number(rating),
                    };
                    return [...prev, newMovie];
                  });
                }}>
                Add movie
              </button>{" "}
            </>
          ) : (
            <p>you rated this movie with {defaultRating} ⭐</p>
          )}
        </div>
        <p>{plot}</p>
        <p>{actors}</p>
        <p>{director}</p>
      </section>
    </div>
  );
};

const ErrorPage = ({ error }) => {
  return <p>{error}</p>;
};

const Loading = () => {
  return <p>Loading ...</p>;
};

export default App;

const Navbar = ({ children }: { children: JSX.Element }) => {
  return (
    <header className='header-bar'>
      <Logo />

      {children}
    </header>
  );
};

const Logo = () => {
  return (
    <div className='logo'>
      <span className='logo-img'>🍿</span>
      <h1 className='logo-title'>usePopcorn</h1>
    </div>
  );
};

const SearchMovie = ({ query, setQuery }) => {
  const inputEL = useRef(null);

  const HandlerSearch = (e: any) => {
    setQuery(e.target.value);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    setQuery(e.target["0"].value);
  };

  useEffect(() => {
    const callback = (e) => {
      if (document.activeElement === inputEL.current) {
        return;
      }
      if (e.code === "Enter") {
        inputEL.current.focus();
        setQuery("");
      }
    };
    document.addEventListener("keydown", callback);
    inputEL.current.focus();

    return () => document.removeEventListener("keydown", callback);
  }, [setQuery]);
  return (
    <form onSubmit={handlerSubmit}>
      <input
        ref={inputEL}
        className='search'
        type='text'
        value={query}
        placeholder='Search movies...'
        onChange={HandlerSearch}
      />
      <button style={{ display: "none" }} type='submit' />
    </form>
  );
};

const FoundResults: _RFC<{ searchData: IsMovieData[] }> = ({ searchData }) => {
  return (
    <p className='result'>
      Found <strong>{searchData.length}</strong> {`${searchData.length > 1 ? "results" : "result"}`}
    </p>
  );
};

const Main = ({ children }: { children: JSX.Element[] }) => {
  return <div className='main-content'>{children}</div>;
};

const Box: _RFC<{ children: JSX.Element[] | JSX.Element }> = ({ children }) => {
  const [open, setIsOpen] = useState<boolean>(true);

  const HandlerOpenList = () => {
    setIsOpen(!open);
  };
  return (
    <div className='search-list'>
      <button className='close-btn' onClick={HandlerOpenList}>
        {open ? "-" : "+"}
      </button>
      {open && children}
    </div>
  );
};

// const FavoriteList: _RFC<{ children: JSX.Element }> = ({ children }) => {
//   const [open, setIsOpen] = useState<boolean>(true);

//   const HandlerOpenList = () => {
//     setIsOpen(!open);
//   };
//   return (
//     <div className='fav-list'>
//       <button className='close-btn' onClick={HandlerOpenList}>
//         {open ? "-" : "+"}
//       </button>
//       {open && children}
//     </div>
//   );
// };

const ListFilms = ({ children }) => {
  return (
    <>
      <ul className='list-items'>{children}</ul>
    </>
  );
};

const FavSummary: _RFC<{ films: IsWatchedData[] }> = ({ films }: any) => {
  const avgImdbRate =
    films.length !== 0
      ? films.map((el: IsWatchedData) => el.imdbRating).reduce((a: number, b: number) => a + b, 0) /
        films.length
      : 0;
  const avgUserRate =
    films.length !== 0
      ? films.map((el: IsWatchedData) => el.userRating).reduce((a: number, b: number) => a + b, 0) /
        films.length
      : 0;
  const avgMoviesLength =
    films.length !== 0
      ? films.map((el: IsWatchedData) => el.runtime).reduce((a: number, b: number) => a + b, 0) /
        films.length
      : 0;

  return (
    <div className='fav-list-block'>
      <h1>Movies you have watched:</h1>
      <p className='info-fav-list'>
        <span>{`${films.length} ${films.length > 1 ? "movies" : "movie"}`} </span>
        <span>⭐{avgImdbRate.toFixed(1)}</span>
        <span>⭐{avgUserRate.toFixed(1)}</span> <span>⌛{Math.round(avgMoviesLength)} mins</span>
      </p>
    </div>
  );
};

const FavFilm = ({ data, onRemove }) => {
  return (
    <div className='fav-film'>
      <li className='movie'>
        <span className='poster-container'>
          <img className='poster' src={data.poster} alt={data.title} />
        </span>
        <div className='movie-info'>
          <h1 className='movie-title'>{data.title}</h1>
          <p className='info-fav-list'>
            <span>⭐{data.imdbRating}</span>
            <span>⭐{data.userRating}</span> <span>⌛{data.runtime} mins</span>
          </p>
        </div>
      </li>
      <button onClick={() => onRemove((prev) => prev.filter((el) => el.imdbID !== data.imdbID))}>
        ❌
      </button>
    </div>
  );
};

const SearchFilm: _RFC<{ data: IsMovieData; onSelectedFilm: any }> = ({ onSelectedFilm, data }) => {
  return (
    <div>
      <li
        onClick={() => onSelectedFilm((prev) => (prev === data.imdbID ? null : data.imdbID))}
        className='movie'>
        <span className='poster-container'>
          <img className='poster' src={data.Poster} alt={data.Title} />
        </span>
        <div className='movie-info'>
          <h1 className='movie-title'>{data.Title}</h1>
          <p>{`📑 ${data.Year}`}</p>
        </div>
      </li>
    </div>
  );
};
