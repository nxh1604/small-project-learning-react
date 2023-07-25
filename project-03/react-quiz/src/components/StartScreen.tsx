import { useQuiz } from "../context/QuizContext";
import styles from "./startscreen.module.css";

const StartScreen = (): JSX.Element => {
  const { dispatch, numQues }: any = useQuiz();
  const handleActive = () => {
    dispatch({ type: "StartQuiz" });
  };
  return (
    <div className={styles[`start-screen`]}>
      <h2>Welcome to The React Quiz</h2>
      <h2>{numQues} questions to test your React mastery</h2>
      <button onClick={handleActive}>Let's start!</button>
    </div>
  );
};

export default StartScreen;
