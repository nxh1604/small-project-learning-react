import styles from "./Button.module.css";

const Button = ({
  buttonType = "button",
  children,
  type,
  onClick = () => undefined,
}: {
  buttonType?: "button" | "submit" | "reset" | undefined;
  type?: string | undefined;
  onClick?: (e: any) => void;
  children?: React.ReactNode;
}): JSX.Element => {
  return (
    <button type={buttonType} className={`${styles.btn} ${styles[`${type}`]}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
