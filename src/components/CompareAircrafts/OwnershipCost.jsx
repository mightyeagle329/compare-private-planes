import React from "react";
import cn from "classnames";
import global from "../styles/global.module.scss";
import styles from "./styles/styles.module.scss";

import SectionHeader from "../shared/SectionHeader";

const OwnershipCost = ({data}) => {
  return (
    <>
      <section className={cn(global.section)}>
        <SectionHeader title="Ownership Costs" />
        <main className={cn(styles.ownership_container)}>
          <h3>Your estimated annual flight hours: 200</h3>
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
          <div className={cn(styles.additional_info)}>
            <h3>Annual Fixed Costs Breakdown</h3>
            <div>
              <h4>Crew Salary</h4>
              <div className={cn(styles.crew_salary)}>
                <div className={cn(styles.aircraft_names)}>
                  {data.map((aircraft) => {
                    return(
                      <div className={cn(styles.aircraft_name)} key={aircraft.aircraft_id}>{aircraft.aircraft_name}</div>
                    )
                  })}
                </div>
                <div className={cn(styles.bars)}>
                  {data.map((aircraft) => {
                    return(
                      <div className={cn(styles.bar)} key={aircraft.aircraft_id}>$25200</div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
export default OwnershipCost;
