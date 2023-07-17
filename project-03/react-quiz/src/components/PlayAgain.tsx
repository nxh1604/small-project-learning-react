import styles from "./playagain.module.css";

const PlayAgain = ({ dispatch }): JSX.Element => {
  return (
    <button className={styles["play-again"]} onClick={() => dispatch({ type: "Reset" })}>
      Play Again!
    </button>
  );
};

export default PlayAgain;
