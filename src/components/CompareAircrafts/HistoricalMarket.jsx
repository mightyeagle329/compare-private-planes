import React from "react";
import cn from "classnames";
import global from "../styles/global.module.scss";
import styles from "./styles/styles.module.scss";
import outerStyles from "../SingleAircraft/styles/styles.module.scss";

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
const HistoricalMarket = ({ params, currency, country, unit }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  const labels = ["1998", "1999", "2000", "2002", "2001", "2003"];

  const data = {
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
      <section className={cn(global.section, global.page_break)}>
        <SectionHeader title="Historical Market Activity" />
        <main>
          <div className={cn(outerStyles.plot_btn_container)}>
            <button className={cn(styles.button)}>Time Period to View</button>
          </div>
          <div className={cn(global.line_chart)}>
            <Line data={data} options={options} />
          </div>
        </main>
      </section>
    </>
  );
};
export default HistoricalMarket;
