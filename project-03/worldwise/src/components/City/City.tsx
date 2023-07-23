import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useCitiesContext } from "../../../contexts/CitiesContext";
import BackButton from "../Button/BackButton";
import Loading from "../Loading/Loading";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

const City = (): JSX.Element => {
  const { id } = useParams();

  const { currentCity, getCurrentCity } = useCitiesContext();

  useEffect(() => {
    getCurrentCity(id);
  }, [id]);

  if (`${currentCity?.id}` !== id) return <Loading />;

  const { cityName, emoji, date, notes } = currentCity;
  const src = `https://flagsapi.com/${emoji}/shiny/64.png`;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <img src={src} alt='country flag' width='40px' />
          {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a href={`https://en.wikipedia.org/wiki/${cityName}`} target='_blank' rel='noreferrer'>
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
};

export default City;
