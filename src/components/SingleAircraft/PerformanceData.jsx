import cn from "classnames";
import global from "../styles/global.module.scss";
import styles from "./styles/styles.module.scss";
import SectionHeader from "../shared/SectionHeader";
import numeral from "numeral";

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
                <span>{numeral(params.range_NM).format("0,0")}</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Range (Miles / KM)
                </span>
                <span>{numeral(params.range_Miles).format("0,0")}</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Fuel Burn (Gallons per Hour)
                </span>
                <span>
                  {numeral(params.hourly_fuel_burn_GPH).format("0,0")}
                </span>
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
                <span>{numeral(params.max_altitude_feet).format("0,0")}</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Rate of Climb (Feet / Min)
                </span>
                <span>{numeral(params.rate_climb).format("0,0")}</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Initial Cruise Altitude (Feet)
                </span>
                <span>
                  {numeral(params.initial_cruise_altitude).format("0,0") === 0
                    ? "-"
                    : numeral(params.initial_cruise_altitude).format("0,0")}
                </span>
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
                  {numeral(params.high_cruise_knots).format("0,0")}
                </span>
                <span className={cn(global.value)}>
                  {numeral(params.high_cruise_MPH).format("0,0")}
                </span>
                <span className={cn(global.value)}>
                  {numeral(params.high_cruise_Mach).format("0,0")}
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
                  {numeral(params.long_range_cruise_knots).format("0,0")}
                </span>
                <span className={cn(global.value)}>
                  {numeral(params.long_range_cruise_MPH).format("0,0")}
                </span>
                <span className={cn(global.value)}>
                  {numeral(params.long_range_cruise_Mach).format("0,0")}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* --------------------- */}
        <center>
          <img
            className={cn(styles.runaway_img)}
            src="https://compareprivateplanes.com/tools/runway.jpg"
          ></img>
        </center>

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
                width: `${
                  (parseInt(params.TO_distance_feet) /
                    (parseInt(params.TO_distance_feet) +
                      parseInt(params.landing_distance_feet))) *
                  1000
                }px`,
              }}
            >
              {numeral(params.TO_distance_feet).format("0,0")}
            </span>
            <span
              className={styles.landing_distance_bar}
              style={{
                width:
                  (parseInt(params.landing_distance_feet) /
                    (parseInt(params.TO_distance_feet) +
                      parseInt(params.landing_distance_feet))) *
                  1000,
              }}
            >
              {numeral(params.landing_distance_feet).format("0,0")}
            </span>
          </div>
        </div>
      </main>
    </section>
  );
};

export default PerformanceData;
