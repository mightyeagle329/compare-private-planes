import React from "react";
import cn from "classnames";
import global from "../styles/global.module.scss";
import SectionHeader from "../shared/SectionHeader";
import styles from "./styles/styles.module.scss";

const Dimensions = ({ data }) => {
  return (
    <>
      <section className={cn(global.section, global.page_break)}>
        <SectionHeader title="Dimensions" />
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
                Exterior Length (feet)
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Exterior Height (feet)
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Wingspan (feet)
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Interior Length (feet)
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Interior Height (feet)
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Interior Width (feet)
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Door Height (feet)
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Door Width (feet)
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
                    {aircraft.ext_length_feet}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.exterior_height_feet}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.wingspan_feet}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.int_length_feet}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.int_height_feet}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.int_width_feet}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.door_height_feet}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.door_width_feet}
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
export default Dimensions;
