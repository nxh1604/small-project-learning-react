import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

const Product = (): JSX.Element => {
  return (
    <main className={styles["product"]}>
      <PageNav />
      <section>
        <img src='../img-1.jpg' alt='A man with his dog travel through the lost land' />
        <div>
          <h1>About WorldWide</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores, voluptatem. Porro
            aliquid, id veniam magni animi tempore maiores ipsum provident dolor doloremque. Dolorem
            sapiente aliquid at magnam minima quia cum voluptatem illum fugiat. Voluptas, fuga
            possimus qui laudantium ut reprehenderit consequatur blanditiis necessitatibus, nemo
            magni hic quod explicabo distinctio pariatur!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit perferendis laboriosam
            excepturi possimus ipsa deserunt exercitationem, at reiciendis quam dolorum consequuntur
            alias tempore blanditiis? Molestiae, deserunt aut. Impedit, architecto expedita.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Product;
