import cn from "classnames";
import global from "..//styles/global.module.scss";
import styles from "./styles/styles.module.scss";
import SectionHeader from "../shared/SectionHeader";

const Similar = ({ params }) => {
  return (
    <section className={cn(global.section)}>
      <SectionHeader title="Similar Aircraft" />
      <main className={cn(styles.similar)}>

        {params?.length ? (
          params?.map((product) => (
            <div key={product.aircraft_id} className={cn(styles.suggestion)}>
              <div className={cn(styles.image_container)}>
                <img src={`${product?.image_name}`} alt="" />
              </div>
              <h5>{product.aircraft_name}</h5>
            </div>
          ))
        ) : (
          <p>Loading</p>
        )}

      </main>
    </section>
  );
};

export default Similar;
