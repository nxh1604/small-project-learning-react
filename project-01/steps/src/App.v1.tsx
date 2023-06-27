import "./App.css";
import { useState } from "react";
import Button from "./Button";
import styles from "./App.module.css";
const messages = ["Learn React ⚛️", "Apply for jobs 💼", "Invest your new income 🤑"];

const App = (): JSX.Element => {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  const handlerPrevious = (): void => {
    setStep((prev) => prev - 1);
  };
  const handlerNext = (): void => {
    setStep((prev) => prev + 1);
  };
  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>X</button>
      {isOpen && (
        <div className='container'>
          <div className='steps'>
            <div className={`step ${step >= 1 && "active"}`}>1</div>
            <div className={`step ${step >= 2 && "active"}`}>2</div>
            <div className={`step ${step >= 3 && "active"}`}>3</div>
          </div>
          <div className='content'>
            <p>
              Step {step}: {messages[step - 1]}
            </p>
          </div>
          <div className='button'>
            <Button>
              <span className={styles.text}>A text</span>
            </Button>
            <button onClick={handlerNext} disabled={step === 3}>
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
