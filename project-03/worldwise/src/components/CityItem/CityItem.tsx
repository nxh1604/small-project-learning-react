import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCitiesContext } from "../../../contexts/CitiesContext";

const formatDate = (date) => {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};

const CityItem = ({ city }): JSX.Element => {
  const { emoji, cityName, date, id, position } = city;
  const src = `https://flagsapi.com/${emoji}/shiny/64.png`;
  const { currentCity, deleteCity } = useCitiesContext();

  const handleDelCity = (e) => {
    e.preventDefault();
    deleteCity(id);
  };

  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          currentCity?.id === city.id && styles["cityItem--active"]
        }`}>
        <span className={styles.emoji}>
          <img src={src} alt='country flag' width='40px' />
        </span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleDelCity}>
          &times;
        </button>
      </Link>
    </li>
  );
};

export default CityItem;
