import { useCitiesContext } from "../../../contexts/CitiesContext";
import CountryItem from "../CountryItem/CountryItem";
import Loading from "../Loading/Loading";
import Message from "../Message/Message";

import styles from "./Countries.module.css";
const Countries = (): JSX.Element => {
  const { isLoading, cities } = useCitiesContext();

  if (isLoading) return <Loading />;

  if (!cities?.length) {
    return <Message message={"Add your first city by clicking on a city in the map"} />;
  }

  const countries = cities?.reduce((arr: Array<any>, city) => {
    if (arr.map((el) => el.country).includes(city.country)) {
      return [...arr];
    }
    return [...arr, { country: city.country, emoji: city.emoji }];
  }, []);

  return (
    <ul className={styles.countries}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
};

export default Countries;
