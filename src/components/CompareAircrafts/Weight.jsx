import React from "react";
import cn from "classnames";
import global from "../styles/global.module.scss";
import SectionHeader from "../shared/SectionHeader";
import styles from "./styles/styles.module.scss";

const Weights = ({ data }) => {
  return (
    <>
      <section className={cn(global.section)}>
        <SectionHeader title="Weights" />
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
                Max Take-Off Weight (lbs)
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Max Landing Weight (lbs)
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Max Ramp Weight (lbs)
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Available Fuel (lbs)
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Max Payload (lbs)
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Useful Payload (lbs)
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Basic Operating Weight (lbs)
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Baggage Weight (lbs)
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Total Baggage (cubic feet)
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Internal Baggage (cubic feet)
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                External Baggage (cubic feet)
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
                    {aircraft.MTOW_kgs}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.max_landing_weight_lbs}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.max_ramp_weight_lbs}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.available_fuel_lbs}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.max_payload_lbs}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.useful_load_lbs}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.basic_operating_weight_lbs}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.baggage_weight_lbs}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.baggage_capacity_cubicmeters}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.internal_baggage_cubicfeet}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.external_baggage_cubicfeet}
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
export default Weights;
