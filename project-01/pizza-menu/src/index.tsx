import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import styles from "./index.module.css";
interface pizza {
  name: string;
  ingredients: string;
  price: number;
  photoName: string;
  soldOut: boolean;
}

const App = (): JSX.Element => {
  return (
    <div className={styles.root}>
      <Header />
      <Menu />
      <Footer />
    </div>
  );
};

// Header
const Header = (): JSX.Element => {
  return <header className={styles.header}>Fast React Pizza Co.</header>;
};

// Menu
const Menu = (): JSX.Element => {
  const pizzas: pizza[] = pizzaData.filter((el) => !el.soldOut);

  return (
    <main className={styles.menu}>
      <h2 className={styles["menu-header"]}>Our menu</h2>
      {pizzas.length !== 0 && (
        <p className={styles["menu-description"]}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati exercitationem est
          eveniet deserunt incidunt modi nisi delectus labore laborum, quasi dolorem architecto
          corporis pariatur maxime! Necessitatibus temporibus molestias omnis delectus.
        </p>
      )}
      {pizzas.length !== 0 ? (
        <ul className={styles["menu-pizzas"]}>
          {pizzaData.map((el) => {
            return <Pizza key={el.name} pizza={el} />;
          })}
        </ul>
      ) : (
        <h1>We are sold out everything. Come back again at 8:00 AM</h1>
      )}
    </main>
  );
};

// Pizza component
const Pizza = ({ pizza }: { pizza: pizza }): JSX.Element => {
  const soldOut = <p>{pizza.soldOut ? "SOLD OUT" : pizza.price}</p>;
  const soldOutStyle = pizza.soldOut ? styles["pizza-soldout"] : "";
  return (
    <li className={styles.pizza}>
      <img
        className={`${styles["pizza-img"]} ${soldOutStyle}`}
        src={pizza.photoName}
        alt={pizza.name}
      />
      <div className={styles["pizza-info"]}>
        <h2>{pizza.name}</h2>
        <p>{pizza.ingredients}</p>
        {soldOut}
      </div>
    </li>
  );
};

// Footer
const Footer = (): JSX.Element => {
  const [clock, setClock] = useState(new Date().toLocaleTimeString());
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const hour = parseInt(clock.split(":")[0]);
  useEffect(() => {
    setInterval(() => {
      setClock(new Date().toLocaleTimeString());
    }, 1000);
  }, []);
  useEffect(() => {
    if (hour > 8 && hour < 22) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [hour]);

  return (
    <footer className={styles.footer}>
      <p>
        It's {clock}.{" "}
        {isOpen
          ? "We're currently opening. Shop will close at 22:00 pm"
          : "Shop is closed. Come back at 8:00 AM"}
      </p>
      <button className={styles["order-btn"]}>Order</button>
    </footer>
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
    photoName: "pizzas-imgs/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas-imgs/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas-imgs/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas-imgs/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas-imgs/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas-imgs/prosciutto.jpg",
    soldOut: false,
  },
];
