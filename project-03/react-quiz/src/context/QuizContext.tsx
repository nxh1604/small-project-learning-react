import { createContext, useContext, useReducer } from "react";

const initialState = {
  questions: [],

  // loading, ready, error, active, finished;
  status: "loading",
  index: 0,
  score: 0,
  answer: null,
  again: false,
  highScore: 0,
};

const reducer = (state, action) => {
  // console.log(state, action);
  switch (action.type.toLowerCase()) {
    case "dataResovle".toLowerCase(): {
      return { ...state, status: "ready", questions: action.payload };
    }
    case "dataReject".toLowerCase(): {
      return { ...state, status: "error" };
    }
    case "startQuiz".toLowerCase(): {
      return { ...state, status: "active" };
    }
    case "Answered".toLowerCase(): {
      const point =
        action.payload === state.questions[state.index].correctOption
          ? state.questions[state.index].points
          : 0;
      return { ...state, answer: action.payload, score: state.score + point };
    }
    case "nextQuiz".toLowerCase(): {
      return { ...state, index: state.index + 1, answer: null };
    }
    case "finishedQuiz".toLowerCase(): {
      console.log(state.score);
      return {
        ...state,
        status: "finished",
        highScore: state.score > state.highScore ? state.score : state.highScore,
      };
    }
    case "Reset".toLowerCase(): {
      return { ...initialState, again: !state.again, highScore: state.highScore };
    }
    default: {
      throw new Error("unknow action");
    }
  }
};

const QuizContext = createContext({});

const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { status, questions, index, score, answer, highScore, again } = state;
  const numQues = questions?.length;
  const maxScore = questions?.reduce((prev, cur) => prev + cur.points, 0);
  const curQues = questions[index];

  return (
    <QuizContext.Provider
      value={{
        curQues,
        numQues,
        maxScore,
        status,
        questions,
        index,
        score,
        answer,
        highScore,
        again,
        dispatch,
      }}>
      {children}
    </QuizContext.Provider>
  );
};

const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) throw new Error("quiz context is being used out side out it scope");
  return context;
};

export { QuizProvider, useQuiz };
