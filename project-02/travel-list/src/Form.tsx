import styles from "./form.module.css";

const Form = (): JSX.Element => {
  return (
    <div className={styles[`container`]}>
      <h2>What do you need for you trip 😎</h2>
      <form className={styles.form}>
        <input type='text' placeholder='...item' />
        <button className={styles["form-btn"]}>Add</button>
      </form>
    </div>
  );
};

export default Form;
