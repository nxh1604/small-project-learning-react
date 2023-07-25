import { useQuiz } from "../context/QuizContext";
import styles from "./playagain.module.css";

const PlayAgain = (): JSX.Element => {
  const { dispatch }: any = useQuiz();
  return (
    <button className={styles["play-again"]} onClick={() => dispatch({ type: "Reset" })}>
      Play Again!
    </button>
  );
};

export default PlayAgain;
