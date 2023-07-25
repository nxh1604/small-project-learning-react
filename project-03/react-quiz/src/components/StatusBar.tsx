import { useQuiz } from "../context/QuizContext";
import styles from "./statusbar.module.css";

const StatusBar = (): JSX.Element => {
  const { score, index, maxScore, answer, numQues }: any = useQuiz();

  return (
    <div className={styles[`status-bar`]}>
      <progress max={numQues} value={index + Number(answer !== null)} />
      <p>
        <strong>{score}</strong> / {maxScore}
      </p>
      <p className={styles["question"]}>
        <strong>{index + 1}</strong> / {numQues}
      </p>
    </div>
  );
};

export default StatusBar;
