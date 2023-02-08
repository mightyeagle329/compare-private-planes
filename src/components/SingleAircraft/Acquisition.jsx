import cn from "classnames";
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
import { Line } from "react-chartjs-2";

import global from "../styles/global.module.scss";
import styles from "./styles/styles.module.scss";
import SectionHeader from "../shared/SectionHeader";
import Dropdown from "../common/Dropdown";
import {
  AIRFRAME_OPTIONS,
  FUTURE_OPTIONS,
} from "../../utils/constants/app-constants";
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const Acquisition = ({ params, acquisition }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  const keys = Object.keys(acquisition);
  const values = Object.values(acquisition);
  const labels = keys;
  const [yearManufacture, setYearManufacture] = useState(keys[0]);
  const [airframe, setAirframe] = useState(AIRFRAME_OPTIONS[0]);
  const [estimatedFutureValue, setestimatedFutureValue] = useState(
    FUTURE_OPTIONS[0]
  );
  const [futureValue, setfutureValue] = useState([]);
  const [hourAdjusted, setHourAdjusted] = useState([]);
  const [year, setYear] = useState(keys[0]);
  const [i, seti] = useState(0);
  const [futureCounter, setFutureCounter] = useState(0);

  for (var k = 0; k < values.length; k++) {
    futureValue[k] =
      values[k] *
      Math.pow(
        100 - parseFloat(params.depreication_rate) / 100,
        parseFloat(estimatedFutureValue)
      );
    futureValue[k].toFixed(2);
  }

  for (var k = 0; k < keys.length; k++) {
    let real = (2022 - keys[k]) * 400;
    if (parseFloat(airframe) - real > 0) {
      for (let i = 0; i < parseFloat(airframe) - real; i++) {
        hourAdjusted[i] *= 0.99999;
      }
    } else {
      for (let i = 0; i < Math.abs(parseFloat(airframe) - real); i++) {
        hourAdjusted[i] *= 1.00001;
      }
    }
  }

  const onYearChanged = (val) => {
    setYearManufacture(val);
    for (var c = 0; c < values.length; c++) {
      if (keys[c] === val) {
        seti(c);
      }
    }
  };

  const onAirframeChanged = (e) => {
    setAirframe(e.target.value);
  };

  const onestimatedFutureValueChanged = (val) => {
    setestimatedFutureValue(val);
    for (var c = 0; c < FUTURE_OPTIONS.length; c++) {
      if (FUTURE_OPTIONS[c] === val) {
        setFutureCounter(c);
      }
    }
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Current Values",
        data: values,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Hour Adjusted",
        data: values,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Future Values",
        data: futureValue,
        borderColor: "rgb(153, 82, 155)",
        backgroundColor: "rgba(153, 82, 155, 0.5)",
      },
    ],
  };

  return (
    <section className={cn(global.section)}>
      <SectionHeader title="Aquisition Costs" />
      <main>
        <div className={cn(global.details_table)}>
          <div className={cn(global.column)}>
            <div className={cn(global.rows)}>
              <div className={cn(global.row)}>
                <span
                  className={cn(
                    global.key,
                    global.key_realign,
                    global.key,
                    global.key_realign_realign
                  )}
                >
                  New Purchase Price
                </span>

                <span>{params.new_purchase}</span>
              </div>
              <div
                className={
                  cn(global.row, global.pdf_hidden) + " " + global.pdf_hidden
                }
              >
                <span
                  className={cn(
                    global.key,
                    global.key_realign,
                    global.key,
                    global.key_realign_realign
                  )}
                >
                  Year of Manufacture:
                </span>
                <div className={styles.sorting}>
                  <div className={styles.dropdown + " " + global.pdf_hidden}>
                    <Dropdown
                      className={styles.dropdown}
                      value={yearManufacture}
                      setValue={(value) => onYearChanged(value)}
                      options={keys}
                    />
                  </div>
                </div>
              </div>
              <div className={cn(global.row) + " " + global.pdf_hidden}>
                <span
                  className={cn(
                    global.key,
                    global.key_realign,
                    global.key,
                    global.key_realign_realign
                  )}
                >
                  Airframe Hours:
                </span>
                <div className={styles.sorting}>
                  <div className={styles.dropdown}>
                    <form className={styles.search} action="">
                      <input
                        className={styles.input}
                        type="text"
                        value={airframe}
                        onChange={(e) => onAirframeChanged(e)}
                        name="nbHours"
                        placeholder="Airframe hours"
                        required
                      />
                    </form>
                  </div>
                </div>
              </div>
              <div className={cn(global.row, global.pdf_hidden)}>
                <span
                  className={cn(
                    global.key,
                    global.key_realign,
                    global.key,
                    global.key_realign_realign
                  )}
                >
                  Future Value:
                </span>
                <div className={styles.sorting}>
                  <div className={styles.dropdown + " " + global.pdf_hidden}>
                    <Dropdown
                      className={styles.dropdown}
                      value={estimatedFutureValue}
                      setValue={(value) => onestimatedFutureValueChanged(value)}
                      options={FUTURE_OPTIONS}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span className={cn(global.seperator)}></span>
          <div className={cn(global.column)}>
            <div className={cn(global.rows)}>
              <div className={cn(global.row)}>
                <span
                  className={cn(
                    global.key,
                    global.key_realign,
                    global.key,
                    global.key_realign_realign
                  )}
                >
                  Depreciation Rate
                </span>
                <span>-{params.depreication_rate}%</span>
              </div>
              <div className={cn(global.row)}>
                <span
                  className={cn(
                    global.key,
                    global.key_realign,
                    global.key,
                    global.key_realign_realign
                  )}
                >
                  Current Market Value
                </span>
                <span>{values[i]}</span>
              </div>
              <div className={cn(global.row)}>
                <span
                  className={cn(
                    global.key,
                    global.key_realign,
                    global.key,
                    global.key_realign_realign
                  )}
                >
                  Adjusted Value
                </span>
                <span>{params.adjusted_value}</span>
              </div>
              <div className={cn(global.row)}>
                <span
                  className={cn(
                    global.key,
                    global.key_realign,
                    global.key,
                    global.key_realign_realign
                  )}
                >
                  Future Value
                </span>
                <span>{futureValue[futureCounter]}</span>
              </div>
            </div>
          </div>
        </div>
        {/* --------------- */}

        <div className={cn(global.line_chart)}>
          <Line data={data} options={options} />
        </div>
        <table className={cn(global.table)}>
          <thead>
            <tr>
              <th className={cn(global.th)}>Year</th>
              <th className={cn(global.th)}>Current Value</th>
              <th className={cn(global.th)}>Hour Adjusted</th>
              <th className={cn(global.th)}>Future Value</th>
            </tr>
          </thead>
          <tbody>
            {labels.map((label, index) => (
              <tr key={index}>
                <td className={cn(global.td)}>{label}</td>
                <td className={cn(global.td)}>
                  {data.datasets[0].data[index]}
                </td>
                <td className={cn(global.td)}>
                  {data.datasets[1].data[index]}
                </td>
                <td className={cn(global.td)}>
                  {data.datasets[2].data[index]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </section>
  );
};

export default Acquisition;
