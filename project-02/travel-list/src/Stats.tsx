import styles from "./stats.module.css";

const Stats = (): JSX.Element => {
  return (
    <footer className={styles[`container`]}>
      <em>you have packaged X item</em>
    </footer>
  );
};

export default Stats;
