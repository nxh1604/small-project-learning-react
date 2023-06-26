import { useState } from "react";
import styles from "./form.module.css";

const Form = ({ addItem }: any): JSX.Element => {
  const [des, setDes] = useState("");
  const [quantity, setQuantity] = useState(1);
  console.log("rendered");
  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const item = {
      id: new Date(),
      description: des,
      quantity: quantity,
      packed: false,
    };

    addItem(item);
    setDes("");
    setQuantity(1);
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <h2>What do you need for you trip 😎</h2>
      <div className={styles["form-style"]}>
        <select
          className={styles.select}
          value={quantity}
          onChange={(e) => {
            setQuantity(Number(e.target.value));
          }}>
          {new Array(20).fill(0).map((_, index) => {
            return (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            );
          })}
        </select>
        <input
          className={styles.input}
          type='text'
          placeholder='item...'
          value={des}
          onChange={(e) => {
            setDes(e.target.value);
          }}
        />
        <button className={styles["form-btn"]} disabled={des.length === 0}>
          Add
        </button>
      </div>
    </form>
  );
};

export default Form;
