import React from "react";
import cn from "classnames";
import global from "../styles/global.module.scss";
import styles from "./styles/styles.module.scss";

import SectionHeader from "../shared/SectionHeader";

const Interior = ({ data }) => {
  return (
    <>
      <section className={cn(global.section)}>
        <SectionHeader title="Interior" />
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
                Max Passengers
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Typical Passengers
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Cabin Noise (dB)
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Cabin Altitude (Feet)
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Sea Level Cabin (Feet)
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Pressure Differential (PSI)
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Living Zone Count
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Cabin Volume (Cubic Feet)
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
                    {aircraft.max_pax}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.typical_pax}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.cabin_noise}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.cabin_altitude}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.sea_level_cabin}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.pressure_differential_psi}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.living_zones}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.cabin_volume_CF}
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
export default Interior;
