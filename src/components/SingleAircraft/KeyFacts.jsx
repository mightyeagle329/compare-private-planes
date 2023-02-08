import cn from "classnames";
import global from "../styles/global.module.scss";
import styles from "./styles/styles.module.scss";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import SectionHeader from "../shared/SectionHeader";

ChartJS.register(ArcElement, Tooltip, Legend);

const KeyFacts = ({ params }) => {
  const data_passengers = {
    datasets: [
      {
        label: "Pax",
        data: [params.max_pax, 19],
        backgroundColor: [
          // "rgba(255, 99, 132, 0.2)",
          "rgba(255, 99, 132, 1)",
          // "rgba(255, 206, 86, 0.2)",
          // "rgba(75, 192, 192, 0.2)",
          // "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.0)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 0.3)",
          // "rgba(54, 162, 235, 1)",
          // "rgba(255, 206, 86, 1)",
          // "rgba(75, 192, 192, 1)",
          // "rgba(153, 102, 255, 1)",
          // "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };
  const data_range = {
    datasets: [
      {
        label: "Range",
        data: [params.range_NM, 8000],
        backgroundColor: [
          // "rgba(255, 99, 132, 0.2)",
          "rgba(255, 99, 132, 1)",
          // "rgba(255, 206, 86, 0.2)",
          // "rgba(75, 192, 192, 0.2)",
          // "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.0)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 0.3)",
          // "rgba(54, 162, 235, 1)",
          // "rgba(255, 206, 86, 1)",
          // "rgba(75, 192, 192, 1)",
          // "rgba(153, 102, 255, 1)",
          // "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const data_cruise = {
    datasets: [
      {
        label: "Cruise Speed",
        data: [params.high_cruise_knots, 516],
        backgroundColor: [
          // "rgba(255, 99, 132, 0.2)",
          "rgba(255, 99, 132, 1)",
          // "rgba(255, 206, 86, 0.2)",
          // "rgba(75, 192, 192, 0.2)",
          // "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.0)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 0.3)",
          // "rgba(54, 162, 235, 1)",
          // "rgba(255, 206, 86, 1)",
          // "rgba(75, 192, 192, 1)",
          // "rgba(153, 102, 255, 1)",
          // "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const data_cost = {
    datasets: [
      {
        label: "Cost Per Hour",
        data: [params.hourly_ownership_rate_NAmerica, 10000],
        backgroundColor: [
          // "rgba(255, 99, 132, 0.2)",
          "rgba(255, 99, 132, 1)",
          // "rgba(255, 206, 86, 0.2)",
          // "rgba(75, 192, 192, 0.2)",
          // "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.0)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 0.3)",
          // "rgba(54, 162, 235, 1)",
          // "rgba(255, 206, 86, 1)",
          // "rgba(75, 192, 192, 1)",
          // "rgba(153, 102, 255, 1)",
          // "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const data_fuel = {
    datasets: [
      {
        label: "Hourly Fuel Burn",
        data: [params.hourly_fuel_burn_GPH, 626],
        backgroundColor: [
          // "rgba(255, 99, 132, 0.2)",
          "rgba(255, 99, 132, 1)",
          // "rgba(255, 206, 86, 0.2)",
          // "rgba(75, 192, 192, 0.2)",
          // "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.0)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 0.3)",
          // "rgba(54, 162, 235, 1)",
          // "rgba(255, 206, 86, 1)",
          // "rgba(75, 192, 192, 1)",
          // "rgba(153, 102, 255, 1)",
          // "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <>
      <section className={cn(global.section)}>
        <SectionHeader title="Key Facts" />
        <main className={cn(styles.main_key_facts)}>
          <ul className={cn(styles.facts)}>
            <li>{params.key_facts}</li>
          </ul>
          <div className={cn(styles.img_container)}>
            <img src={`${params?.image_name}`} alt="" />
          </div>
        </main>
      </section>
      <section className={cn(global.section)}>
        <span className={cn(styles.line)}></span>
        <div className={cn(styles.doughnut_charts_wrapper)}>
          <div
            style={{
              width: "130px",
            }}
            className={cn(styles.chart_container)}
          >
            <span>Passengers</span>
            <Doughnut
              data={data_passengers}
              options={{
                responsive: true,
                plugins: {
                  tooltip: {
                    enabled: false // <-- this option disables tooltips
                  }
                }
              }}
            />
            <span className={styles.chart_label}>{params.max_pax}</span>
          </div>
          <div
            style={{
              width: "130px",
            }}
            className={cn(styles.chart_container)}
          >
            <span>Range</span>
            <Doughnut
              data={data_range}
              options={{
                responsive: true,
                plugins: {
                  tooltip: {
                    enabled: false // <-- this option disables tooltips
                  }
                }
              }}
            />
            <span className={styles.chart_label}>{params.range_NM}</span>
          </div>
          <div
            style={{
              width: "130px",
            }}
            className={cn(styles.chart_container)}
          >
            <span>Cruise Speed</span>
            <Doughnut
              data={data_cruise}
              options={{
                responsive: true,
                plugins: {
                  tooltip: {
                    enabled: false // <-- this option disables tooltips
                  }
                }
              }}
            />
            <span className={styles.chart_label}>{params.high_cruise_knots}</span>
          </div>
          <div
            style={{
              width: "130px",
            }}
            className={cn(styles.chart_container)}
          >
            <span>Cost per Hour</span>
            <Doughnut
              data={data_cost}
              options={{
                responsive: true,
                plugins: {
                  tooltip: {
                    enabled: false // <-- this option disables tooltips
                  }
                }
              }}
            />
            <span className={styles.chart_label}>{params.hourly_ownership_rate_NAmerica}</span>
          </div>
          <div
            style={{
              width: "130px",
            }}
            className={cn(styles.chart_container)}
          >
            <span>Fuel Burn</span>
            <Doughnut
              data={data_fuel}
              options={{
                responsive: true,
                plugins: {
                  tooltip: {
                    enabled: false // <-- this option disables tooltips
                  }
                }
              }}
            />
            <span className={styles.chart_label}>{params.hourly_fuel_burn_GPH}</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default KeyFacts;
