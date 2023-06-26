import { useState } from "react";
import styles from "./packinglist.module.css";
import Item from "./Item";

const PackingList = ({ items, delItem, updateItem, clearItem }: any) => {
  const [sortByItems, setSortByItems] = useState("input");
  const sortedItems =
    sortByItems === "input"
      ? items
      : sortByItems === "quantity"
      ? items.toSorted((a: any, b: any) => Number(a.quantity) - Number(b.quantity), 0)
      : sortByItems === "description"
      ? items.toSorted((a: any, b: any) => a.description.localeCompare(b.description))
      : items.toSorted((a: any, b: any) => Number(b.packed) - Number(a.packed));
  return (
    <div className={styles[`container`]}>
      <ul className={styles["list-items"]}>
        {sortedItems.map((el: any) => {
          return <Item key={el.id} item={el} delItem={delItem} updateItem={updateItem} />;
        })}
      </ul>
      <div className={styles.action}>
        <select value={sortByItems} onChange={(e) => setSortByItems(e.target.value)}>
          <option value='input'>Sort by input order</option>
          <option value='quantity'>Sort by quantity order</option>
          <option value='description'>Sort by description order</option>
          <option value='packed'>Sort by packed order</option>
        </select>
        <button
          className={styles["clear-list"]}
          onClick={() => {
            if (items.length === 0) {
              window.alert("Please add item first!");
              return;
            }
            const confirm = window.confirm("Are you sure you want to delete all the items?");
            confirm && clearItem([]);
          }}>
          Clear List
        </button>
      </div>
    </div>
  );
};

export default PackingList;
