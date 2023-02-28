import React from "react";
import cn from "classnames";
import global from "../styles/global.module.scss";
import styles from "./styles/styles.module.scss";

import SectionHeader from "../shared/SectionHeader";

const MainTenance = ({ data, currency, country, unit }) => {
  return (
    <>
      <section className={cn(global.section)}>
        <SectionHeader title="Maintenance Schedule" />
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
                A Check
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                B Check
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                C Check
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                D Check
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
                    {aircraft.a_check} hours
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.b_check} hours
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.c_check} hours
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.d_check} hours
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
export default MainTenance;
