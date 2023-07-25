import { useEffect } from "react";
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
import { useQuiz } from "./context/QuizContext";

const App = (): JSX.Element => {
  const { status, dispatch, again }: any = useQuiz();
  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataResovle", payload: data }))
      .catch((err) => dispatch({ type: "dataReject" }));
  }, [again, dispatch]);

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === "loading" && <Loading />}
        {status === "error" && <ErrorLoader />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <QuizScreen>
            {
              <>
                <StatusBar />
                <Options />
                <Footer>
                  <Timer />
                  <Nextbutton />
                </Footer>
              </>
            }
          </QuizScreen>
        )}
        {status === "finished" && (
          <>
            <FinishedScreen />
            <PlayAgain />
          </>
        )}
      </Main>
    </div>
  );
};

export default App;
