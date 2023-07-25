import CityItem from "../CityItem/CityItem";
import Loading from "../Loading/Loading";
import Message from "../Message/Message";
import styles from "./Cities.module.css";
import { useCitiesContext } from "../../../contexts/CitiesContext";

const Cities = (): JSX.Element => {
  const { cities, isLoading } = useCitiesContext();

  if (isLoading) return <Loading />;

  if (!cities?.length || !cities) {
    return <Message message={"Add your first city by clicking on a city in the map"} />;
  }

  return (
    <ul className={styles.cities}>
      {cities?.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
};

export default Cities;
