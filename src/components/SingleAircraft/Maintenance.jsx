import cn from "classnames";
import global from "../styles/global.module.scss";
import styles from "./styles/styles.module.scss";
import SectionHeader from "../shared/SectionHeader";
import numeral from "numeral";

const Maintenance = ({ params }) => {
  return (
    <section className={cn(global.section) + " " + global.page_break}>
      <SectionHeader title="Maintenance" />
      <main>
        <div className={cn(styles.timeline)}>
          <div className={cn(styles.container, styles.left)}>
            <div className={cn(styles.content)}>
              <h2>A Check</h2>
              <p>{numeral(params.a_check).format("0,0")}</p>
            </div>
          </div>
          <div className={cn(styles.container, styles.right)}>
            <div className={cn(styles.content)}>
              <h2>B Check</h2>
              <p>{numeral(params.b_check).format("0,0")}</p>
            </div>
          </div>
          <div className={cn(styles.container, styles.left)}>
            <div className={cn(styles.content)}>
              <h2>C Check</h2>
              <p>{numeral(params.c_check).format("0,0")}</p>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Maintenance;
