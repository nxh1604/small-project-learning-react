import styles from "./header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <img src='logo512.png' alt='React logo' />
      <h1>the react quiz</h1>
    </header>
  );
};

export default Header;
