import Form from "./Form";
import Logo from "./Logo";
import PackingList from "./PackingList";
import Stats from "./Stats";
import "./App.css";
import { useState } from "react";

interface Iitem {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
}

const App = (): JSX.Element => {
  const [items, setItems] = useState<Iitem[]>([
    { id: 1, description: "socks", quantity: 2, packed: false },
  ]);

  const handlerAddItem = (item: Iitem) => {
    setItems((items) => [...items, item]);
  };

  const handlerDelItem = (id: number) => {
    setItems((items) => items.filter((el) => el.id !== id));
  };
  const handlerUpdateItem = (id: number, update: Iitem | any) => {
    setItems((items) =>
      items.map((el) => {
        return el.id === id ? { ...el, packed: update } : el;
      })
    );
  };

  return (
    <div className='container'>
      <Logo />
      <Form addItem={handlerAddItem} />
      <PackingList
        items={items}
        delItem={handlerDelItem}
        updateItem={handlerUpdateItem}
        clearItem={setItems}
      />
      <Stats items={items} />
    </div>
  );
};

export default App;
