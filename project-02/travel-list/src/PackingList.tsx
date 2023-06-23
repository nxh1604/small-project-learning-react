import { useState } from "react";
import styles from "./packinglist.module.css";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];
interface Iitem {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
}

const PackingList = () => {
  return (
    <div className={styles[`container`]}>
      <ul>
        {initialItems.map((el) => {
          return <Item key={el.id} item={el} />;
        })}
      </ul>
    </div>
  );
};

export default PackingList;

const Item: _SFC<{ item: Iitem }> = ({ item }) => {
  const [isPacked, setIsPacked] = useState(false);

  const isPackedHandler = () => {
    setIsPacked(!isPacked);
  };

  return <li>{<input type='checkbox' value={item.description} onClick={isPackedHandler} />}</li>;
};
