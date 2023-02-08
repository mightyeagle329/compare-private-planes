import cn from "classnames";
import global from "../styles/global.module.scss";
import styles from "./styles/styles.module.scss";
import SectionHeader from "../shared/SectionHeader";
const PerformanceData = ({ params }) => {
  const takeOff = "100%";
  const landing = "45%";

  return (
    <section className={cn(global.section)}>
      <SectionHeader title="Performance Data" />
      <main>
        <div className={cn(global.details_table)}>
          <div className={cn(global.column)}>
            <div className={cn(global.rows)}>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Range (Nautical Miles)
                </span>
                <span>{params.range_NM}</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Range (Miles / KM)
                </span>
                <span>{params.range_Miles}</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Fuel Burn (Gallons per Hour)
                </span>
                <span>{params.hourly_fuel_burn_GPH}</span>
              </div>
            </div>
          </div>
          <span className={cn(global.seperator)}></span>
          <div className={cn(global.column)}>
            <div className={cn(global.rows)}>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Max Altitude (Feet)
                </span>
                <span>{params.max_altitude_feet}</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Rate of Climb (Feet / Min)
                </span>
                <span>{params.rate_climb}</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Initial Cruise Altitude (Feet)
                </span>
                <span>{params.initial_cruise_altitude}</span>
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
                <span className={cn(global.value)}>
                  {params.high_cruise_knots}
                </span>
                <span className={cn(global.value)}>
                  {params.high_cruise_MPH}
                </span>
                <span className={cn(global.value)}>
                  {params.high_cruise_Mach}
                </span>
              </div>
            </div>
          </div>
          <span className={cn(global.seperator)}></span>
          <div className={cn(global.column)}>
            <span className={cn(global.column_header)}>Long Range Cruise</span>
            <div className={cn(global.rows)}>
              <div className={cn(global.row)}>
                <span className={cn(global.key)}>Knots</span>
                <span className={cn(global.key)}>MPH</span>
                <span className={cn(global.key)}>Mach</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.value)}>
                  {params.long_range_cruise_knots}
                </span>
                <span className={cn(global.value)}>
                  {params.long_range_cruise_MPH}
                </span>
                <span className={cn(global.value)}>
                  {params.long_range_cruise_Mach}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* --------------------- */}
        <div className={cn(styles.additional_infos)}>
          <div className={cn(styles.info)}>
            <span className={cn(styles.subtitle)}>
              Take-Off Distance (feet)
            </span>
            <span className={cn(styles.subtitle)}>Landing Distance (feet)</span>
          </div>
          <div className={cn(styles.bars)}>
            <span
              className={styles.distance_bar}
              style={{
                width: params.TO_distance_feet < 600 ? params.TO_distance_feet * 0.4 + 40 : params.TO_distance_fee * 0.7,
              }}
            >
              {params.TO_distance_feet}
            </span>
            <span
              className={styles.distance_bar}
              style={{
                width: params.landing_distance_feet < 600 ? params.landing_distance_feet * 0.4 + 40 : 60,

              }}
            >
              {params.landing_distance_feet}
            </span>
          </div>
        </div>
      </main>
    </section>
  );
};

export default PerformanceData;
