import styles from "./quizscreen.module.css";

const QuizScreen = ({ children }): JSX.Element => {
  return <div className={styles[`quiz-screen`]}>{children}</div>;
};

export default QuizScreen;
