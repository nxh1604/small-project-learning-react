import { useParams, useSearchParams } from "react-router-dom";
import styles from "./City.module.css";

const City = (): JSX.Element => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return (
    <div className={styles.city}>
      <h1>City {id}</h1>
      <h2>
        Position: {lat}, {lng}
      </h2>
    </div>
  );
};

export default City;
