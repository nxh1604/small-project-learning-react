import { useQuiz } from "../context/QuizContext";
import styles from "./finishedscreen.module.css";

const FinishedScreen = (): JSX.Element => {
  const { score, maxScore, highScore }: any = useQuiz();

  const percent = Math.floor((score / maxScore) * 100);
  const emoji =
    percent === 100
      ? "Congratulations 🏅🏅!"
      : percent >= 80
      ? "Well done 😘😘!"
      : percent >= 50
      ? "Guess you near average 🙂!"
      : percent > 10
      ? "Try harder Son 😤😤!"
      : "Your score is the worst! 💥💥";
  return (
    <>
      <div className={styles[`finished`]}>
        <p>
          You scored {score} out of {maxScore}! ({percent}% completed)
        </p>
        <br></br>
        <p>{emoji}</p>
      </div>
      <p>Your high score: {highScore}</p>
    </>
  );
};

export default FinishedScreen;
