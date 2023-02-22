import cn from "classnames";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Pie } from "react-chartjs-2";

import global from "../../styles/global.module.scss";
import styles from "../styles/styles.module.scss";
import SectionHeader from "../../shared/SectionHeader";
import { useState, useEffect } from "react";
import Axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);
const OwnershipCosts = ({ params, currency, country }) => {
  const [info, setInfo] = useState([]);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("usd");
  const [nbHours, setNbHours] = useState(0);
  const [annualBudget, setAnnualBudget] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);
  const newLegendClickHandler = function () {};

  useEffect(() => {
    Axios.get(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`
    ).then((res) => {
      setInfo(res.data[from]);
    });
  }, [from]);

  useEffect(() => {
    currency === "USD"
      ? setTo("usd")
      : currency === "GBP"
      ? setTo("gbp")
      : setTo("eur");
    setFrom("usd");
    setConversionRate(info[to]);
  }, [info, currency, to]);

  const maximumAnnualValue = Math.max(
    parseInt(params.NA_annual_captain) +
      parseInt(params.NA_annual_first_office) +
      parseInt(params.NA_annual_employee_benefits),
    params.NA_annual_crew_training,
    params.NA_annual_hangar,
    params.NA_annual_insurance_hull,
    params.NA_annual_insurance_liability,
    params.NA_annual_management,
    params.NA_annual_misc
  );

  const maximumVariableValue = Math.max(
    params.NA_hourly_fuel,
    params.NA_hourly_maintenance,
    params.NA_hourly_engine_overhaul,
    params.NA_hourly_ground_fees,
    params.NA_hourly_misc
  );

  const annualData = {
    labels: [
      "Crew Salary",
      "Crew Training",
      "Hangar",
      "Insurance",
      "Management",
      "Miscellaneous Fixed",
    ],
    datasets: [
      {
        data: [
          parseInt(params.NA_annual_captain) +
            parseInt(params.NA_annual_first_office) +
            parseInt(params.NA_annual_employee_benefits),
          params.NA_annual_crew_training,
          params.NA_annual_hangar,
          parseInt(params.NA_annual_insurance_hull) +
            parseInt(params.NA_annual_insurance_liability),
          params.NA_annual_management,
          params.NA_annual_misc,
        ],
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

  const variableData = {
    labels: [
      "Fuel Cost",
      "Maintenance",
      "Engine Overhaul",
      "Ground Fees",
      "Miscellaneous Variabme",
    ],
    datasets: [
      {
        data: [
          params.NA_hourly_fuel,
          params.NA_hourly_maintenance,
          params.NA_hourly_engine_overhaul,
          params.NA_hourly_ground_fees,
          params.NA_hourly_misc,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const onHoursChanged = (e) => {
    setNbHours(e.target.value);
    setAnnualBudget(
      currency !== "USD"
        ? (country === "North America"
            ? parseFloat(params.NA_annual_total)
            : country === "Europe"
            ? parseFloat(params.EU_annual_total)
            : country === "South America"
            ? parseFloat(params.SA_annual_total)
            : parseFloat(params.AS_annual_total) + parseFloat(e.target.value)) *
            conversionRate
        : (country === "North America"
            ? parseFloat(params.NA_annual_total)
            : country === "Europe"
            ? parseFloat(params.EU_annual_total)
            : country === "South America"
            ? parseFloat(params.SA_annual_total)
            : parseFloat(params.AS_annual_total) + parseFloat(e.target.value)) +
            parseFloat(e.target.value)
    );
    if (e.target.value === "") {
      setAnnualBudget(params.NA_annual_total);
    }
  };

  return (
    <section className={cn(global.section) + " " + global.page_break}>
      <SectionHeader title="Ownership Costs" />
      <main className={styles.ownership_main}>
        <header className={cn(styles.os_header)}>
          <h2 className={global.pdf_hidden}>
            Estimated annual flight hours:{" "}
            <div className={styles.form + " " + global.pdf_hidden}>
              <form className={styles.search} action="">
                <input
                  className={styles.input}
                  type="text"
                  value={nbHours}
                  onChange={(e) => onHoursChanged(e)}
                  name="nbHours"
                  placeholder="Number of hours"
                  required
                />
              </form>
            </div>
          </h2>
          <h2>Aircraft Annual Budget</h2>
          {currency !== "USD" ? (
            country === "North America" ? (
              <h3 className={cn(styles.cost)}>
                {(
                  (parseInt(params.NA_annual_total) +
                    parseInt(nbHours) * params.NA_hourly_total) *
                  conversionRate
                ).toFixed(2)}
              </h3>
            ) : country === "Europe" ? (
              <h3 className={cn(styles.cost)}>
                {(
                  (parseInt(params.EU_annual_total) +
                    parseInt(nbHours) * params.EU_hourly_total) *
                  conversionRate
                ).toFixed(2)}
              </h3>
            ) : country === "South America" ? (
              <h3 className={cn(styles.cost)}>
                {(
                  (parseInt(params.SA_annual_total) +
                    parseInt(nbHours) * params.SA_hourly_total) *
                  conversionRate
                ).toFixed(2)}
              </h3>
            ) : (
              <h3 className={cn(styles.cost)}>
                {(
                  (parseInt(params.AS_annual_total) +
                    parseInt(nbHours) * params.AS_hourly_total) *
                  conversionRate
                ).toFixed(2)}
              </h3>
            )
          ) : country === "North America" ? (
            <h3 className={cn(styles.cost)}>
              {(
                (parseInt(params.NA_annual_total) +
                  parseInt(nbHours) * params.NA_hourly_total) *
                conversionRate
              ).toFixed(2)}
            </h3>
          ) : country === "Europe" ? (
            <h3 className={cn(styles.cost)}>
              {(
                parseInt(params.EU_annual_total) +
                parseInt(nbHours) * params.EU_hourly_total
              ).toFixed(2)}
            </h3>
          ) : country === "South America" ? (
            <h3 className={cn(styles.cost)}>
              {(
                parseInt(params.SA_annual_total) +
                parseInt(nbHours) * params.SA_hourly_total
              ).toFixed(2)}
            </h3>
          ) : (
            <h3 className={cn(styles.cost)}>
              {(
                parseInt(params.AS_annual_total) +
                parseInt(nbHours) * params.AS_hourly_total
              ).toFixed(2)}
            </h3>
          )}
        </header>
        <div className={styles.pie_charts}>
          <div className={styles.pie_chart}>
            <div className={styles.pie_chart__header}>
              <h3>Annual Fixed Costs</h3>
              <p className={cn(styles.cost)}>
                {country === "North America" ? (
                  <span className={cn(styles.cost)}>
                    {currency !== "USD"
                      ? (params.NA_annual_total * conversionRate).toFixed(2)
                      : params.NA_annual_total.toFixed(2)}
                  </span>
                ) : country === "Europe" ? (
                  <span className={cn(styles.cost)}>
                    {currency !== "USD"
                      ? (params.EU_annual_total * conversionRate).toFixed(2)
                      : params.EU_annual_total.toFixed(2)}
                  </span>
                ) : country === "South America" ? (
                  <span className={cn(styles.cost)}>
                    {currency !== "USD"
                      ? (params.SA_annual_total * conversionRate).toFixed(2)
                      : params.SA_annual_total.toFixed(2)}
                  </span>
                ) : (
                  <span className={cn(styles.cost)}>
                    {currency !== "USD"
                      ? (params.AS_annual_total * conversionRate).toFixed(2)
                      : params.AS_annual_total.toFixed(2)}
                  </span>
                )}
              </p>
              <Pie
                data={annualData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "bottom",
                      onClick: newLegendClickHandler,
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className={styles.pie_chart}>
            <div className={styles.pie_chart__header}>
              <h3>Variable Cost per Hour</h3>
              <p className={cn(styles.cost)}>
                {country === "North America" ? (
                  <span className={cn(styles.cost)}>
                    {currency !== "USD"
                      ? (params.NA_hourly_total * conversionRate).toFixed(2)
                      : params.NA_hourly_total.toFixed(2)}
                  </span>
                ) : country === "Europe" ? (
                  <span className={cn(styles.cost)}>
                    {currency !== "USD"
                      ? (params.EU_hourly_total * conversionRate).toFixed(2)
                      : params.EU_hourly_total.toFixed(2)}
                  </span>
                ) : country === "South America" ? (
                  <span className={cn(styles.cost)}>
                    {currency !== "USD"
                      ? (params.SA_hourly_total * conversionRate).toFixed(2)
                      : params.SA_hourly_total.toFixed(2)}
                  </span>
                ) : (
                  <span className={cn(styles.cost)}>
                    {currency !== "USD"
                      ? (params.AS_hourly_total * conversionRate).toFixed(2)
                      : params.AS_hourly_total.toFixed(2)}
                  </span>
                )}
              </p>

              <Pie
                data={variableData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "bottom",
                      onClick: newLegendClickHandler,
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
        <div className={cn(styles.f_v_costs)}>
          <div className={cn(styles.costs_container)}>
            <h3>Annual Fixed Costs Breakdown</h3>
            <div className={cn(styles.costs)}>
              <div className={cn(styles.keys_values_container)}>
                <div className={styles.key_value_bar}>
                  <div className={cn(styles.key_value)}>
                    <span>Crew Salary</span>
                    <span>
                      {parseInt(params.NA_annual_captain) +
                        parseInt(params.NA_annual_first_office) +
                        parseInt(params.NA_annual_employee_benefits)}
                    </span>
                  </div>
                  <div className={cn(styles.bar)}>
                    <div
                      className={cn(styles.bar__fill1)}
                      style={{
                        width:
                          ((parseInt(params.NA_annual_captain) +
                            parseInt(params.NA_annual_first_office) +
                            parseInt(params.NA_annual_employee_benefits)) /
                            maximumAnnualValue) *
                          100,
                      }}
                    ></div>
                  </div>
                </div>
                <div className={styles.key_value_bar}>
                  <div className={cn(styles.key_value)}>
                    <span>Crew Training</span>
                    <span>{params.NA_annual_crew_training}</span>
                  </div>
                  <div className={cn(styles.bar)}>
                    <div
                      className={cn(styles.bar__fill2)}
                      style={{
                        width:
                          (params.NA_annual_crew_training /
                            maximumAnnualValue) *
                            100 +
                          "%",
                      }}
                    ></div>
                  </div>
                </div>
                <div className={styles.key_value_bar}>
                  <div className={cn(styles.key_value)}>
                    <span>Hangar</span>
                    <span>{params.NA_annual_hangar}</span>
                  </div>
                  <div className={cn(styles.bar)}>
                    <div
                      className={cn(styles.bar__fill3)}
                      style={{
                        width:
                          (params.NA_annual_hangar / maximumAnnualValue) * 100 +
                          "%",
                      }}
                    ></div>
                  </div>
                </div>{" "}
                <div className={styles.key_value_bar}>
                  <div className={cn(styles.key_value)}>
                    <span>Insurrance Hull</span>
                    <span>{params.NA_annual_insurance_hull}</span>
                  </div>
                  <div className={cn(styles.bar)}>
                    <div
                      className={cn(styles.bar__fill4)}
                      style={{
                        width:
                          (params.NA_annual_insurance_hull /
                            maximumAnnualValue) *
                            100 +
                          "%",
                      }}
                    ></div>
                  </div>
                </div>
                <div className={styles.key_value_bar}>
                  <div className={cn(styles.key_value)}>
                    <span>Insurrance Liability</span>
                    <span>{params.NA_annual_insurance_liability}</span>
                  </div>
                  <div className={cn(styles.bar)}>
                    <div
                      className={cn(styles.bar__fill5)}
                      style={{
                        width:
                          (params.NA_annual_insurance_liability /
                            maximumAnnualValue) *
                            100 +
                          "%",
                      }}
                    ></div>
                  </div>
                </div>
                <div className={styles.key_value_bar}>
                  <div className={cn(styles.key_value)}>
                    <span>Managment</span>
                    <span>{params.NA_annual_management}</span>
                  </div>
                  <div className={cn(styles.bar)}>
                    <div
                      className={cn(styles.bar__fill6)}
                      style={{
                        width:
                          (params.NA_annual_management / maximumAnnualValue) *
                            100 +
                          "%",
                      }}
                    ></div>
                  </div>
                </div>
                <div className={styles.key_value_bar}>
                  <div className={cn(styles.key_value)}>
                    <span>Misc Fixed</span>
                    <span>{params.NA_annual_misc}</span>
                  </div>
                  <div className={cn(styles.bar)}>
                    <div
                      className={cn(styles.bar__fill7)}
                      style={{
                        width:
                          (params.NA_annual_misc / maximumAnnualValue) * 100 +
                          "%",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={cn(styles.costs_container)}>
            <h3>Variable Cost Breakdown (per flight hour)</h3>
            <div className={cn(styles.costs)}>
              <div className={cn(styles.keys_values_container)}>
                <div className={styles.key_value_bar}>
                  <div className={cn(styles.key_value)}>
                    <span>Fuel Cost</span>
                    <span>{params.NA_hourly_fuel}</span>
                  </div>
                  <div className={cn(styles.bar)}>
                    <div
                      className={cn(styles.bar__fill1)}
                      style={{
                        width:
                          (params.NA_hourly_fuel / maximumVariableValue) * 100 +
                          "%",
                      }}
                    ></div>
                  </div>
                </div>
                <div className={styles.key_value_bar}>
                  <div className={cn(styles.key_value)}>
                    <span>Maintenance</span>
                    <span>{params.NA_hourly_maintenance}</span>
                  </div>
                  <div className={cn(styles.bar)}>
                    <div
                      className={cn(styles.bar__fill2)}
                      style={{
                        width:
                          (params.NA_hourly_maintenance /
                            maximumVariableValue) *
                            100 +
                          "%",
                      }}
                    ></div>
                  </div>
                </div>
                <div className={styles.key_value_bar}>
                  <div className={cn(styles.key_value)}>
                    <span>Engine Overhaul</span>
                    <span>{params.NA_hourly_engine_overhaul}</span>
                  </div>
                  <div className={cn(styles.bar)}>
                    <div
                      className={cn(styles.bar__fill3)}
                      style={{
                        width:
                          (params.NA_hourly_engine_overhaul /
                            maximumVariableValue) *
                            100 +
                          "%",
                      }}
                    ></div>
                  </div>
                </div>
                <div className={styles.key_value_bar}>
                  <div className={cn(styles.key_value)}>
                    <span>Ground Fees</span>
                    <span>{params.NA_hourly_ground_fees}</span>
                  </div>
                  <div className={cn(styles.bar)}>
                    <div
                      className={cn(styles.bar__fill4)}
                      style={{
                        width:
                          (params.NA_hourly_ground_fees /
                            maximumVariableValue) *
                            100 +
                          "%",
                      }}
                    ></div>
                  </div>
                </div>
                <div className={styles.key_value_bar}>
                  <div className={cn(styles.key_value)}>
                    <span>Misc Variable</span>
                    <span>{params.NA_hourly_misc}</span>
                  </div>
                  <div className={cn(styles.bar)}>
                    <div
                      className={cn(styles.bar__fill6)}
                      style={{
                        width:
                          (params.NA_hourly_misc / maximumVariableValue) * 100 +
                          "%",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default OwnershipCosts;
