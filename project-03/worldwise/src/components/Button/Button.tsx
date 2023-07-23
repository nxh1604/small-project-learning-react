import styles from "./Button.module.css";

const Button = ({
  buttonType = "button",
  children,
  type,
  onClick = (e) => {
    return;
  },
}): JSX.Element => {
  return (
    <button type={buttonType} className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
