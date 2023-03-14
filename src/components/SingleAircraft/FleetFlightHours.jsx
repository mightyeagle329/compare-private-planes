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
    events:[],
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
    <section className={cn(global.section,global.page_break)}>
      <SectionHeader title="Fleet Flight Hour" />
      <main>
        <div className={cn(global.details_table)}>
          <div className={cn(global.column)}>
            <div className={cn(global.rows)}>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Average Hours per Aircraft per Year:
                </span>
                <span>200</span>
              </div>
            </div>
          </div>
          <span className={cn(global.seperator)}></span>
          <div className={cn(global.column)}>
            <div className={cn(global.rows)}>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Total Fleet Hours This Year:
                </span>
                <span>200</span>
              </div>
            </div>
          </div>
        </div>
        {/* -------------------- */}

        <div className={cn(global.line_chart)}>
          <Line data={data} options={options} />
        </div>
        {/* ------------------- */}
        <div className={cn(styles.aircraft_table, global.pdf_hidden)}>
          <div className={cn(global.flexify, styles.aircraft_table_head)}>
            {colsHeads.map((label, index) => {
              return (
                <span className={cn(global._padding)} key={index}>
                  {label}
                </span>
              );
            })}
          </div>
          <div className={cn(global.flexify, styles.aircraft_table_body)}>
            {rowDataPlaceholder.map((elm, index) => {
              return (
                <div className={cn(styles.aircraft_table_row)} key={index}>
                  <div
                    className={cn(
                      global.flexify,
                      styles.aircraft_table_row_elm
                    )}
                  >
                    <span className={cn(global._padding)}>{elm}</span>
                    <span className={cn(global._padding)}>{elm}</span>
                    <span className={cn(global._padding)}>{elm}</span>
                    <span className={cn(global._padding)}>{elm}</span>
                    <span className={cn(global._padding)}>{elm}</span>
                    <span className={cn(global._padding)}>{elm}</span>
                    <button
                      onClick={(e) => onToggle(e, index)}
                      className={cn(styles.toggle_btn)}
                    >
                      View
                    </button>
                  </div>
                  <div className={cn(styles.hours_graph) + " chart" + index}>
                    <Line data={data} options={options} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </section>
  );
};

export default FleetFlightHours;
