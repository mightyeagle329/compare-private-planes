import cn from "classnames";
import global from "./styles/global.module.scss";
import styles from "./styles/styles.module.scss";
import SectionHeader from "./shared/SectionHeader";

const Similar = () => {
  return (
    <section className={cn(global.section)}>
      <SectionHeader title="Similar Aircraft" />
      <main className={cn(styles.similar)}>
        <div className={cn(styles.suggestion)}>
          <img src="https://via.placeholder.com/150" alt="" />
          <h3>Aircraft 1</h3>
        </div>
        <div className={cn(styles.suggestion)}>
          <img src="https://via.placeholder.com/150" alt="" />
          <h3>Aircraft 2</h3>
        </div>
        <div className={cn(styles.suggestion)}>
          <img src="https://via.placeholder.com/150" alt="" />
          <h3>Aircraft 3</h3>
        </div>
      </main>
    </section>
  );
};

export default Similar;
