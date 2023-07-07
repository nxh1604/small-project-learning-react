import "./App.css";
import { useState } from "react";

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

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

function App() {
  const [moviesData, setMoviesData] = useState<IsMovieData[]>(tempMovieData);
  const [watchedData, setWatchedData] = useState<IsWatchedData[]>(tempWatchedData);

  return (
    <div className='App'>
      <Navbar>
        <FoundResults searchData={moviesData as IsMovieData[]} />
      </Navbar>
      <Main>
        <Box>
          <ListFilms films={moviesData as IsMovieData[]} />
        </Box>
        <Box>
          <FavSummary films={watchedData as IsWatchedData[]} />
          <ListFilms films={watchedData as IsWatchedData[]} type='fav' />
        </Box>
      </Main>
    </div>
  );
}

export default App;

const Navbar = ({ children }: { children: JSX.Element }) => {
  return (
    <header className='header-bar'>
      <Logo />
      <SearchMovie />
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

const SearchMovie = () => {
  const [query, setQuery] = useState<string>("");

  const HandlerSearch = (e: any) => {
    setQuery(e.target.value);
  };
  return (
    <input
      className='search'
      type='text'
      value={query}
      placeholder='Search movies...'
      onChange={HandlerSearch}
    />
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

const ListFilms: _RFC<{ films: IsMovieData[] | IsWatchedData[]; type?: string }> = ({
  films,
  type = "notSet",
}) => {
  return (
    <>
      <ul className='list-items'>
        {films.map((el: IsWatchedData | IsMovieData) => {
          return <Film key={el.imdbID} data={el} type={type} />;
        })}
      </ul>
    </>
  );
};

const FavSummary: _RFC<{ films: IsWatchedData[] }> = ({ films }: any) => {
  const avgImdbRate =
    films.map((el: IsWatchedData) => el.imdbRating).reduce((a: number, b: number) => a + b, 0) /
    films.length;
  const avgUserRate =
    films.map((el: IsWatchedData) => el.userRating).reduce((a: number, b: number) => a + b, 0) /
    films.length;
  const avgMoviesLength =
    films.map((el: IsWatchedData) => el.runtime).reduce((a: number, b: number) => a + b, 0) /
    films.length;

  return (
    <div className='fav-list-block'>
      <h1>Movies you have watched:</h1>
      <p className='info-fav-list'>
        <span>{`${films.length} ${films.length > 1 ? "movies" : "movie"}`} </span>
        <span>⭐{avgImdbRate}</span>
        <span>⭐{avgUserRate}</span> <span>⌛{avgMoviesLength} mins</span>
      </p>
    </div>
  );
};

const Film: _RFC<{ data: IsMovieData | IsWatchedData; type: string }> = ({ data, type }) => {
  let text: JSX.Element;

  if (type === "fav") {
    let copyData = { ...data } as IsWatchedData;
    text = (
      <p className='info-fav-list'>
        <span>⭐{copyData.imdbRating}</span>
        <span>⭐{copyData.userRating}</span> <span>⌛{copyData.runtime} mins</span>
      </p>
    );
  } else {
    text = <p>{`📑 ${data.Year}`}</p>;
  }

  return (
    <li className='movie'>
      <img className='poster' src={data.Poster} alt={data.Title} />
      <div className='movie-info'>
        <h1 className='movie-title'>{data.Title}</h1>
        {text}
      </div>
    </li>
  );
};
