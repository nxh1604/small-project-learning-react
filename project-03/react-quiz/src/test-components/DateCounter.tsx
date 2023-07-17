import { useReducer } from "react";

const initialState = { count: null, step: 1 };

const reducerDate = (state, action) => {
  console.log(state, action);
  switch (action.type.toLowerCase()) {
    case "add": {
      return { ...state, count: +state.count + state.step };
    }
    case "sub": {
      return { ...state, count: +state.count - state.step };
    }
    case "setCount".toLowerCase(): {
      if (isNaN(action.val) && action.val.length !== 0) {
        return state;
      }
      return { ...state, count: !action.val.length ? "" : Number(action.val) };
    }
    case "setStep".toLowerCase(): {
      return { ...state, step: action.val };
    }
    case "reset": {
      return initialState;
    }
    default:
      throw new Error("Unkown action type");
  }

  // if (action.type.toLowerCase() === "add") return state ? state + 1 : 1;
  // if (action.type.toLowerCase() === "sub") return state ? state - 1 : -1;
  // if (action.type.toLowerCase() === "set") {
  //   if (isNaN(action.val) && action.val.length !== 0) {
  //     return state;
  //   }
  //   // console.log(Number(action.val));
  //   return !action.val.length ? "" : Number(action.val);
  // }
};

const DateCounter = (): JSX.Element => {
  const [dateCounter, dispatch] = useReducer(reducerDate, initialState);

  const { count, step } = dateCounter;

  const date = new Date(`${new Date().toDateString()}`);
  date.setDate(date.getDate() + count ? count : 0);

  const handleStep = (e) => {
    dispatch({ type: "setStep", val: Number(e.target.value) });
  };
  const handleAddDate = () => {
    dispatch({ type: "add" });
    // setCalDate((prevC) => (prevC ? prevC + step : step));
  };

  const handleSubDate = () => {
    dispatch({ type: "suB" });
    // setCalDate((prevC) => (prevC ? prevC - step : -step));
  };

  const handleCalDate = (e) => {
    dispatch({ type: "SetCount", val: e.target.value });
    // setCalDate(Number(e.target.value));
  };

  const handleReset = () => {
    dispatch({ type: "reset" });
    // setCalDate(null);
  };
  console.log("render");
  return (
    <div>
      <div>
        <input type='range' value={step} max={10} min={0} onChange={handleStep} />
        <p>{step}</p>
      </div>
      <div>
        <button onClick={handleSubDate}>-</button>
        <input type='text' value={count === null ? "" : count} onChange={handleCalDate} />
        <button onClick={handleAddDate}>+</button>
      </div>
      <p>{date.toDateString()}</p>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default DateCounter;
