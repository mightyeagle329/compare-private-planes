import React from "react";
import cn from "classnames";
import global from "../styles/global.module.scss";
import styles from "./styles/styles.module.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { faker } from "@faker-js/faker";
import { Line } from "react-chartjs-2";

import SectionHeader from "../shared/SectionHeader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const AquisitionCost = ({ data, currency, country, unit }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  const labels = ["1998", "1999", "2000", "2002", "2001", "2003"];

  const lineData = {
    labels,
    datasets: [
      {
        label: "Aircraft 1",
        data: labels.map(() => faker.datatype.number({ min: 11.0, max: 20.0 })),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Aircraft 2",
        data: labels.map(() => faker.datatype.number({ min: 11.0, max: 20.0 })),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Aircraft 3",
        data: labels.map(() => faker.datatype.number({ min: 11.0, max: 20.0 })),
        borderColor: "rgb(153, 82, 155)",
        backgroundColor: "rgba(153, 82, 155, 0.5)",
      },
    ],
  };
  return (
    <>
      <section className={cn(global.section)}>
        <SectionHeader title="Aquisition Costs" />
        <main className={cn(styles.aquisition_container)}>
          <div className={cn(styles.future_value)}>
            <h2>
              Estimated Future Value{" "}
              <button className={cn(styles.btn)}>2 years</button>
            </h2>
          </div>
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
                Select YOM
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                New Purchase Price
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Current Value
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Depreciation Rate
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Future Values
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
                    2019
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.new_purchase}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.current_value}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.deprecation_rate}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {aircraft.future_value}
                  </span>
                </div>
              );
            })}
          </div>
          <div className={cn(global.line_chart)}>
            <Line data={lineData} options={options} />
          </div>
        </main>
      </section>
    </>
  );
};
export default AquisitionCost;
