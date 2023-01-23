import cn from "classnames";
import global from "./styles/global.module.scss";
import styles from "./styles/styles.module.scss";
import SectionHeader from "./shared/SectionHeader";
const PerformanceData = () => {
  const takeOff = "100%";
  const landing = "45%"

  return (
    <section className={cn(global.section)}>
      <SectionHeader title="Performance Data" />
      <main>
        <div className={cn(global.details_table)}>
          <div className={cn(global.column)}>
            <div className={cn(global.rows)}>
              <div className={cn(global.row)}>
                <span className={cn(global.key)}>Range (Nautical Miles)</span>
                <span>5,000</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key)}>Range (Miles / KM)</span>
                <span>6,000</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key)}>
                  Fuel Burn (Gallons per Hour)
                </span>
                <span>350</span>
              </div>
            </div>
          </div>
          <span className={cn(global.seperator)}></span>
          <div className={cn(global.column)}>
            <div className={cn(global.rows)}>
              <div className={cn(global.row)}>
                <span className={cn(global.key)}>Max Altitude (Feet)</span>
                <span>51,000</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key)}>Rate of Climb (Feet / Min)</span>
                <span>2,000</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key)}>
                  Initial Cruise Altitude (Feet)
                </span>
                <span>40,000</span>
              </div>
            </div>
          </div>
        </div>
        {/* ------------------------------- */}
        <div className={cn(global.details_table)}>
          <div className={cn(global.column)}>
            <span className={cn(global.column_header)}>High Speed Cruise</span>
            <div className={cn(global.rows)}>
              <div className={cn(global.row)}>
                <span className={cn(global.key)}>Knots</span>
                <span className={cn(global.key)}>MPH</span>
                <span className={cn(global.key)}>Mach</span>
              </div>
              <div className={cn(global.row)}>
                <span>597</span>
                <span>650</span>
                <span>09</span>
              </div>
            </div>
          </div>
          <span className={cn(global.seperator)}></span>
          <div className={cn(global.column)}>
            <span className={cn(global.column_header)}>High Speed Cruise</span>
            <div className={cn(global.rows)}>
              <div className={cn(global.row)}>
                <span className={cn(global.key)}>Knots</span>
                <span className={cn(global.key)}>MPH</span>
                <span className={cn(global.key)}>Mach</span>
              </div>
              <div className={cn(global.row)}>
                <span>597</span>
                <span>650</span>
                <span>09</span>
              </div>
            </div>
          </div>
        </div>
        {/* --------------------- */}
        <div className={cn(styles.additional_infos)}>
          <div className={cn(styles.info)}>
            <span className={cn(styles.subtitle)}>Take-Off Distance</span>
            <span className={cn(styles.subtitle)}>Landing Distance</span>
            
          </div>
          <div className={cn(styles.bars)}>
            
            <span className={styles.distance_bar} style={{
              width: takeOff
            }}>
              8521
            </span>
            <span className={styles.distance_bar} style={{
              width: landing
            }}>
              4233
            </span>
          </div>
        </div>
      </main>
    </section>
  );
};

export default PerformanceData;
