import styles from "./errorloader.module.css";

const ErrorLoader = (): JSX.Element => {
  return (
    <div className={styles[`error`]}>
      <p>💥Opps! Something went wrong!</p>
    </div>
  );
};

export default ErrorLoader;
