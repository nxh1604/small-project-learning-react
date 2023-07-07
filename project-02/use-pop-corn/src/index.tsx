import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import StarRating from "./StarRating";
import TextExpander from "./TextExpander";
// import "./index.css";
// import App from "./App";

const Test = () => {
  const [getRating, setGetRating] = useState(0);

  return (
    <div>
      <StarRating onGetRating={setGetRating} />
      <p>movie rated {getRating}</p>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <StarRating numberStar={5} />
    <StarRating
      numberStar={5}
      color='red'
      size={32}
      textColor={"blue"}
      message={["terrible", "bad", "fine", "good", "amazing"]}
    />
    <Test /> */}
    <TextExpander>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit minima error amet ad. Ratione
      fugit voluptatum, eveniet tempore voluptate a!
    </TextExpander>
  </React.StrictMode>
);
