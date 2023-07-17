import styles from "./loading.module.css";

const Loading = (): JSX.Element => {
  return (
    <div className={styles[`loader`]}>
      <div className={styles["classic-10"]}></div>
    </div>
  );
};

export default Loading;
