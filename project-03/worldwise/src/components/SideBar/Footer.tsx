import styles from "./Footer.module.css";

const Footer = (): JSX.Element => {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; CopyRight {new Date().getFullYear()} by WorldWise Inc.
      </p>
    </footer>
  );
};

export default Footer;
