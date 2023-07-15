import { useState } from "react";

const DateCounter = (): JSX.Element => {
  const [step, setStep] = useState(1);
  const [calDate, setCalDate] = useState<number | null>(null);
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + calDate);
  console.log(date.toDateString());
  const handleStep = (e) => {
    setStep(Number(e.target.value));
  };

  const handleAddDate = () => {
    setCalDate((prevC) => prevC + step);
  };

  const handleSubDate = () => {
    setCalDate((prevC) => prevC - step);
  };

  const handleCalDate = (e) => {
    if (!Number(e.target.value)) {
      return;
    }
    setCalDate(Number(e.target.value));
  };

  const handleReset = () => {
    setStep(1);
    setCalDate(null);
  };

  return (
    <div>
      <div>
        <input type='range' value={step} max={10} min={0} onChange={handleStep} />
        <p>{step}</p>
      </div>
      <div>
        <button onClick={handleSubDate}>-</button>
        <input type='text' value={calDate ? calDate : ""} onChange={handleCalDate} />
        <button onClick={handleAddDate}>+</button>
      </div>
      <p>{date.toDateString()}</p>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default DateCounter;
