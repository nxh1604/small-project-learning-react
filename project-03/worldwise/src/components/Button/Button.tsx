import styles from "./Button.module.css";

const Button = ({ children, type, onClick }): JSX.Element => {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
