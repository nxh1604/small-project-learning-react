import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

const Map = (): JSX.Element => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return (
    <div className={styles.map} onClick={() => navigate("form")}>
      <h1>Maps</h1>
      <h2>
        Position: {lat}, {lng}
      </h2>
    </div>
  );
};

export default Map;
