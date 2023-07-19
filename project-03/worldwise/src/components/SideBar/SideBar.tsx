import { Outlet } from "react-router-dom";
import AppNav from "../AppNav/AppNav";
import Logo from "../Logo";
import Footer from "./Footer";
import styles from "./SideBar.module.css";

const SideBar = (): JSX.Element => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <Footer />
    </div>
  );
};

export default SideBar;
