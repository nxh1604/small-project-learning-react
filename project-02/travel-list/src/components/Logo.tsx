import styles from "./logo.module.css";

const Logo = (): JSX.Element => {
  return (
    <div className={styles[`heading`]}>
      <h1 className={styles.logo}>FAR AWAY</h1>
    </div>
  );
};

export default Logo;
