import "./App.css";

function App() {
  return (
    <div className='App'>
      <Navbar />
      <div className='main-content'>
        <SearchList />
        <FavoriteList />
      </div>
    </div>
  );
}

export default App;

const Navbar = () => {
  return (
    <header className='header-bar'>
      <h1>usePopcorn</h1>
      <input type='text' />
      <p>Found X results</p>
    </header>
  );
};

const SearchList = () => {
  return (
    <div className='search-list'>
      <ListFilms />
    </div>
  );
};

const ListFilms = () => {
  return (
    <>
      <button className='close-btn'>-</button>
      <ul className='list-items'>
        <li>Lists of film</li>
      </ul>
    </>
  );
};

const FavoriteList = () => {
  return (
    <div className='fav-list'>
      <ListFilms />
    </div>
  );
};
