import Map from "../components/Map/Map";
import SideBar from "../components/SideBar/SideBar";
import styles from "./AppLayout.module.css";
const AppLayout = (): JSX.Element => {
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
    </div>
  );
};

export default AppLayout;
