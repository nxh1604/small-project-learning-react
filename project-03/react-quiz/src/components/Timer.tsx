import { useState, useEffect } from "react";

import styles from "./timer.module.css";
import { useQuiz } from "../context/QuizContext";

const SECS_PER_QUES = 30;

const Timer = (): JSX.Element => {
  const { numQues, dispatch }: any = useQuiz();
  const defaulTime = numQues * SECS_PER_QUES;
  const [time, setTime] = useState(defaulTime);
  const min = Math.floor(time / 60);
  const sec = time % 60;
  useEffect(() => {
    const id = setInterval(() => {
      setTime((prevT) => {
        return prevT - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);
  useEffect(() => {
    if (time === 0) {
      dispatch({ type: "finishedQuiz" });
    }
  }, [dispatch, time]);

  return (
    <div className={styles[`timer`]}>
      <h1>
        {min < 10 ? "0" : ""}
        {min} : {sec < 10 ? "0" : ""}
        {sec}
      </h1>
    </div>
  );
};

export default Timer;
