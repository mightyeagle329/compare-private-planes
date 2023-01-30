import cn from "classnames";
import global from "../styles/global.module.scss";
import styles from "./styles/styles.module.scss";
import SectionHeader from "../shared/SectionHeader";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const HistoricalMarket = ({ params }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  const labels = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"];

  const data = {
    labels,
    datasets: [
      {
        label: "Current Values",
        data: labels.map(() => faker.datatype.number({ min: 11.0, max: 20.0 })),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <section className={cn(global.section)}>
      <SectionHeader title="Historical Market Activity" />
      <main>
        <div className={cn(styles.plot_btn_container)}>
          <button className={cn(styles.button)}>Time Period to View</button>
        </div>
        <div className={cn(styles.line_chart)}>
          <Line data={data} options={options} />
        </div>
      </main>
    </section>
  );
};

export default HistoricalMarket;
