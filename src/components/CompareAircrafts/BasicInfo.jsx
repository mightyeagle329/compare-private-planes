import React from "react";
import cn from "classnames";
import global from "../styles/global.module.scss";
import styles from "./styles/styles.module.scss";
import SectionHeader from "../shared/SectionHeader";

const BasicInfo = ({ data }) => {
  return (
    <>
      <section className={cn(global.section)}>
        <SectionHeader title="Basic Info" />
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
                Production Start
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Production End
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                In Production?
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Number Made
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Number in Service
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Serial Numbers
              </span>
            </div>
            {data.map((aircraft) => {
              return (
                <div className={cn(styles.compare_table_column)} key={aircraft.aircraft_id}>
                  <span
                    className={cn(
                      styles.compare_table_column_cell,
                      styles.table_column_head
                    )}
                  >
                    {aircraft.aircraft_name}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    Production Start
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    Production End
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    In Production?
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    Number Made
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    Number in Service
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    Serial Numbers
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
export default BasicInfo;
