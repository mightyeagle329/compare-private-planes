import cn from "classnames";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import global from "../../styles/global.module.scss";
import styles from "../styles/styles.module.scss";
import SectionHeader from "../../shared/SectionHeader";
import { useState, useEffect } from "react";
import Axios from "axios";
import numeral from "numeral";

ChartJS.register(ArcElement, Tooltip, Legend);
const OwnershipCosts = ({ params, currency, country }) => {
  const [info, setInfo] = useState([]);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("usd");
  const [nbHours, setNbHours] = useState(0);
  const [annualBudget, setAnnualBudget] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);

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
    parseInt(params.NA_annual_crew_training),
    parseInt(params.NA_annual_hangar),
    parseInt(
      params.NA_annual_insurance_liability + params.NA_annual_insurance_hull
    ),
    parseInt(params.NA_annual_management),
    parseInt(params.NA_annual_deprecation),
    parseInt(params.NA_annual_misc)
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
      "Deprication",
      "Miscellaneous Fixed",
    ],
    datasets: [
      {
        data:
          currency === "USD"
            ? country === "North America"
              ? [
                  Math.round(
                    params.NA_annual_captain +
                      params.NA_annual_first_office +
                      params.NA_annual_employee_benefits
                  ),
                  Math.round(params.NA_annual_crew_training),
                  Math.round(params.NA_annual_hangar),
                  Math.round(
                    params.NA_annual_insurance_hull +
                      params.NA_annual_insurance_liability
                  ),
                  Math.round(params.NA_annual_management),
                  Math.round(params.NA_annual_deprecation),
                  Math.round(params.NA_annual_misc),
                ]
              : country === "South America"
              ? [
                  Math.round(
                    params.SA_annual_captain +
                      params.SA_annual_first_office +
                      params.SA_annual_employee_benefits
                  ),
                  Math.round(params.SA_annual_crew_training),
                  Math.round(params.SA_annual_hangar),
                  Math.round(
                    params.SA_annual_insurance_hull +
                      params.SA_annual_insurance_liability
                  ),
                  Math.round(params.SA_annual_management),
                  Math.round(params.SA_annual_deprecation),
                  Math.round(params.SA_annual_misc),
                ]
              : country === "Europe"
              ? [
                  Math.round(
                    params.EU_annual_captain +
                      params.EU_annual_first_office +
                      params.EU_annual_employee_benefits
                  ),
                  Math.round(params.EU_annual_crew_training),
                  Math.round(params.EU_annual_hangar),
                  Math.round(
                    params.EU_annual_insurance_hull +
                      params.EU_annual_insurance_liability
                  ),
                  Math.round(params.EU_annual_management),
                  Math.round(params.EU_annual_deprecation),
                  Math.round(params.EU_annual_misc),
                ]
              : [
                  Math.round(
                    params.AS_annual_captain +
                      params.AS_annual_first_office +
                      params.AS_annual_employee_benefits
                  ),
                  Math.round(params.AS_annual_crew_training),
                  Math.round(params.AS_annual_hangar),
                  Math.round(
                    params.AS_annual_insurance_hull +
                      params.AS_annual_insurance_liability
                  ),
                  Math.round(params.AS_annual_management),
                  Math.round(params.AS_annual_deprecation),
                  Math.round(params.AS_annual_misc),
                ]
            : country === "North America"
            ? [
                Math.round(
                  conversionRate *
                    (params.NA_annual_captain +
                      params.NA_annual_first_office +
                      params.NA_annual_employee_benefits)
                ),
                Math.round(params.NA_annual_crew_training * conversionRate),
                Math.round(params.NA_annual_hangar * conversionRate),
                Math.round(
                  (params.NA_annual_insurance_hull +
                    params.NA_annual_insurance_liability) *
                    conversionRate
                ),
                Math.round(params.NA_annual_management * conversionRate),
                Math.round(params.NA_annual_deprecation * conversionRate),
                Math.round(params.NA_annual_misc * conversionRate),
              ]
            : country === "South America"
            ? [
                Math.round(
                  conversionRate *
                    (params.SA_annual_captain +
                      params.SA_annual_first_office +
                      params.SA_annual_employee_benefits)
                ),
                Math.round(params.SA_annual_crew_training * conversionRate),
                Math.round(params.SA_annual_hangar * conversionRate),
                Math.round(
                  conversionRate *
                    (params.SA_annual_insurance_hull +
                      params.SA_annual_insurance_liability)
                ),
                Math.round(params.SA_annual_management * conversionRate),
                Math.round(params.SA_annual_deprecation * conversionRate),
                Math.round(params.SA_annual_misc * conversionRate),
              ]
            : country === "Europe"
            ? [
                Math.round(
                  conversionRate *
                    (params.EU_annual_captain +
                      params.EU_annual_first_office +
                      params.EU_annual_employee_benefits)
                ),
                Math.round(params.EU_annual_crew_training * conversionRate),
                Math.round(params.EU_annual_hangar * conversionRate),
                Math.round(
                  conversionRate *
                    (params.EU_annual_insurance_hull +
                      params.EU_annual_insurance_liability)
                ),
                Math.round(params.EU_annual_management * conversionRate),
                Math.round(params.EU_annual_deprecation * conversionRate),
                Math.round(params.EU_annual_misc * conversionRate),
              ]
            : [
                Math.round(
                  conversionRate *
                    (params.AS_annual_captain +
                      params.AS_annual_first_office +
                      params.AS_annual_employee_benefits)
                ),
                Math.round(params.AS_annual_crew_training * conversionRate),
                Math.round(params.AS_annual_hangar * conversionRate),
                Math.round(
                  conversionRate *
                    (params.AS_annual_insurance_hull +
                      params.AS_annual_insurance_liability)
                ),
                Math.round(params.AS_annual_management * conversionRate),
                Math.round(params.AS_annual_deprecation * conversionRate),
                Math.round(params.AS_annual_misc * conversionRate),
              ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgb(199, 55, 158,0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgb(199, 55, 158)",
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
      "Miscellaneous Variable",
    ],
    datasets: [
      {
        data:
          currency === "USD"
            ? country === "North America"
              ? [
                  params.NA_hourly_fuel,
                  params.NA_hourly_maintenance,
                  params.NA_hourly_engine_overhaul,
                  params.NA_hourly_ground_fees,
                  params.NA_hourly_misc,
                ]
              : country === "South America"
              ? [
                  params.SA_hourly_fuel,
                  params.SA_hourly_maintenance,
                  params.SA_hourly_engine_overhaul,
                  params.SA_hourly_ground_fees,
                  params.SA_hourly_misc,
                ]
              : country === "Europe"
              ? [
                  params.EU_hourly_fuel,
                  params.EU_hourly_maintenance,
                  params.EU_hourly_engine_overhaul,
                  params.EU_hourly_ground_fees,
                  params.EU_hourly_misc,
                ]
              : [
                  params.AS_hourly_fuel,
                  params.AS_hourly_maintenance,
                  params.AS_hourly_engine_overhaul,
                  params.AS_hourly_ground_fees,
                  params.AS_hourly_misc,
                ]
            : country === "North America"
            ? [
                params.NA_hourly_fuel * conversionRate,
                params.NA_hourly_maintenance * conversionRate,
                params.NA_hourly_engine_overhaul * conversionRate,
                params.NA_hourly_ground_fees * conversionRate,
                params.NA_hourly_misc * conversionRate,
              ]
            : country === "South America"
            ? [
                params.SA_hourly_fuel * conversionRate,
                params.SA_hourly_maintenance * conversionRate,
                params.SA_hourly_engine_overhaul * conversionRate,
                params.SA_hourly_ground_fees * conversionRate,
                params.SA_hourly_misc * conversionRate,
              ]
            : country === "Europe"
            ? [
                params.EU_hourly_fuel * conversionRate,
                params.EU_hourly_maintenance * conversionRate,
                params.EU_hourly_engine_overhaul * conversionRate,
                params.EU_hourly_ground_fees * conversionRate,
                params.EU_hourly_misc * conversionRate,
              ]
            : [
                params.AS_hourly_fuel * conversionRate,
                params.AS_hourly_maintenance * conversionRate,
                params.AS_hourly_engine_overhaul * conversionRate,
                params.AS_hourly_ground_fees * conversionRate,
                params.AS_hourly_misc * conversionRate,
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
        ? ((country === "North America"
            ? parseFloat(params.NA_annual_total)
            : country === "Europe"
            ? parseFloat(params.EU_annual_total)
            : country === "South America"
            ? parseFloat(params.SA_annual_total)
            : parseFloat(params.AS_annual_total)) +
            parseFloat(e.target.value)) *
            conversionRate
        : (country === "North America"
            ? parseFloat(params.NA_annual_total)
            : country === "Europe"
            ? parseFloat(params.EU_annual_total)
            : country === "South America"
            ? parseFloat(params.SA_annual_total)
            : parseFloat(params.AS_annual_total)) + parseFloat(e.target.value)
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
              <form
                className={styles.search}
                action=""
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
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
          {currency === "GBP" ? (
            country === "North America" ? (
              <h3 className={cn(styles.cost)}>
                £
                {numeral(
                  (parseInt(params.NA_annual_total) +
                    parseInt(nbHours) * params.NA_hourly_total) *
                    conversionRate
                ).format("0,0")}
              </h3>
            ) : country === "Europe" ? (
              <h3 className={cn(styles.cost)}>
                £
                {numeral(
                  (parseInt(params.EU_annual_total) +
                    parseInt(nbHours) * params.EU_hourly_total) *
                    conversionRate
                ).format("0,0")}
              </h3>
            ) : country === "South America" ? (
              <h3 className={cn(styles.cost)}>
                £
                {numeral(
                  (parseInt(params.SA_annual_total) +
                    parseInt(nbHours) * params.SA_hourly_total) *
                    conversionRate
                ).format("0,0")}
              </h3>
            ) : (
              <h3 className={cn(styles.cost)}>
                £{" "}
                {numeral(
                  (parseInt(params.AS_annual_total) +
                    parseInt(nbHours) * params.AS_hourly_total) *
                    conversionRate
                ).format("0,0")}
              </h3>
            )
          ) : currency === "USD" ? (
            country === "North America" ? (
              <h3 className={cn(styles.cost)}>
                $
                {numeral(
                  (parseInt(params.NA_annual_total) +
                    parseInt(nbHours) * params.NA_hourly_total) *
                    conversionRate
                ).format("0,0")}
              </h3>
            ) : country === "Europe" ? (
              <h3 className={cn(styles.cost)}>
                ${" "}
                {numeral(
                  parseInt(params.EU_annual_total) +
                    parseInt(nbHours) * params.EU_hourly_total
                ).format("0,0")}
              </h3>
            ) : country === "South America" ? (
              <h3 className={cn(styles.cost)}>
                ${" "}
                {numeral(
                  parseInt(params.SA_annual_total) +
                    parseInt(nbHours) * params.SA_hourly_total
                ).format("0,0")}
              </h3>
            ) : (
              <h3 className={cn(styles.cost)}>
                ${" "}
                {numeral(
                  parseInt(params.AS_annual_total) +
                    parseInt(nbHours) * params.AS_hourly_total
                ).format("0,0")}
              </h3>
            )
          ) : country === "North America" ? (
            <h3 className={cn(styles.cost)}>
              €
              {numeral(
                (parseInt(params.NA_annual_total) +
                  parseInt(nbHours) * params.NA_hourly_total) *
                  conversionRate
              ).format("0,0")}
            </h3>
          ) : country === "Europe" ? (
            <h3 className={cn(styles.cost)}>
              €
              {numeral(
                (parseInt(params.EU_annual_total) +
                  parseInt(nbHours) * params.EU_hourly_total) *
                  conversionRate
              ).format("0,0")}
            </h3>
          ) : country === "South America" ? (
            <h3 className={cn(styles.cost)}>
              €
              {numeral(
                (parseInt(params.SA_annual_total) +
                  parseInt(nbHours) * params.SA_hourly_total) *
                  conversionRate
              ).format("0,0")}
            </h3>
          ) : (
            <h3 className={cn(styles.cost)}>
              €{" "}
              {numeral(
                (parseInt(params.AS_annual_total) +
                  parseInt(nbHours) * params.AS_hourly_total) *
                  conversionRate
              ).format("0,0")}
            </h3>
          )}
        </header>
        <div className={styles.pie_charts}>
          <div className={styles.pie_chart}>
            <div className={styles.pie_chart__header + " pie_containing_block"}>
              <h3>Annual Fixed Costs</h3>
              <p className={cn(styles.cost)}>
                {country === "North America" ? (
                  params.NA_annual_total === 0 ? (
                    "-"
                  ) : (
                    <span className={cn(styles.cost)}>
                      {currency === "GBP"
                        ? "£" +
                          numeral(
                            params.NA_annual_total * conversionRate
                          ).format("0,0")
                        : currency === "EUR"
                        ? "€" +
                          numeral(
                            params.NA_annual_total * conversionRate
                          ).format("0,0")
                        : "$" + numeral(params.NA_annual_total).format("0,0")}
                    </span>
                  )
                ) : country === "Europe" ? (
                  params.EU_annual_total === 0 ? (
                    "-"
                  ) : (
                    <span className={cn(styles.cost)}>
                      {currency === "GBP"
                        ? "£" +
                          numeral(
                            params.EU_annual_total * conversionRate
                          ).format("0,0")
                        : currency === "EUR"
                        ? "€" +
                          numeral(
                            params.EU_annual_total * conversionRate
                          ).format("0,0")
                        : "$" + numeral(params.EU_annual_total).format("0,0")}
                    </span>
                  )
                ) : country === "South America" ? (
                  params.SA_annual_total === 0 ? (
                    "-"
                  ) : (
                    <span className={cn(styles.cost)}>
                      {currency === "GBP"
                        ? "£" +
                          numeral(
                            params.SA_annual_total * conversionRate
                          ).format("0,0")
                        : currency === "EUR"
                        ? "€" +
                          numeral(
                            params.SA_annual_total * conversionRate
                          ).format("0,0")
                        : "$" + numeral(params.SA_annual_total).format("0,0")}
                    </span>
                  )
                ) : params.AS_annual_total === 0 ? (
                  "-"
                ) : (
                  <span className={cn(styles.cost)}>
                    {currency === "GBP"
                      ? "£" +
                        numeral(params.AS_annual_total * conversionRate).format(
                          "0,0"
                        )
                      : currency === "EUR"
                      ? "€" +
                        numeral(params.AS_annual_total * conversionRate).format(
                          "0,0"
                        )
                      : "$" + numeral(params.AS_annual_total).format("0,0")}
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
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className={styles.pie_chart}>
            <div className={styles.pie_chart__header + " pie_containing_block"}>
              <h3>Variable Cost per Hour</h3>
              <p className={cn(styles.cost)}>
                {country === "North America" ? (
                  <span className={cn(styles.cost)}>
                    {currency === "GBP"
                      ? "£" +
                        numeral(params.NA_hourly_total * conversionRate).format(
                          "0,0"
                        )
                      : currency === "EUR"
                      ? "€" +
                        numeral(params.NA_hourly_total * conversionRate).format(
                          "0,0"
                        )
                      : "$" + numeral(params.NA_hourly_total).format("0,0")}
                  </span>
                ) : country === "Europe" ? (
                  <span className={cn(styles.cost)}>
                    {currency === "GBP"
                      ? "£" +
                        numeral(params.EU_hourly_total * conversionRate).format(
                          "0,0"
                        )
                      : currency === "EUR"
                      ? "€" +
                        numeral(params.EU_hourly_total * conversionRate).format(
                          "0,0"
                        )
                      : "$" + numeral(params.EU_hourly_total).format("0,0")}
                  </span>
                ) : country === "South America" ? (
                  <span className={cn(styles.cost)}>
                    {currency === "GBP"
                      ? "£" +
                        numeral(params.SA_hourly_total * conversionRate).format(
                          "0,0"
                        )
                      : currency === "EUR"
                      ? "€" +
                        numeral(params.SA_hourly_total * conversionRate).format(
                          "0,0"
                        )
                      : "$" + numeral(params.SA_hourly_total).format("0,0")}
                  </span>
                ) : (
                  <span className={cn(styles.cost)}>
                    {currency === "GBP"
                      ? "£" +
                        numeral(params.AS_hourly_total * conversionRate).format(
                          "0,0"
                        )
                      : currency === "EUR"
                      ? "€" +
                        numeral(params.AS_hourly_total * conversionRate).format(
                          "0,0"
                        )
                      : "$" + numeral(params.AS_hourly_total).format("0,0")}
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
                      {currency === "GBP"
                        ? country === "North America"
                          ? "£" +
                            numeral(
                              (parseInt(params.NA_annual_captain) +
                                parseInt(params.NA_annual_first_office) +
                                parseInt(params.NA_annual_employee_benefits)) *
                                conversionRate
                            ).format("0,0")
                          : country === "Europe"
                          ? "£" +
                            numeral(
                              (parseInt(params.EU_annual_captain) +
                                parseInt(params.EU_annual_first_office) +
                                parseInt(params.EU_annual_employee_benefits)) *
                                conversionRate
                            ).format("0,0")
                          : country === "South America"
                          ? "£" +
                            numeral(
                              (parseInt(params.SA_annual_captain) +
                                parseInt(params.SA_annual_first_office) +
                                parseInt(params.SA_annual_employee_benefits)) *
                                conversionRate
                            ).format("0,0")
                          : "£" +
                            numeral(
                              (parseInt(params.AS_annual_captain) +
                                parseInt(params.AS_annual_first_office) +
                                parseInt(params.AS_annual_employee_benefits)) *
                                conversionRate
                            ).format("0,0")
                        : currency === "EUR"
                        ? country === "North America"
                          ? "€" +
                            numeral(
                              (parseInt(params.NA_annual_captain) +
                                parseInt(params.NA_annual_first_office) +
                                parseInt(params.NA_annual_employee_benefits)) *
                                conversionRate
                            ).format("0,0")
                          : country === "Europe"
                          ? "€" +
                            numeral(
                              (parseInt(params.EU_annual_captain) +
                                parseInt(params.EU_annual_first_office) +
                                parseInt(params.EU_annual_employee_benefits)) *
                                conversionRate
                            ).format("0,0")
                          : country === "South America"
                          ? "€" +
                            numeral(
                              (parseInt(params.SA_annual_captain) +
                                parseInt(params.SA_annual_first_office) +
                                parseInt(params.SA_annual_employee_benefits)) *
                                conversionRate
                            ).format("0,0")
                          : "€" +
                            numeral(
                              (parseInt(params.AS_annual_captain) +
                                parseInt(params.AS_annual_first_office) +
                                parseInt(params.AS_annual_employee_benefits)) *
                                conversionRate
                            ).format("0,0")
                        : country === "North America"
                        ? "$" +
                          numeral(
                            parseInt(params.NA_annual_captain) +
                              parseInt(params.NA_annual_first_office) +
                              parseInt(params.NA_annual_employee_benefits)
                          ).format("0,0")
                        : country === "Europe"
                        ? "$" +
                          numeral(
                            parseInt(params.EU_annual_captain) +
                              parseInt(params.EU_annual_first_office) +
                              parseInt(params.EU_annual_employee_benefits)
                          ).format("0,0")
                        : country === "South America"
                        ? "$" +
                          numeral(
                            parseInt(params.SA_annual_captain) +
                              parseInt(params.SA_annual_first_office) +
                              parseInt(params.SA_annual_employee_benefits)
                          ).format("0,0")
                        : "$" +
                          numeral(
                            parseInt(params.AS_annual_captain) +
                              parseInt(params.AS_annual_first_office) +
                              parseInt(params.AS_annual_employee_benefits)
                          ).format("0,0")}
                    </span>
                  </div>
                  <div className={cn(styles.bar)}>
                    <div
                      className={cn(styles.bar__fill1)}
                      style={{
                        width:
                          !isNaN(
                            (parseInt(params.NA_annual_captain) +
                              parseInt(params.NA_annual_first_office) +
                              parseInt(params.NA_annual_employee_benefits)) /
                              maximumAnnualValue
                          ) *
                            100 +
                          "%",
                      }}
                    ></div>
                  </div>
                </div>
                <div className={styles.key_value_bar}>
                  <div className={cn(styles.key_value)}>
                    <span>Crew Training</span>
                    <span>
                      {currency === "USD"
                        ? country === "North America"
                          ? "$" +
                            numeral(params.NA_annual_crew_training).format(
                              "0,0"
                            )
                          : country === "South America"
                          ? "$" +
                            numeral(params.SA_annual_crew_training).format(
                              "0,0"
                            )
                          : country === "Europe"
                          ? "$" +
                            numeral(params.EU_annual_crew_training).format(
                              "0,0"
                            )
                          : "$" +
                            numeral(params.AS_annual_crew_training).format(
                              "0,0"
                            )
                        : currency === "GBP"
                        ? country === "North America"
                          ? "£" +
                            numeral(
                              params.NA_annual_crew_training * conversionRate
                            ).format("0,0")
                          : country === "South America"
                          ? "£" +
                            numeral(
                              params.SA_annual_crew_training * conversionRate
                            ).format("0,0")
                          : country === "Europe"
                          ? "£" +
                            numeral(
                              params.EU_annual_crew_training * conversionRate
                            ).format("0,0")
                          : "£" +
                            numeral(
                              params.AS_annual_crew_training * conversionRate
                            ).format("0,0")
                        : country === "North America"
                        ? "€" +
                          numeral(
                            params.NA_annual_crew_training * conversionRate
                          ).format("0,0")
                        : country === "South America"
                        ? "€" +
                          numeral(
                            params.SA_annual_crew_training * conversionRate
                          ).format("0,0")
                        : country === "Europe"
                        ? "€" +
                          numeral(
                            params.EU_annual_crew_training * conversionRate
                          ).format("0,0")
                        : "€" +
                          numeral(
                            params.AS_annual_crew_training * conversionRate
                          ).format("0,0")}
                    </span>
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
                    <span>
                      {currency === "USD"
                        ? country === "North America"
                          ? "$" + numeral(params.NA_annual_hangar).format("0,0")
                          : country === "South America"
                          ? "$" + numeral(params.SA_annual_hangar).format("0,0")
                          : country === "Europe"
                          ? "$" + numeral(params.EU_annual_hangar).format("0,0")
                          : "$" + numeral(params.AS_annual_hangar).format("0,0")
                        : currency === "GBP"
                        ? country === "North America"
                          ? "£" +
                            numeral(
                              params.NA_annual_hangar * conversionRate
                            ).format("0,0")
                          : country === "South America"
                          ? "£" +
                            numeral(
                              params.SA_annual_hangar * conversionRate
                            ).format("0,0")
                          : country === "Europe"
                          ? "£" +
                            numeral(
                              params.EU_annual_hangar * conversionRate
                            ).format("0,0")
                          : "£" +
                            numeral(
                              params.AS_annual_hangar * conversionRate
                            ).format("0,0")
                        : country === "North America"
                        ? "€" +
                          numeral(
                            params.NA_annual_hangar * conversionRate
                          ).format("0,0")
                        : country === "South America"
                        ? "€" +
                          numeral(
                            params.SA_annual_hangar * conversionRate
                          ).format("0,0")
                        : country === "Europe"
                        ? "€" +
                          numeral(
                            params.EU_annual_hangar * conversionRate
                          ).format("0,0")
                        : "€" +
                          numeral(
                            params.AS_annual_hangar * conversionRate
                          ).format("0,0")}
                    </span>
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
                    <span>
                      {currency === "USD"
                        ? country === "North America"
                          ? "$" +
                            numeral(params.NA_annual_insurance_hull).format(
                              "0,0"
                            )
                          : country === "South America"
                          ? "$" +
                            numeral(params.SA_annual_insurance_hull).format(
                              "0,0"
                            )
                          : country === "Europe"
                          ? "$" +
                            numeral(params.EU_annual_insurance_hull).format(
                              "0,0"
                            )
                          : "$" +
                            numeral(params.AS_annual_insurance_hull).format(
                              "0,0"
                            )
                        : currency === "GBP"
                        ? country === "North America"
                          ? "£" +
                            numeral(
                              params.NA_annual_insurance_hull * conversionRate
                            ).format("0,0")
                          : country === "South America"
                          ? "£" +
                            numeral(
                              params.SA_annual_insurance_hull * conversionRate
                            ).format("0,0")
                          : country === "Europe"
                          ? "£" +
                            numeral(
                              params.EU_annual_insurance_hull * conversionRate
                            ).format("0,0")
                          : "£" +
                            numeral(
                              params.AS_annual_insurance_hull * conversionRate
                            ).format("0,0")
                        : country === "North America"
                        ? "€" +
                          numeral(
                            params.NA_annual_insurance_hull * conversionRate
                          ).format("0,0")
                        : country === "South America"
                        ? "€" +
                          numeral(
                            params.SA_annual_insurance_hull * conversionRate
                          ).format("0,0")
                        : country === "Europe"
                        ? "€" +
                          numeral(
                            params.EU_annual_insurance_hull * conversionRate
                          ).format("0,0")
                        : "€" +
                          numeral(
                            params.AS_annual_insurance_hull * conversionRate
                          ).format("0,0")}
                    </span>
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
                    <span>
                      {currency === "USD"
                        ? country === "North America"
                          ? "$" +
                            numeral(
                              params.NA_annual_insurance_liability
                            ).format("0,0")
                          : country === "South America"
                          ? "$" +
                            numeral(
                              params.SA_annual_insurance_liability
                            ).format("0,0")
                          : country === "Europe"
                          ? "$" +
                            numeral(
                              params.EU_annual_insurance_liability
                            ).format("0,0")
                          : "$" +
                            numeral(
                              params.AS_annual_insurance_liability
                            ).format("0,0")
                        : currency === "GBP"
                        ? country === "North America"
                          ? "£" +
                            numeral(
                              params.NA_annual_insurance_liability *
                                conversionRate
                            ).format("0,0")
                          : country === "South America"
                          ? "£" +
                            numeral(
                              params.SA_annual_insurance_liability *
                                conversionRate
                            ).format("0,0")
                          : country === "Europe"
                          ? "£" +
                            numeral(
                              params.EU_annual_insurance_liability *
                                conversionRate
                            ).format("0,0")
                          : "£" +
                            numeral(
                              params.AS_annual_insurance_liability *
                                conversionRate
                            ).format("0,0")
                        : country === "North America"
                        ? "€" +
                          numeral(
                            params.NA_annual_insurance_liability *
                              conversionRate
                          ).format("0,0")
                        : country === "South America"
                        ? "€" +
                          numeral(
                            params.SA_annual_insurance_liability *
                              conversionRate
                          ).format("0,0")
                        : country === "Europe"
                        ? "€" +
                          numeral(
                            params.EU_annual_insurance_liability *
                              conversionRate
                          ).format("0,0")
                        : "€" +
                          numeral(
                            params.AS_annual_insurance_liability *
                              conversionRate
                          ).format("0,0")}
                    </span>
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
                    <span>
                      {currency === "USD"
                        ? country === "North America"
                          ? "$" +
                            numeral(params.NA_annual_management).format("0,0")
                          : country === "South America"
                          ? "$" +
                            numeral(params.SA_annual_management).format("0,0")
                          : country === "Europe"
                          ? "$" +
                            numeral(params.EU_annual_management).format("0,0")
                          : "$" +
                            numeral(params.AS_annual_management).format("0,0")
                        : currency === "GBP"
                        ? country === "North America"
                          ? "£" +
                            numeral(
                              params.NA_annual_management * conversionRate
                            ).format("0,0")
                          : country === "South America"
                          ? "£" +
                            numeral(
                              params.SA_annual_management * conversionRate
                            ).format("0,0")
                          : country === "Europe"
                          ? "£" +
                            numeral(
                              params.EU_annual_management * conversionRate
                            ).format("0,0")
                          : "£" +
                            numeral(
                              params.AS_annual_management * conversionRate
                            ).format("0,0")
                        : country === "North America"
                        ? "€" +
                          numeral(
                            params.NA_annual_management * conversionRate
                          ).format("0,0")
                        : country === "South America"
                        ? "€" +
                          numeral(
                            params.SA_annual_management * conversionRate
                          ).format("0,0")
                        : country === "Europe"
                        ? "€" +
                          numeral(
                            params.EU_annual_management * conversionRate
                          ).format("0,0")
                        : "€" +
                          numeral(
                            params.AS_annual_management * conversionRate
                          ).format("0,0")}
                    </span>
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
                    <span>Deprication Rate</span>
                    <span>
                      {currency === "USD"
                        ? country === "North America"
                          ? "$" +
                            numeral(params.NA_annual_deprecation).format("0,0")
                          : country === "South America"
                          ? "$" +
                            numeral(params.SA_annual_deprecation).format("0,0")
                          : country === "Europe"
                          ? "$" +
                            numeral(params.EU_annual_deprecation).format("0,0")
                          : "$" +
                            numeral(params.AS_annual_deprecation).format("0,0")
                        : currency === "GBP"
                        ? country === "North America"
                          ? "£" +
                            numeral(
                              params.NA_annual_deprecation * conversionRate
                            ).format("0,0")
                          : country === "South America"
                          ? "£" +
                            numeral(
                              params.SA_annual_deprecation * conversionRate
                            ).format("0,0")
                          : country === "Europe"
                          ? "£" +
                            numeral(
                              params.EU_annual_deprecation * conversionRate
                            ).format("0,0")
                          : "£" +
                            numeral(
                              params.AS_annual_deprecation * conversionRate
                            ).format("0,0")
                        : country === "North America"
                        ? "€" +
                          numeral(
                            params.NA_annual_deprecation * conversionRate
                          ).format("0,0")
                        : country === "South America"
                        ? "€" +
                          numeral(
                            params.SA_annual_deprecation * conversionRate
                          ).format("0,0")
                        : country === "Europe"
                        ? "€" +
                          numeral(
                            params.EU_annual_deprecation * conversionRate
                          ).format("0,0")
                        : "€" +
                          numeral(
                            params.AS_annual_deprecation * conversionRate
                          ).format("0,0")}
                    </span>
                  </div>
                  <div className={cn(styles.bar)}>
                    <div
                      className={cn(styles.bar__fill8)}
                      style={{
                        width:
                          (params.NA_annual_deprecation / maximumAnnualValue) *
                            100 +
                          "%",
                      }}
                    ></div>
                  </div>
                </div>
                <div className={styles.key_value_bar}>
                  <div className={cn(styles.key_value)}>
                    <span>Misc Fixed</span>
                    <span>
                      {currency === "USD"
                        ? country === "North America"
                          ? "$" + numeral(params.NA_annual_misc).format("0,0")
                          : country === "South America"
                          ? "$" + numeral(params.SA_annual_misc).format("0,0")
                          : country === "Europe"
                          ? "$" + numeral(params.EU_annual_misc).format("0,0")
                          : "$" + numeral(params.AS_annual_misc).format("0,0")
                        : currency === "GBP"
                        ? country === "North America"
                          ? "£" +
                            numeral(
                              params.NA_annual_misc * conversionRate
                            ).format("0,0")
                          : country === "South America"
                          ? "£" +
                            numeral(
                              params.SA_annual_misc * conversionRate
                            ).format("0,0")
                          : country === "Europe"
                          ? "£" +
                            numeral(
                              params.EU_annual_misc * conversionRate
                            ).format("0,0")
                          : "£" +
                            numeral(
                              params.AS_annual_misc * conversionRate
                            ).format("0,0")
                        : country === "North America"
                        ? "€" +
                          numeral(
                            params.NA_annual_misc * conversionRate
                          ).format("0,0")
                        : country === "South America"
                        ? "€" +
                          numeral(
                            params.SA_annual_misc * conversionRate
                          ).format("0,0")
                        : country === "Europe"
                        ? "€" +
                          numeral(
                            params.EU_annual_misc * conversionRate
                          ).format("0,0")
                        : "€" +
                          numeral(
                            params.AS_annual_misc * conversionRate
                          ).format("0,0")}
                    </span>
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
                    <span>
                      {currency === "USD"
                        ? country === "North America"
                          ? "$" + numeral(params.NA_hourly_fuel).format("0,0")
                          : country === "South America"
                          ? "$" + numeral(params.SA_hourly_fuel).format("0,0")
                          : country === "Europe"
                          ? "$" + numeral(params.EU_hourly_fuel).format("0,0")
                          : "$" + numeral(params.AS_hourly_fuel).format("0,0")
                        : currency === "GBP"
                        ? country === "North America"
                          ? "£" +
                            numeral(
                              params.NA_hourly_fuel * conversionRate
                            ).format("0,0")
                          : country === "South America"
                          ? "£" +
                            numeral(
                              params.SA_hourly_fuel * conversionRate
                            ).format("0,0")
                          : country === "Europe"
                          ? "£" +
                            numeral(
                              params.EU_hourly_fuel * conversionRate
                            ).format("0,0")
                          : "£" +
                            numeral(
                              params.AS_hourly_fuel * conversionRate
                            ).format("0,0")
                        : country === "North America"
                        ? "€" +
                          numeral(
                            params.NA_hourly_fuel * conversionRate
                          ).format("0,0")
                        : country === "South America"
                        ? "€" +
                          numeral(
                            params.SA_hourly_fuel * conversionRate
                          ).format("0,0")
                        : country === "Europe"
                        ? "€" +
                          numeral(
                            params.EU_hourly_fuel * conversionRate
                          ).format("0,0")
                        : "€" +
                          numeral(
                            params.AS_hourly_fuel * conversionRate
                          ).format("0,0")}
                    </span>
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
                    <span>
                      {currency === "USD"
                        ? country === "North America"
                          ? "$" +
                            numeral(params.NA_hourly_maintenance).format("0,0")
                          : country === "South America"
                          ? "$" +
                            numeral(params.SA_hourly_maintenance).format("0,0")
                          : country === "Europe"
                          ? "$" +
                            numeral(params.EU_hourly_maintenance).format("0,0")
                          : "$" +
                            numeral(params.AS_hourly_maintenance).format("0,0")
                        : currency === "GBP"
                        ? country === "North America"
                          ? "£" +
                            numeral(
                              params.NA_hourly_maintenance * conversionRate
                            ).format("0,0")
                          : country === "South America"
                          ? "£" +
                            numeral(
                              params.SA_hourly_maintenance * conversionRate
                            ).format("0,0")
                          : country === "Europe"
                          ? "£" +
                            numeral(
                              params.EU_hourly_maintenance * conversionRate
                            ).format("0,0")
                          : "£" +
                            numeral(
                              params.AS_hourly_maintenance * conversionRate
                            ).format("0,0")
                        : country === "North America"
                        ? "€" +
                          numeral(
                            params.NA_hourly_maintenance * conversionRate
                          ).format("0,0")
                        : country === "South America"
                        ? "€" +
                          numeral(
                            params.SA_hourly_maintenance * conversionRate
                          ).format("0,0")
                        : country === "Europe"
                        ? "€" +
                          numeral(
                            params.EU_hourly_maintenance * conversionRate
                          ).format("0,0")
                        : "€" +
                          numeral(
                            params.AS_hourly_maintenance * conversionRate
                          ).format("0,0")}
                    </span>
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
                    <span>
                      {currency === "USD"
                        ? country === "North America"
                          ? "$" +
                            numeral(params.NA_hourly_engine_overhaul).format(
                              "0,0"
                            )
                          : country === "South America"
                          ? "$" +
                            numeral(params.SA_hourly_engine_overhaul).format(
                              "0,0"
                            )
                          : country === "Europe"
                          ? "$" +
                            numeral(params.EU_hourly_engine_overhaul).format(
                              "0,0"
                            )
                          : "$" +
                            numeral(params.AS_hourly_engine_overhaul).format(
                              "0,0"
                            )
                        : currency === "GBP"
                        ? country === "North America"
                          ? "£" +
                            numeral(
                              params.NA_hourly_engine_overhaul * conversionRate
                            ).format("0,0")
                          : country === "South America"
                          ? "£" +
                            numeral(
                              params.SA_hourly_engine_overhaul * conversionRate
                            ).format("0,0")
                          : country === "Europe"
                          ? "£" +
                            numeral(
                              params.EU_hourly_engine_overhaul * conversionRate
                            ).format("0,0")
                          : "£" +
                            numeral(
                              params.AS_hourly_engine_overhaul * conversionRate
                            ).format("0,0")
                        : country === "North America"
                        ? "€" +
                          numeral(
                            params.NA_hourly_engine_overhaul * conversionRate
                          ).format("0,0")
                        : country === "South America"
                        ? "€" +
                          numeral(
                            params.SA_hourly_engine_overhaul * conversionRate
                          ).format("0,0")
                        : country === "Europe"
                        ? "€" +
                          numeral(
                            params.EU_hourly_engine_overhaul * conversionRate
                          ).format("0,0")
                        : "€" +
                          numeral(
                            params.AS_hourly_engine_overhaul * conversionRate
                          ).format("0,0")}
                    </span>
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
                    <span>
                      {currency === "USD"
                        ? country === "North America"
                          ? "$" +
                            numeral(params.NA_hourly_ground_fees).format("0,0")
                          : country === "Europe"
                          ? "$" +
                            numeral(params.EU_hourly_ground_fees).format("0,0")
                          : country === "South America"
                          ? "$" +
                            numeral(params.SA_hourly_ground_fees).format("0,0")
                          : "$" +
                            numeral(params.AS_hourly_ground_fees).format("0,0")
                        : currency === "GBP"
                        ? country === "North America"
                          ? "£" +
                            numeral(
                              params.NA_hourly_ground_fees * conversionRate
                            ).format("0,0")
                          : country === "Europe"
                          ? "£" +
                            numeral(
                              params.EU_hourly_ground_fees * conversionRate
                            ).format("0,0")
                          : country === "South America"
                          ? "£" +
                            numeral(
                              params.SA_hourly_ground_fees * conversionRate
                            ).format("0,0")
                          : "£" +
                            numeral(
                              params.AS_hourly_ground_fees * conversionRate
                            ).format("0,0")
                        : country === "North America"
                        ? "€" +
                          numeral(
                            params.NA_hourly_ground_fees * conversionRate
                          ).format("0,0")
                        : country === "Europe"
                        ? "€" +
                          numeral(
                            params.EU_hourly_ground_fees * conversionRate
                          ).format("0,0")
                        : country === "South America"
                        ? "€" +
                          numeral(
                            params.SA_hourly_ground_fees * conversionRate
                          ).format("0,0")
                        : "€" +
                          numeral(
                            params.AS_hourly_ground_fees * conversionRate
                          ).format("0,0")}
                    </span>
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
                    <span>
                      {currency === "GBP"
                        ? country === "North America"
                          ? "£" +
                            numeral(
                              params.NA_hourly_misc * conversionRate
                            ).format("0,0")
                          : country === "Europe"
                          ? "£" +
                            numeral(
                              params.EU_hourly_misc * conversionRate
                            ).format("0,0")
                          : country === "South America"
                          ? "£" +
                            numeral(
                              params.SA_hourly_misc * conversionRate
                            ).format("0,0")
                          : "£" +
                            numeral(
                              params.AS_hourly_misc * conversionRate
                            ).format("0,0")
                        : currency === "EUR"
                        ? country === "North America"
                          ? "€" +
                            numeral(
                              params.NA_hourly_misc * conversionRate
                            ).format("0,0")
                          : country === "Europe"
                          ? "€" +
                            numeral(
                              params.EU_hourly_misc * conversionRate
                            ).format("0,0")
                          : country === "South America"
                          ? "€" +
                            numeral(
                              params.SA_hourly_misc * conversionRate
                            ).format("0,0")
                          : "€" +
                            numeral(
                              params.AS_hourly_misc * conversionRate
                            ).format("0,0")
                        : country === "North America"
                        ? "$" +
                          numeral(
                            params.NA_hourly_misc * conversionRate
                          ).format("0,0")
                        : country === "Europe"
                        ? "$" +
                          numeral(
                            params.EU_hourly_misc * conversionRate
                          ).format("0,0")
                        : country === "South America"
                        ? "$" +
                          numeral(
                            params.SA_hourly_misc * conversionRate
                          ).format("0,0")
                        : "$" +
                          numeral(
                            params.AS_hourly_misc * conversionRate
                          ).format("0,0")}
                    </span>
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
