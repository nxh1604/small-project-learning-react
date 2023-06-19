import React from "react";
import ReactDOM from "react-dom/client";

interface pizza {
  name: string;
  ingredients: string;
  price: number;
  photoName: string;
  soldOut: boolean;
}

const App = (): JSX.Element => {
  return (
    <div>
      <Header />
      <Menu />
      <Footer />
    </div>
  );
};

// Header
const Header = (): JSX.Element => {
  return <h1>Fast React Pizza Co.</h1>;
};

// Menu
const Menu = (): JSX.Element => {
  return (
    <div>
      <Pizza />
    </div>
  );
};

// Footer
const Footer = (): JSX.Element => {
  return <footer>{new Date().toLocaleTimeString()}. We're currently open</footer>;
};

//

// Pizza component
const Pizza = (): JSX.Element => {
  return (
    <>
      <img src='pizzas-imgs/spinaci.jpg' alt='pizza spinaci' />
      <h2>Pizza Spinaci</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, et.</p>
    </>
  );
};

// React v18
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const pizzaData: Array<pizza> = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];
