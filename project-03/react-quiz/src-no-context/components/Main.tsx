import styles from "./main.module.css";

const Main = ({ children }): JSX.Element => {
  return <main className={styles[`main`]}>{children}</main>;
};

export default Main;
