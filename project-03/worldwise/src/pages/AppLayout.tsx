import Map from "../components/Map/Map";
import SideBar from "../components/SideBar/SideBar";
import User from "../components/User/User";
import styles from "./AppLayout.module.css";
const AppLayout = (): JSX.Element => {
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
      <User />
    </div>
  );
};

export default AppLayout;
