import Form from "./Form";
import Logo from "./Logo";
import PackingList from "./PackingList";
import Stats from "./Stats";
import "./App.css";

const App = (): JSX.Element => {
  return (
    <div className='container'>
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
};

export default App;
