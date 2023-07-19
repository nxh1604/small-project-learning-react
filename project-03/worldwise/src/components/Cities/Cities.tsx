import CityItem from "../CityItem/CityItem";
import Loading from "../Loading/Loading";
import Message from "../Message/Message";
import styles from "./Cities.module.css";

const Cities = ({ cities, loading }): JSX.Element => {
  if (loading) return <Loading />;

  if (!cities.length) {
    return <Message message={"Add your first city by clicking on a city in the map"} />;
  }

  return (
    <ul className={styles.cities}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
};

export default Cities;
