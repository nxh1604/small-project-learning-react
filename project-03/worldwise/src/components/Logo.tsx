import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

const Logo = (): JSX.Element => {
  return (
    <Link to={"/"}>
      <img className={styles.logo} src='/logo.png' alt='logo' />
    </Link>
  );
};

export default Logo;
