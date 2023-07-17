import styles from "./footer.module.css";

const Footer = ({ children }): JSX.Element => {
  return <footer className={styles[`footer`]}>{children}</footer>;
};

export default Footer;
