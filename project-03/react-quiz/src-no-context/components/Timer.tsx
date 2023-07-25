import { useState, useEffect } from "react";

import styles from "./timer.module.css";

const Timer = ({ defaulTime, dispatch }): JSX.Element => {
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
