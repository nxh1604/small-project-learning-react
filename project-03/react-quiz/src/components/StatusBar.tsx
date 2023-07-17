import styles from "./statusbar.module.css";

const StatusBar = ({ score, maxScore, numQues, index, answer }): JSX.Element => {
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
