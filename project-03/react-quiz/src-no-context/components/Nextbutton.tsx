import styles from "./nextbutton.module.css";

const Nextbutton = ({ dispatch, answer, numQues, index }): JSX.Element => {
  return (
    <>
      {index < numQues - 1 ? (
        answer !== null && (
          <button onClick={() => dispatch({ type: "NextQuiz" })} className={styles["next-btn"]}>
            Next
          </button>
        )
      ) : (
        <button onClick={() => dispatch({ type: "finishedQuiz" })} className={styles["next-btn"]}>
          Finished
        </button>
      )}
    </>
  );
};

export default Nextbutton;
