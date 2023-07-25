import { useEffect, useReducer } from "react";
import "./App.css";

import Header from "./components/Header";
import Main from "./components/Main";
import Loading from "./components/Loading";
import ErrorLoader from "./components/Errorloader";
import StartScreen from "./components/StartScreen";
import QuizScreen from "./components/QuizScreen";
import FinishedScreen from "./components/FinishedScreen";
import Options from "./components/Options";
import Nextbutton from "./components/Nextbutton";
import StatusBar from "./components/StatusBar";
import PlayAgain from "./components/PlayAgain";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const SECS_PER_QUES = 30;

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

const App = (): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataResovle", payload: data }))
      .catch((err) => dispatch({ type: "dataReject" }));
  }, [state.again]);
  const { status, questions, index, answer, score, highScore } = state;

  const numQues = questions?.length;
  const maxScore = questions?.reduce((prev, cur) => prev + cur.points, 0);

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === "loading" && <Loading />}
        {status === "error" && <ErrorLoader />}
        {status === "ready" && <StartScreen numQuetions={numQues} dispatch={dispatch} />}
        {status === "active" && (
          <QuizScreen>
            {
              <>
                <StatusBar
                  score={score}
                  maxScore={maxScore}
                  numQues={numQues}
                  answer={answer}
                  index={index}
                />
                <Options answer={answer} dispatch={dispatch} question={questions[index]} />
                <Footer>
                  <Timer defaulTime={numQues * SECS_PER_QUES} dispatch={dispatch} />
                  <Nextbutton
                    dispatch={dispatch}
                    answer={answer}
                    numQues={questions.length}
                    index={index}
                  />
                </Footer>
              </>
            }
          </QuizScreen>
        )}
        {status === "finished" && (
          <>
            <FinishedScreen score={score} maxScore={maxScore} highScore={highScore} />
            <PlayAgain dispatch={dispatch} />
          </>
        )}
      </Main>
    </div>
  );
};

export default App;
