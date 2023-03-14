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

const FleetFlightHours = ({ params }) => {
  const colsHeads = [
    "Registration Number",
    "Serial Number",
    "Owner Name",
    "Country",
    "Average Monthly Hours",
    "2021 Total Hours",
    "Hours Graph",
  ];
  const rowDataPlaceholder = ["---", "---"];

  const options = {
    responsive: true,
    events: [],
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
  const onToggle = (e, index) => {
    const elm = document.getElementsByClassName("chart" + index)[0];
    if (elm.style.display === "none") {
      e.target.innerText = "Hide";
      elm.style.display = "flex";
    } else {
      elm.style.display = "none";
      e.target.innerText = "View";
    }
  };
  return (
    <section className={cn(global.section, global.page_break)}>
      {/* <SectionHeader title="Fleet Flight Hour" /> */}
      <main>
          <iframe
            src="https://compareprivateplanes.com/tools/fleet-flight-hours/index"
            title="Fleet flight per hour"
            frameborder="0"
            className={cn(styles.ffh_frame)}
            scrolling="no"
          ></iframe>
      </main>
    </section>
  );
};

export default FleetFlightHours;
