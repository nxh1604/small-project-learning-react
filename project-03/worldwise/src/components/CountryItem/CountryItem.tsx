import styles from "./CountryItem.module.css";

const CountryItem = ({ country }): JSX.Element => {
  const src = `https://flagsapi.com/${country.emoji}/shiny/64.png`;

  return (
    <li className={styles.countryItem}>
      <span className={styles.emoji}>
        <img src={src} alt='country flag' width='50px' />
      </span>
      <h3 className={styles.name}>{country.country}</h3>
    </li>
  );
};

export default CountryItem;
