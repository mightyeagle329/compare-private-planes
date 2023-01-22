import cn from "classnames";
import global from "./styles/global.module.scss";
import styles from "./styles/styles.module.scss";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import SectionHeader from "./shared/SectionHeader";

ChartJS.register(ArcElement, Tooltip, Legend);

const KeyFacts = () => {
  const data = {
    datasets: [
      {
        label: "# of Votes",
        data: [12, 20],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };
  const facts = ["fact1", "fact2", "fact3", "fact4", "fact5"];

  return (
    <>
      <section className={cn(global.section)}>
        <SectionHeader title="Key Facts" />
        <main className={cn(styles.main_key_facts)}>
          <ul className={cn(styles.facts)}>
            {facts.map((fact) => {
              return <li key={fact}>fact</li>;
            })}
          </ul>
          <div className={cn(styles.img_container)}>
            <img src="https://via.placeholder.com/350" alt="" />
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
              data={data}
              options={{
                responsive: true,
              }}
            />
          </div>
          <div
            style={{
              width: "130px",
            }}
            className={cn(styles.chart_container)}
          >
            <span>Range</span>
            <Doughnut
              data={data}
              options={{
                responsive: true,
              }}
            />
          </div>
          <div
            style={{
              width: "130px",
            }}
            className={cn(styles.chart_container)}
          >
            <span>Cruise Speed</span>
            <Doughnut
              data={data}
              options={{
                responsive: true,
              }}
            />
          </div>
          <div
            style={{
              width: "130px",
            }}
            className={cn(styles.chart_container)}
          >
            <span>Cost per Hour</span>
            <Doughnut
              data={data}
              options={{
                responsive: true,
              }}
            />
          </div>
          <div
            style={{
              width: "130px",
            }}
            className={cn(styles.chart_container)}
          >
            <span>Fuel Burn</span>
            <Doughnut
              data={data}
              options={{
                responsive: true,
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default KeyFacts;
