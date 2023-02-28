import React from "react";
import cn from "classnames";
import global from "../styles/global.module.scss";
import SectionHeader from "../shared/SectionHeader";
import styles from "./styles/styles.module.scss";

const Powerplant = ({ data, currency, country, unit }) => {
  return (
    <>
      <section className={cn(global.section, global.page_break)}>
        <SectionHeader title="Powerplant" />
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
                Engine Make
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Engine Model
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Thrust per Engine (lbs)
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Total Thrust Output (lbs)
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Lateral Noise (dB)
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Flyover Noise (db)
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Approach Noise (dB)
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
                    {aircraft.engine_manufacturer}
                  </span>{" "}
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.engine_model}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.thrust_output_lbs}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.total_thrust_lbs}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.lateral_db}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.flyover_db}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.approach_db}
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
export default Powerplant;
