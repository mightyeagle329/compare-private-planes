import cn from "classnames";
import global from "./styles/global.module.scss";
import styles from "./styles/styles.module.scss";
import SectionHeader from "./shared/SectionHeader";

const Maintenance = () => {
  return (
    <section className={cn(global.section)}>
      <SectionHeader title="Maintenance" />
      <main>
        <div className={cn(styles.timeline)}>
          <div className={cn(styles.container,styles.left)}>
            <div className={cn(styles.content)}>
              <h2>A Check</h2>
              <p>
                Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec
                
              </p>
            </div>
          </div>
          <div className={cn(styles.container,styles.right)}>
            <div className={cn(styles.content)}>
              <h2>B Check</h2>
              <p>
                Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec
                
              </p>
            </div>
          </div>
          <div className={cn(styles.container,styles.left)}>
            <div className={cn(styles.content)}>
              <h2>C Check</h2>
              <p>
                Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec
                
              </p>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Maintenance;
