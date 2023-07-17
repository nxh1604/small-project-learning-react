import styles from "./startscreen.module.css";

const StartScreen = ({ dispatch, numQuetions }): JSX.Element => {
  const handleActive = () => {
    dispatch({ type: "StartQuiz" });
  };
  return (
    <div className={styles[`start-screen`]}>
      <h2>Welcome to The React Quiz</h2>
      <h2>{numQuetions} questions to test your React mastery</h2>
      <button onClick={handleActive}>Let's start!</button>
    </div>
  );
};

export default StartScreen;
