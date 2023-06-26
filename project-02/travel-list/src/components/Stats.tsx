import styles from "./stats.module.css";

const Stats = ({ items }: any): JSX.Element => {
  if (items.length === 0)
    return <p className={styles.container}>Start adding some item to your packing list 😘.</p>;
  const itemsLength = items.length;
  const packedLength = items.filter((el: any) => el.packed).length;
  const status = Math.round((packedLength / itemsLength) * 100);
  return (
    <footer className={styles[`container`]}>
      {status < 100 ? (
        <em>
          {itemsLength} items need to be packed. And, you have packaged {packedLength} items. Packed{" "}
          {status}%
        </em>
      ) : (
        <p>You have packed up everything! you are ready to go. ✈️ 🛸</p>
      )}
    </footer>
  );
};

export default Stats;
