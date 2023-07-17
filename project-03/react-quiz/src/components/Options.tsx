import styles from "./options.module.css";

const Options = ({ question, dispatch, answer }): JSX.Element => {
  const answered = answer !== null;
  return (
    <div className={styles[`options`]}>
      <h1>{question.question}</h1>
      {question.options.map((el, index) => {
        return (
          <button
            disabled={answered}
            onClick={() => {
              dispatch({ type: "answered", payload: index });
            }}
            className={
              styles["option-btn"] +
              ` ${
                answered
                  ? answer === index
                    ? answer === question.correctOption
                      ? styles["answered"]
                      : styles["wrong"]
                    : index === question.correctOption
                    ? styles["right"]
                    : styles["not-choice"]
                  : styles["hover"]
              }`
            }
            key={el}>
            {el}
          </button>
        );
      })}
    </div>
  );
};

export default Options;
