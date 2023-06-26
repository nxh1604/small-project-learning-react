import styles from "./packinglist.module.css";

const Item = ({ item, delItem, updateItem }: any) => {
  const isPackedHandler = (e: any) => {
    console.log(item);
    updateItem(item.id, Boolean(e.target.checked));
  };

  return (
    <li className={styles["item"]}>
      <input
        className={styles["item-input"]}
        type='checkbox'
        checked={item.packed}
        onChange={isPackedHandler}
      />
      <p>
        {item.packed ? (
          <del>
            {item.quantity}| {item.description}
          </del>
        ) : (
          `${item.quantity}| ${item.description}`
        )}
      </p>
      <button className={styles["del-btn"]} onClick={() => delItem(item.id)}>
        ❌
      </button>
    </li>
  );
};

export default Item;
