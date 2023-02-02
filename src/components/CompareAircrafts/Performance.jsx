import React from "react";
import cn from "classnames";
import global from "../styles/global.module.scss";
import styles from "./styles/styles.module.scss";

import SectionHeader from "../shared/SectionHeader";

const Performance = ({ data }) => {
  return (
    <>
      <section className={cn(global.section)}>
        <SectionHeader title="Performance" />
        <main>
          <div className={cn(styles.compare_table)}>
            <div className={cn(styles.compare_table_column)}>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.invisible
                )}
              >
                invisible
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Range (NM)
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Range (Miles)
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Fuel Burn (GPH)
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Max Altitude (Feet)
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Rate of Climb (Feet/Min)
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Initial Cruise Altitude (Feet)
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Take-Off Distance (Feet)
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Landing Distance (Feet)
              </span>
            </div>
            {data.map((aircraft) => {
              return (
                <div
                  className={cn(styles.compare_table_column)}
                  key={aircraft.aircraft_id}
                >
                  <span
                    className={cn(
                      styles.compare_table_column_cell,
                      styles.table_column_head
                    )}
                  >
                    {aircraft.aircraft_name}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.range_NM}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.range_Miles}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.hourly_fuel_burn_GPH}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.max_altitude_feet}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.rate_climb}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.initial_cruise_altitude}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.TO_distance_feet}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.landing_distance_feet}
                  </span>
                </div>
              );
            })}
          </div>
        </main>
      </section>
    </>
  );
};
export default Performance;
