import cn from "classnames";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import global from "./styles/global.module.scss";
import styles from "./styles/styles.module.scss";
import SectionHeader from "./shared/SectionHeader";

ChartJS.register(ArcElement, Tooltip, Legend);
const OwnershipCosts = () => {
  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
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
        borderWidth: 1,
      },
    ],
  };

  return (
    <section className={cn(global.section)}>
      <SectionHeader title="Ownership Costs" />
      <main>
        <header className={cn(styles.os_header)}>
          <h2>Estimated annual flight hours: 200</h2>
          <h2>Aircraft Annual Budget</h2>
          <h3 className={cn(styles.cost)}>$860,720</h3>
        </header>
        <div className={styles.pie_charts}>
          <div className={styles.pie_chart}>
            <div className={styles.pie_chart__header}>
              <h3>Annual Fixed Costs</h3>
              <h4 className={cn(styles.cost)}>$860,720</h4>
              <Pie
                data={data}
                options={{
                  responsive: true,
                }}
              />
            </div>
          </div>
          <div className={styles.pie_chart}>
            <div className={styles.pie_chart__header}>
              <h3>Variable Costs per Hour</h3>
              <h4 className={cn(styles.cost)}>$860,720</h4>
              <Pie
                data={data}
                options={{
                  responsive: true,
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default OwnershipCosts;
