import styles from "./SpinnerFullPage.module.css";
import Loading from "./Loading";
function SpinnerFullPage() {
  return (
    <div className={styles.spinnerFullpage}>
      <Loading />
    </div>
  );
}

export default SpinnerFullPage;
