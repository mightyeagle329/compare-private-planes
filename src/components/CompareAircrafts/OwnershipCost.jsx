import React, { useEffect, useState } from "react";
import cn from "classnames";
import global from "../styles/global.module.scss";
import styles from "./styles/styles.module.scss";
import Axios from "axios";
import numeral from "numeral";
import SectionHeader from "../shared/SectionHeader";

const OwnershipCost = ({ data, currency, country, unit }) => {
  const [info, setInfo] = useState([]);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("usd");
  const [nbHours, setNbHours] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);
  const [annualBudget0, setAnnualBudget0] = useState(0);
  const [annualBudget1, setAnnualBudget1] = useState(0);
  const [annualBudget2, setAnnualBudget2] = useState(0);
  const maximumAnnualValue = Math.max(
    parseInt(data[0].NA_annual_captain) +
      parseInt(data[0].NA_annual_first_office) +
      parseInt(data[0].NA_annual_employee_benefits),
    parseInt(data[0].NA_annual_crew_training),
    parseInt(data[0].NA_annual_hangar),
    parseInt(
      data[0].NA_annual_insurance_liability + data[0].NA_annual_insurance_hull
    ),
    parseInt(data[0].NA_annual_management),
    parseInt(data[0].NA_annual_deprecation),
    parseInt(data[0].NA_annual_misc)
  );

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

  const onHoursChanged = (e) => {
    setNbHours(e.target.value);
    setAnnualBudget0(
      currency !== "USD"
        ? (country === "North America"
            ? data[0].NA_annual_total +
              parseFloat(e.target.value) * data[0].NA_hourly_total
            : country === "Europe"
            ? data[0].EU_annual_total +
              parseFloat(e.target.value) * data[0].EU_hourly_total
            : country === "South America"
            ? data[0].SA_annual_total +
              parseFloat(e.target.value) * data[0].SA_hourly_total
            : data[0].AS_annual_total +
              parseFloat(e.target.value) * data[0].AS_hourly_total) *
            conversionRate
        : country === "North America"
        ? data[0].NA_annual_total +
          parseFloat(e.target.value) * data[0].NA_hourly_total
        : country === "Europe"
        ? data[0].EU_annual_total +
          parseFloat(e.target.value) * data[0].EU_hourly_total
        : country === "South America"
        ? data[0].SA_annual_total +
          parseFloat(e.target.value) * data[0].SA_hourly_total
        : data[0].AS_annual_total +
          parseFloat(e.target.value) * data[0].AS_hourly_total
    );
    if (e.target.value === "") {
      setAnnualBudget0(data[0].NA_annual_total);
    }

    setAnnualBudget1(
      currency !== "USD"
        ? (country === "North America"
            ? data[1].NA_annual_total +
              parseFloat(e.target.value) * data[1].NA_hourly_total
            : country === "Europe"
            ? data[1].EU_annual_total +
              parseFloat(e.target.value) * data[1].EU_hourly_total
            : country === "South America"
            ? data[1].SA_annual_total +
              parseFloat(e.target.value) * data[1].SA_hourly_total
            : data[1].AS_annual_total +
              parseFloat(e.target.value) * data[1].AS_hourly_total) *
            conversionRate
        : country === "North America"
        ? data[1].NA_annual_total +
          parseFloat(e.target.value) * data[1].NA_hourly_total
        : country === "Europe"
        ? data[1].EU_annual_total +
          parseFloat(e.target.value) * data[1].EU_hourly_total
        : country === "South America"
        ? data[1].SA_annual_total +
          parseFloat(e.target.value) * data[1].SA_hourly_total
        : data[1].AS_annual_total +
          parseFloat(e.target.value) * data[1].AS_hourly_total
    );
    if (e.target.value === "") {
      setAnnualBudget1(data[1].NA_annual_total);
    }

    if (data[2] !== undefined) {
      setAnnualBudget2(
        currency !== "USD"
          ? (country === "North America"
              ? data[2].NA_annual_total +
                parseFloat(e.target.value) * data[2].NA_hourly_total
              : country === "Europe"
              ? data[2].EU_annual_total +
                parseFloat(e.target.value) * data[2].EU_hourly_total
              : country === "South America"
              ? data[2].SA_annual_total +
                parseFloat(e.target.value) * data[2].SA_hourly_total
              : data[2].AS_annual_total +
                parseFloat(e.target.value) * data[2].AS_hourly_total) *
              conversionRate
          : country === "North America"
          ? data[2].NA_annual_total +
            parseFloat(e.target.value) * data[2].NA_hourly_total
          : country === "Europe"
          ? data[2].EU_annual_total +
            parseFloat(e.target.value) * data[2].EU_hourly_total
          : country === "South America"
          ? data[2].SA_annual_total +
            parseFloat(e.target.value) * data[2].SA_hourly_total
          : data[2].AS_annual_total +
            parseFloat(e.target.value) * data[2].AS_hourly_total
      );
      if (e.target.value === "") {
        setAnnualBudget2(data[2].NA_annual_total);
      }
    }
  };

  return (
    <>
      <section className={cn(global.section, global.page_break)}>
        <SectionHeader title="Ownership Costs" />
        <main className={cn(styles.ownership_container)}>
          <center>
            <p>Your estimated annual flight hours: </p>
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
          </center>
          <br></br>
          <br></br>
          <div className={cn(styles.compare_table)}>
            <div className={cn(styles.compare_table_column)}>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.invisible
                )}
              >
                invisible
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Annual Budget{" "}
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Annual Fixed Costs{" "}
              </span>
              <span
                className={cn(
                  styles.compare_table_column_cell,
                  styles.table_key
                )}
              >
                Variable Cost per Hour{" "}
              </span>
            </div>
            {data.map((aircraft, index) => {
              return (
                <div
                  className={cn(styles.compare_table_column)}
                  key={aircraft.aircraft_id}
                >
                  <span
                    className={cn(
                      styles.compare_table_column_cell,
                      styles.table_column_head
                    )}
                  >
                    {aircraft.aircraft_name}
                  </span>

                  <span
                    className={cn(
                      styles.compare_table_column_cell,
                      styles.green_value
                    )}
                  >
                    {index === 0
                      ? annualBudget0 === 0
                        ? "-"
                        : (currency === "USD"
                            ? "$"
                            : currency === "GBP"
                            ? "£"
                            : "€") + numeral(annualBudget0).format("0,0")
                      : index === 1
                      ? annualBudget1 === 0
                        ? "-"
                        : (currency === "USD"
                            ? "$"
                            : currency === "GBP"
                            ? "£"
                            : "€") + numeral(annualBudget1).format("0,0")
                      : annualBudget2 === 0
                      ? "-"
                      : (currency === "USD"
                          ? "$"
                          : currency === "GBP"
                          ? "£"
                          : "€") + numeral(annualBudget2).format("0,0")}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {currency === "USD"
                      ? country === "North America"
                        ? aircraft.NA_annual_total === 0
                          ? "-"
                          : "$" +
                            numeral(aircraft.NA_annual_total).format("0,0")
                        : country === "South America"
                        ? aircraft.SA_annual_total === 0
                          ? "-"
                          : "$" +
                            numeral(aircraft.SA_annual_total).format("0,0")
                        : country === "Europe"
                        ? aircraft.EU_annual_total === 0
                          ? "-"
                          : "$" +
                            numeral(aircraft.EU_annual_total).format("0,0")
                        : aircraft.AS_annual_total === 0
                        ? "-"
                        : "$" + numeral(aircraft.AS_annual_total).format("0,0")
                      : currency === "GBP"
                      ? country === "North America"
                        ? aircraft.NA_annual_total === 0
                          ? "-"
                          : "£" +
                            numeral(
                              aircraft.NA_annual_total * conversionRate
                            ).format("0,0")
                        : country === "South America"
                        ? aircraft.SA_annual_total === 0
                          ? "-"
                          : "£" +
                            numeral(
                              aircraft.SA_annual_total * conversionRate
                            ).format("0,0")
                        : country === "Europe"
                        ? aircraft.EU_annual_total === 0
                          ? "-"
                          : "£" +
                            numeral(
                              aircraft.EU_annual_total * conversionRate
                            ).format("0,0")
                        : aircraft.AS_annual_total === 0
                        ? "-"
                        : "£" +
                          numeral(
                            aircraft.AS_annual_total * conversionRate
                          ).format("0,0")
                      : country === "North America"
                      ? aircraft.NA_annual_total === 0
                        ? "-"
                        : "€" +
                          numeral(
                            aircraft.NA_annual_total * conversionRate
                          ).format("0,0")
                      : country === "South America"
                      ? aircraft.SA_annual_total === 0
                        ? "-"
                        : "€" +
                          numeral(
                            aircraft.SA_annual_total * conversionRate
                          ).format("0,0")
                      : country === "Europe"
                      ? aircraft.EU_annual_total === 0
                        ? "-"
                        : "€" +
                          numeral(
                            aircraft.EU_annual_total * conversionRate
                          ).format("0,0")
                      : aircraft.AS_annual_total === 0
                      ? "-"
                      : "€" +
                        numeral(
                          aircraft.AS_annual_total * conversionRate
                        ).format("0,0")}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {currency === "USD"
                      ? country === "North America"
                        ? aircraft.NA_hourly_total === 0
                          ? "-"
                          : "$" +
                            numeral(aircraft.NA_hourly_total).format("0,0")
                        : country === "South America"
                        ? aircraft.SA_hourly_total === 0
                          ? "-"
                          : "$" +
                            numeral(aircraft.SA_hourly_total).format("0,0")
                        : country === "Europe"
                        ? aircraft.EU_hourly_total === 0
                          ? "-"
                          : "$" +
                            numeral(aircraft.EU_hourly_total).format("0,0")
                        : aircraft.AS_hourly_total === 0
                        ? "-"
                        : "$" + numeral(aircraft.AS_hourly_total).format("0,0")
                      : currency === "GBP"
                      ? country === "North America"
                        ? aircraft.NA_hourly_total === 0
                          ? "-"
                          : "£" +
                            numeral(
                              aircraft.NA_hourly_total * conversionRate
                            ).format("0,0")
                        : country === "South America"
                        ? aircraft.SA_hourly_total === 0
                          ? "-"
                          : "£" +
                            numeral(
                              aircraft.SA_hourly_total * conversionRate
                            ).format("0,0")
                        : country === "Europe"
                        ? aircraft.EU_hourly_total === 0
                          ? "-"
                          : "£" +
                            numeral(
                              aircraft.EU_hourly_total * conversionRate
                            ).format("0,0")
                        : aircraft.AS_hourly_total === 0
                        ? "-"
                        : "£" +
                          numeral(
                            aircraft.AS_hourly_total * conversionRate
                          ).format("0,0")
                      : country === "North America"
                      ? aircraft.NA_hourly_total === 0
                        ? "-"
                        : "€" +
                          numeral(
                            aircraft.NA_hourly_total * conversionRate
                          ).format("0,0")
                      : country === "South America"
                      ? aircraft.SA_hourly_total === 0
                        ? "-"
                        : "€" +
                          numeral(
                            aircraft.SA_hourly_total * conversionRate
                          ).format("0,0")
                      : country === "Europe"
                      ? aircraft.EU_hourly_total === 0
                        ? "-"
                        : "€" +
                          numeral(
                            aircraft.EU_hourly_total * conversionRate
                          ).format("0,0")
                      : aircraft.AS_hourly_total === 0
                      ? "-"
                      : "€" +
                        numeral(
                          aircraft.AS_hourly_total * conversionRate
                        ).format("0,0")}
                  </span>
                </div>
              );
            })}
          </div>
          <div className={cn(styles.additional_info)}>
            <br></br>
            <h3>Annual Fixed Costs Breakdown</h3>
            <div>
              <h5>Crew Salary</h5>
              <div className={cn(styles.crew_salary)}>
                <div className={cn(styles.aircraft_names)}>
                  {data.map((aircraft, index) => {
                    return (
                      <div className={styles.key_value_bar}>
                        <div className={cn(styles.key_value)}>
                          <span>{aircraft.aircraft_name} </span>
                          <span>
                            {currency === "USD"
                              ? country === "North America"
                                ? "$" +
                                  numeral(
                                    aircraft.NA_annual_employee_benefits +
                                      aircraft.NA_annual_captain +
                                      aircraft.NA_annual_first_office
                                  ).format("0,0")
                                : country === "South America"
                                ? "$" +
                                  numeral(
                                    aircraft.SA_annual_employee_benefits +
                                      aircraft.SA_annual_captain +
                                      aircraft.SA_annual_first_office
                                  ).format("0,0")
                                : country === "Europe"
                                ? "$" +
                                  numeral(
                                    aircraft.EU_annual_employee_benefits +
                                      aircraft.EU_annual_captain +
                                      aircraft.EU_annual_first_office
                                  ).format("0,0")
                                : "$" +
                                  numeral(
                                    aircraft.AS_annual_employee_benefits +
                                      aircraft.AS_annual_captain +
                                      aircraft.AS_annual_first_office
                                  ).format("0,0")
                              : currency === "GBP"
                              ? country === "North America"
                                ? "£" +
                                  numeral(
                                    (aircraft.NA_annual_employee_benefits +
                                      aircraft.NA_annual_captain +
                                      aircraft.NA_annual_first_office) *
                                      conversionRate
                                  ).format("0,0")
                                : country === "South America"
                                ? "£" +
                                  numeral(
                                    (aircraft.SA_annual_employee_benefits +
                                      aircraft.SA_annual_captain +
                                      aircraft.SA_annual_first_office) *
                                      conversionRate
                                  ).format("0,0")
                                : country === "Europe"
                                ? "£" +
                                  numeral(
                                    (aircraft.EU_annual_employee_benefits +
                                      aircraft.EU_annual_captain +
                                      aircraft.EU_annual_first_office) *
                                      conversionRate
                                  ).format("0,0")
                                : "£" +
                                  numeral(
                                    (aircraft.AS_annual_employee_benefits +
                                      aircraft.AS_annual_captain +
                                      aircraft.AS_annual_first_office) *
                                      conversionRate
                                  ).format("0,0")
                              : country === "North America"
                              ? "€" +
                                numeral(
                                  (aircraft.NA_annual_employee_benefits +
                                    aircraft.NA_annual_captain +
                                    aircraft.NA_annual_first_office) *
                                    conversionRate
                                ).format("0,0")
                              : country === "South America"
                              ? "€" +
                                numeral(
                                  (aircraft.SA_annual_employee_benefits +
                                    aircraft.SA_annual_captain +
                                    aircraft.SA_annual_first_office) *
                                    conversionRate
                                ).format("0,0")
                              : country === "Europe"
                              ? "€" +
                                numeral(
                                  (aircraft.EU_annual_employee_benefits +
                                    aircraft.EU_annual_captain +
                                    aircraft.EU_annual_first_office) *
                                    conversionRate
                                ).format("0,0")
                              : "€" +
                                numeral(
                                  (aircraft.AS_annual_employee_benefits +
                                    aircraft.AS_annual_captain +
                                    aircraft.AS_annual_first_office) *
                                    conversionRate
                                ).format("0,0")}
                          </span>
                        </div>
                        <div className={cn(styles.bar)}>
                          <div
                            className={
                              index === 0
                                ? cn(styles.bar__fill1)
                                : index === 1
                                ? cn(styles.bar__fill2)
                                : cn(styles.bar__fill3)
                            }
                            style={{
                              width:
                                data[2] !== undefined
                                  ? (country === "North America"
                                      ? aircraft.NA_annual_crew_training /
                                        (data[0].NA_annual_crew_training +
                                          data[1].NA_annual_crew_training +
                                          data[2].NA_annual_crew_training)
                                      : country === "South America"
                                      ? aircraft.SA_annual_crew_training /
                                        (data[0].SA_annual_crew_training +
                                          data[1].SA_annual_crew_training +
                                          data[2].SA_annual_crew_training)
                                      : country === "Europe"
                                      ? aircraft.EU_annual_crew_training /
                                        (data[0].EU_annual_crew_training +
                                          data[1].EU_annual_crew_training +
                                          data[2].EU_annual_crew_training)
                                      : aircraft.AS_annual_crew_training /
                                        (data[0].AS_annual_crew_training +
                                          data[1].AS_annual_crew_training +
                                          data[2].AS_annual_crew_training)) *
                                      100 +
                                    "%"
                                  : (country === "North America"
                                      ? aircraft.NA_annual_crew_training /
                                        (data[0].NA_annual_crew_training +
                                          data[1].NA_annual_crew_training)
                                      : country === "South America"
                                      ? aircraft.SA_annual_crew_training /
                                        (data[0].SA_annual_crew_training +
                                          data[1].SA_annual_crew_training)
                                      : country === "Europe"
                                      ? aircraft.EU_annual_crew_training /
                                        (data[0].EU_annual_crew_training +
                                          data[1].EU_annual_crew_training)
                                      : aircraft.AS_annual_crew_training /
                                        (data[0].AS_annual_crew_training +
                                          data[1].AS_annual_crew_training)) *
                                      100 +
                                    "%",
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <h5>Crew Training</h5>
              <div className={cn(styles.crew_salary)}>
                <div className={cn(styles.aircraft_names)}>
                  {data.map((aircraft, index) => {
                    return (
                      <div className={styles.key_value_bar}>
                        <div className={cn(styles.key_value)}>
                          <span>{aircraft.aircraft_name} </span>
                          <span>
                            {currency === "USD"
                              ? country === "North America"
                                ? "$" +
                                  numeral(
                                    aircraft.NA_annual_crew_training
                                  ).format("0,0")
                                : country === "South America"
                                ? "$" +
                                  numeral(
                                    aircraft.SA_annual_crew_training
                                  ).format("0,0")
                                : country === "Europe"
                                ? "$" +
                                  numeral(
                                    aircraft.EU_annual_crew_training
                                  ).format("0,0")
                                : "$" +
                                  numeral(
                                    aircraft.AS_annual_crew_training
                                  ).format("0,0")
                              : currency === "GBP"
                              ? country === "North America"
                                ? "£" +
                                  numeral(
                                    aircraft.NA_annual_crew_training *
                                      conversionRate
                                  ).format("0,0")
                                : country === "South America"
                                ? "£" +
                                  numeral(
                                    aircraft.SA_annual_crew_training *
                                      conversionRate
                                  ).format("0,0")
                                : country === "Europe"
                                ? "£" +
                                  numeral(
                                    aircraft.EU_annual_crew_training *
                                      conversionRate
                                  ).format("0,0")
                                : "£" +
                                  numeral(
                                    aircraft.AS_annual_crew_training *
                                      conversionRate
                                  ).format("0,0")
                              : country === "North America"
                              ? "€" +
                                numeral(
                                  aircraft.NA_annual_crew_training *
                                    conversionRate
                                ).format("0,0")
                              : country === "South America"
                              ? "€" +
                                numeral(
                                  aircraft.SA_annual_crew_training *
                                    conversionRate
                                ).format("0,0")
                              : country === "Europe"
                              ? "€" +
                                numeral(
                                  aircraft.EU_annual_crew_training *
                                    conversionRate
                                ).format("0,0")
                              : "€" +
                                numeral(
                                  aircraft.AS_annual_crew_training *
                                    conversionRate
                                ).format("0,0")}
                          </span>
                        </div>
                        <div className={cn(styles.bar)}>
                          <div
                            className={
                              index === 0
                                ? cn(styles.bar__fill1)
                                : index === 1
                                ? cn(styles.bar__fill2)
                                : cn(styles.bar__fill3)
                            }
                            style={{
                              width:
                                data[2] !== undefined
                                  ? (country === "North America"
                                      ? aircraft.NA_annual_crew_training /
                                        (data[0].NA_annual_crew_training +
                                          data[1].NA_annual_crew_training +
                                          data[2].NA_annual_crew_training)
                                      : country === "South America"
                                      ? aircraft.SA_annual_crew_training /
                                        (data[0].SA_annual_crew_training +
                                          data[1].SA_annual_crew_training +
                                          data[2].SA_annual_crew_training)
                                      : country === "Europe"
                                      ? aircraft.EU_annual_crew_training /
                                        (data[0].EU_annual_crew_training +
                                          data[1].EU_annual_crew_training +
                                          data[2].EU_annual_crew_training)
                                      : aircraft.AS_annual_crew_training /
                                        (data[0].AS_annual_crew_training +
                                          data[1].AS_annual_crew_training +
                                          data[2].AS_annual_crew_training)) *
                                      100 +
                                    "%"
                                  : (country === "North America"
                                      ? aircraft.NA_annual_crew_training /
                                        (data[0].NA_annual_crew_training +
                                          data[1].NA_annual_crew_training)
                                      : country === "South America"
                                      ? aircraft.SA_annual_crew_training /
                                        (data[0].SA_annual_crew_training +
                                          data[1].SA_annual_crew_training)
                                      : country === "Europe"
                                      ? aircraft.EU_annual_crew_training /
                                        (data[0].EU_annual_crew_training +
                                          data[1].EU_annual_crew_training)
                                      : aircraft.AS_annual_crew_training /
                                        (data[0].AS_annual_crew_training +
                                          data[1].AS_annual_crew_training)) *
                                      100 +
                                    "%",
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <h5>Hangar</h5>
              <div className={cn(styles.crew_salary)}>
                <div className={cn(styles.aircraft_names)}>
                  {data.map((aircraft, index) => {
                    return (
                      <div className={styles.key_value_bar}>
                        <div className={cn(styles.key_value)}>
                          <span>{aircraft.aircraft_name} </span>
                          <span>
                            {currency === "USD"
                              ? country === "North America"
                                ? "$" +
                                  numeral(aircraft.NA_annual_hangar).format(
                                    "0,0"
                                  )
                                : country === "South America"
                                ? "$" +
                                  numeral(aircraft.SA_annual_hangar).format(
                                    "0,0"
                                  )
                                : country === "Europe"
                                ? "$" +
                                  numeral(aircraft.EU_annual_hangar).format(
                                    "0,0"
                                  )
                                : "$" +
                                  numeral(aircraft.AS_annual_hangar).format(
                                    "0,0"
                                  )
                              : currency === "GBP"
                              ? country === "North America"
                                ? "£" +
                                  numeral(
                                    aircraft.NA_annual_hangar * conversionRate
                                  ).format("0,0")
                                : country === "South America"
                                ? "£" +
                                  numeral(
                                    aircraft.SA_annual_hangar * conversionRate
                                  ).format("0,0")
                                : country === "Europe"
                                ? "£" +
                                  numeral(
                                    aircraft.EU_annual_hangar * conversionRate
                                  ).format("0,0")
                                : "£" +
                                  numeral(
                                    aircraft.AS_annual_hangar * conversionRate
                                  ).format("0,0")
                              : country === "North America"
                              ? "€" +
                                numeral(
                                  aircraft.NA_annual_hangar * conversionRate
                                ).format("0,0")
                              : country === "South America"
                              ? "€" +
                                numeral(
                                  aircraft.SA_annual_hangar * conversionRate
                                ).format("0,0")
                              : country === "Europe"
                              ? "€" +
                                numeral(
                                  aircraft.EU_annual_hangar * conversionRate
                                ).format("0,0")
                              : "€" +
                                numeral(
                                  aircraft.AS_annual_hangar * conversionRate
                                ).format("0,0")}
                          </span>
                        </div>
                        <div className={cn(styles.bar)}>
                          <div
                            className={
                              index === 0
                                ? cn(styles.bar__fill1)
                                : index === 1
                                ? cn(styles.bar__fill2)
                                : cn(styles.bar__fill3)
                            }
                            style={{
                              width:
                                data[2] !== undefined
                                  ? (country === "North America"
                                      ? aircraft.NA_annual_hangar /
                                        (data[0].NA_annual_hangar +
                                          data[1].NA_annual_hangar +
                                          data[2].NA_annual_hangar)
                                      : country === "South America"
                                      ? aircraft.SA_annual_hangar /
                                        (data[0].SA_annual_hangar +
                                          data[1].SA_annual_hangar +
                                          data[2].SA_annual_hangar)
                                      : country === "Europe"
                                      ? aircraft.EU_annual_hangar /
                                        (data[0].EU_annual_hangar +
                                          data[1].EU_annual_hangar +
                                          data[2].EU_annual_hangar)
                                      : aircraft.AS_annual_hangar /
                                        (data[0].AS_annual_hangar +
                                          data[1].AS_annual_hangar +
                                          data[2].AS_annual_hangar)) *
                                      100 +
                                    "%"
                                  : (country === "North America"
                                      ? aircraft.NA_annual_hangar /
                                        (data[0].NA_annual_hangar +
                                          data[1].NA_annual_hangar)
                                      : country === "South America"
                                      ? aircraft.SA_annual_hangar /
                                        (data[0].SA_annual_hangar +
                                          data[1].SA_annual_hangar)
                                      : country === "Europe"
                                      ? aircraft.EU_annual_hangar /
                                        (data[0].EU_annual_hangar +
                                          data[1].EU_annual_hangar)
                                      : aircraft.AS_annual_hangar /
                                        (data[0].AS_annual_hangar +
                                          data[1].AS_annual_hangar)) *
                                      100 +
                                    "%",
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <h5>Insurance Hull</h5>
              <div className={cn(styles.crew_salary)}>
                <div className={cn(styles.aircraft_names)}>
                  {data.map((aircraft, index) => {
                    return (
                      <div className={styles.key_value_bar}>
                        <div className={cn(styles.key_value)}>
                          <span>{aircraft.aircraft_name} </span>
                          <span>
                            {currency === "USD"
                              ? country === "North America"
                                ? "$" +
                                  numeral(
                                    aircraft.NA_annual_insurance_hull
                                  ).format("0,0")
                                : country === "South America"
                                ? "$" +
                                  numeral(
                                    aircraft.SA_annual_insurance_hull
                                  ).format("0,0")
                                : country === "Europe"
                                ? "$" +
                                  numeral(
                                    aircraft.EU_annual_insurance_hull
                                  ).format("0,0")
                                : "$" +
                                  numeral(
                                    aircraft.AS_annual_insurance_hull
                                  ).format("0,0")
                              : currency === "GBP"
                              ? country === "North America"
                                ? "£" +
                                  numeral(
                                    aircraft.NA_annual_insurance_hull *
                                      conversionRate
                                  ).format("0,0")
                                : country === "South America"
                                ? "£" +
                                  numeral(
                                    aircraft.SA_annual_insurance_hull *
                                      conversionRate
                                  ).format("0,0")
                                : country === "Europe"
                                ? "£" +
                                  numeral(
                                    aircraft.EU_annual_insurance_hull *
                                      conversionRate
                                  ).format("0,0")
                                : "£" +
                                  numeral(
                                    aircraft.AS_annual_insurance_hull *
                                      conversionRate
                                  ).format("0,0")
                              : country === "North America"
                              ? "€" +
                                numeral(
                                  aircraft.NA_annual_insurance_hull *
                                    conversionRate
                                ).format("0,0")
                              : country === "South America"
                              ? "€" +
                                numeral(
                                  aircraft.SA_annual_insurance_hull *
                                    conversionRate
                                ).format("0,0")
                              : country === "Europe"
                              ? "€" +
                                numeral(
                                  aircraft.EU_annual_insurance_hull *
                                    conversionRate
                                ).format("0,0")
                              : "€" +
                                numeral(
                                  aircraft.AS_annual_insurance_hull *
                                    conversionRate
                                ).format("0,0")}
                          </span>
                        </div>
                        <div className={cn(styles.bar)}>
                          <div
                            className={
                              index === 0
                                ? cn(styles.bar__fill1)
                                : index === 1
                                ? cn(styles.bar__fill2)
                                : cn(styles.bar__fill3)
                            }
                            style={{
                              width:
                                data[2] !== undefined
                                  ? (country === "North America"
                                      ? aircraft.NA_annual_insurance_hull /
                                        (data[0].NA_annual_insurance_hull +
                                          data[1].NA_annual_insurance_hull +
                                          data[2].NA_annual_insurance_hull)
                                      : country === "South America"
                                      ? aircraft.SA_annual_insurance_hull /
                                        (data[0].SA_annual_insurance_hull +
                                          data[1].SA_annual_insurance_hull +
                                          data[2].SA_annual_insurance_hull)
                                      : country === "Europe"
                                      ? aircraft.EU_annual_insurance_hull /
                                        (data[0].EU_annual_insurance_hull +
                                          data[1].EU_annual_insurance_hull +
                                          data[2].EU_annual_insurance_hull)
                                      : aircraft.AS_annual_insurance_hull /
                                        (data[0].AS_annual_insurance_hull +
                                          data[1].AS_annual_insurance_hull +
                                          data[2].AS_annual_insurance_hull)) *
                                      100 +
                                    "%"
                                  : (country === "North America"
                                      ? aircraft.NA_annual_insurance_hull /
                                        (data[0].NA_annual_insurance_hull +
                                          data[1].NA_annual_insurance_hull)
                                      : country === "South America"
                                      ? aircraft.SA_annual_insurance_hull /
                                        (data[0].SA_annual_insurance_hull +
                                          data[1].SA_annual_insurance_hull)
                                      : country === "Europe"
                                      ? aircraft.EU_annual_insurance_hull /
                                        (data[0].EU_annual_insurance_hull +
                                          data[1].EU_annual_insurance_hull)
                                      : aircraft.AS_annual_insurance_hull /
                                        (data[0].AS_annual_insurance_hull +
                                          data[1].AS_annual_insurance_hull)) *
                                      100 +
                                    "%",
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <h5>Insurance Liability</h5>
              <div className={cn(styles.crew_salary)}>
                <div className={cn(styles.aircraft_names)}>
                  {data.map((aircraft, index) => {
                    return (
                      <div className={styles.key_value_bar}>
                        <div className={cn(styles.key_value)}>
                          <span>{aircraft.aircraft_name} </span>
                          <span>
                            {currency === "USD"
                              ? country === "North America"
                                ? "$" +
                                  numeral(
                                    aircraft.NA_annual_insurance_liability
                                  ).format("0,0")
                                : country === "South America"
                                ? "$" +
                                  numeral(
                                    aircraft.SA_annual_insurance_liability
                                  ).format("0,0")
                                : country === "Europe"
                                ? "$" +
                                  numeral(
                                    aircraft.EU_annual_insurance_liability
                                  ).format("0,0")
                                : "$" +
                                  numeral(
                                    aircraft.AS_annual_insurance_liability
                                  ).format("0,0")
                              : currency === "GBP"
                              ? country === "North America"
                                ? "£" +
                                  numeral(
                                    aircraft.NA_annual_insurance_liability *
                                      conversionRate
                                  ).format("0,0")
                                : country === "South America"
                                ? "£" +
                                  numeral(
                                    aircraft.SA_annual_insurance_liability *
                                      conversionRate
                                  ).format("0,0")
                                : country === "Europe"
                                ? "£" +
                                  numeral(
                                    aircraft.EU_annual_insurance_liability *
                                      conversionRate
                                  ).format("0,0")
                                : "£" +
                                  numeral(
                                    aircraft.AS_annual_insurance_liability *
                                      conversionRate
                                  ).format("0,0")
                              : country === "North America"
                              ? "€" +
                                numeral(
                                  aircraft.NA_annual_insurance_liability *
                                    conversionRate
                                ).format("0,0")
                              : country === "South America"
                              ? "€" +
                                numeral(
                                  aircraft.SA_annual_insurance_liability *
                                    conversionRate
                                ).format("0,0")
                              : country === "Europe"
                              ? "€" +
                                numeral(
                                  aircraft.EU_annual_insurance_liability *
                                    conversionRate
                                ).format("0,0")
                              : "€" +
                                numeral(
                                  aircraft.AS_annual_insurance_liability *
                                    conversionRate
                                ).format("0,0")}
                          </span>
                        </div>
                        <div className={cn(styles.bar)}>
                          <div
                            className={
                              index === 0
                                ? cn(styles.bar__fill1)
                                : index === 1
                                ? cn(styles.bar__fill2)
                                : cn(styles.bar__fill3)
                            }
                            style={{
                              width:
                                data[2] !== undefined
                                  ? (country === "North America"
                                      ? aircraft.NA_annual_insurance_liability /
                                        (data[0].NA_annual_insurance_liability +
                                          data[1]
                                            .NA_annual_insurance_liability +
                                          data[2].NA_annual_insurance_liability)
                                      : country === "South America"
                                      ? aircraft.SA_annual_insurance_liability /
                                        (data[0].SA_annual_insurance_liability +
                                          data[1]
                                            .SA_annual_insurance_liability +
                                          data[2].SA_annual_insurance_liability)
                                      : country === "Europe"
                                      ? aircraft.EU_annual_insurance_liability /
                                        (data[0].EU_annual_insurance_liability +
                                          data[1]
                                            .EU_annual_insurance_liability +
                                          data[2].EU_annual_insurance_liability)
                                      : aircraft.AS_annual_insurance_liability /
                                        (data[0].AS_annual_insurance_liability +
                                          data[1]
                                            .AS_annual_insurance_liability +
                                          data[2]
                                            .AS_annual_insurance_liability)) *
                                      100 +
                                    "%"
                                  : (country === "North America"
                                      ? aircraft.NA_annual_insurance_liability /
                                        (data[0].NA_annual_insurance_liability +
                                          data[1].NA_annual_insurance_liability)
                                      : country === "South America"
                                      ? aircraft.SA_annual_insurance_liability /
                                        (data[0].SA_annual_insurance_liability +
                                          data[1].SA_annual_insurance_liability)
                                      : country === "Europe"
                                      ? aircraft.EU_annual_insurance_liability /
                                        (data[0].EU_annual_insurance_liability +
                                          data[1].EU_annual_insurance_liability)
                                      : aircraft.AS_annual_insurance_liability /
                                        (data[0].AS_annual_insurance_liability +
                                          data[1]
                                            .AS_annual_insurance_liability)) *
                                      100 +
                                    "%",
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <h5>Management</h5>
              <div className={cn(styles.crew_salary)}>
                <div className={cn(styles.aircraft_names)}>
                  {data.map((aircraft, index) => {
                    return (
                      <div className={styles.key_value_bar}>
                        <div className={cn(styles.key_value)}>
                          <span>{aircraft.aircraft_name} </span>
                          <span>
                            {currency === "USD"
                              ? country === "North America"
                                ? "$" +
                                  numeral(aircraft.NA_annual_management).format(
                                    "0,0"
                                  )
                                : country === "South America"
                                ? "$" +
                                  numeral(aircraft.SA_annual_management).format(
                                    "0,0"
                                  )
                                : country === "Europe"
                                ? "$" +
                                  numeral(aircraft.EU_annual_management).format(
                                    "0,0"
                                  )
                                : "$" +
                                  numeral(aircraft.AS_annual_management).format(
                                    "0,0"
                                  )
                              : currency === "GBP"
                              ? country === "North America"
                                ? "£" +
                                  numeral(
                                    aircraft.NA_annual_management *
                                      conversionRate
                                  ).format("0,0")
                                : country === "South America"
                                ? "£" +
                                  numeral(
                                    aircraft.SA_annual_management *
                                      conversionRate
                                  ).format("0,0")
                                : country === "Europe"
                                ? "£" +
                                  numeral(
                                    aircraft.EU_annual_management *
                                      conversionRate
                                  ).format("0,0")
                                : "£" +
                                  numeral(
                                    aircraft.AS_annual_management *
                                      conversionRate
                                  ).format("0,0")
                              : country === "North America"
                              ? "€" +
                                numeral(
                                  aircraft.NA_annual_management * conversionRate
                                ).format("0,0")
                              : country === "South America"
                              ? "€" +
                                numeral(
                                  aircraft.SA_annual_management * conversionRate
                                ).format("0,0")
                              : country === "Europe"
                              ? "€" +
                                numeral(
                                  aircraft.EU_annual_management * conversionRate
                                ).format("0,0")
                              : "€" +
                                numeral(
                                  aircraft.AS_annual_management * conversionRate
                                ).format("0,0")}
                          </span>
                        </div>
                        <div className={cn(styles.bar)}>
                          <div
                            className={
                              index === 0
                                ? cn(styles.bar__fill1)
                                : index === 1
                                ? cn(styles.bar__fill2)
                                : cn(styles.bar__fill3)
                            }
                            style={{
                              width:
                                data[2] !== undefined
                                  ? (country === "North America"
                                      ? aircraft.NA_annual_management /
                                        (data[0].NA_annual_management +
                                          data[1].NA_annual_management +
                                          data[2].NA_annual_management)
                                      : country === "South America"
                                      ? aircraft.SA_annual_management /
                                        (data[0].SA_annual_management +
                                          data[1].SA_annual_management +
                                          data[2].SA_annual_management)
                                      : country === "Europe"
                                      ? aircraft.EU_annual_management /
                                        (data[0].EU_annual_management +
                                          data[1].EU_annual_management +
                                          data[2].EU_annual_management)
                                      : aircraft.AS_annual_management /
                                        (data[0].AS_annual_management +
                                          data[1].AS_annual_management +
                                          data[2].AS_annual_management)) *
                                      100 +
                                    "%"
                                  : (country === "North America"
                                      ? aircraft.NA_annual_management /
                                        (data[0].NA_annual_management +
                                          data[1].NA_annual_management)
                                      : country === "South America"
                                      ? aircraft.SA_annual_management /
                                        (data[0].SA_annual_management +
                                          data[1].SA_annual_management)
                                      : country === "Europe"
                                      ? aircraft.EU_annual_management /
                                        (data[0].EU_annual_management +
                                          data[1].EU_annual_management)
                                      : aircraft.AS_annual_management /
                                        (data[0].AS_annual_management +
                                          data[1].AS_annual_management)) *
                                      100 +
                                    "%",
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* <h5>Deprication Rate</h5>
              <div className={cn(styles.crew_salary)}>
                <div className={cn(styles.aircraft_names)}>
                  {data.map((aircraft, index) => {
                    return (
                      <div className={styles.key_value_bar}>
                        <div className={cn(styles.key_value)}>
                          <span>{aircraft.aircraft_name} </span>
                          <span>
                            {currency === "USD"
                              ? country === "North America"
                                ? "$" +
                                  numeral(
                                    aircraft.NA_annual_deprecation
                                  ).format("0,0")
                                : country === "South America"
                                ? "$" +
                                  numeral(
                                    aircraft.SA_annual_deprecation
                                  ).format("0,0")
                                : country === "Europe"
                                ? "$" +
                                  numeral(
                                    aircraft.EU_annual_deprecation
                                  ).format("0,0")
                                : "$" +
                                  numeral(
                                    aircraft.AS_annual_deprecation
                                  ).format("0,0")
                              : currency === "GBP"
                              ? country === "North America"
                                ? "£" +
                                  numeral(
                                    aircraft.NA_annual_deprecation *
                                      conversionRate
                                  ).format("0,0")
                                : country === "South America"
                                ? "£" +
                                  numeral(
                                    aircraft.SA_annual_deprecation *
                                      conversionRate
                                  ).format("0,0")
                                : country === "Europe"
                                ? "£" +
                                  numeral(
                                    aircraft.EU_annual_deprecation *
                                      conversionRate
                                  ).format("0,0")
                                : "£" +
                                  numeral(
                                    aircraft.AS_annual_deprecation *
                                      conversionRate
                                  ).format("0,0")
                              : country === "North America"
                              ? "€" +
                                numeral(
                                  aircraft.NA_annual_deprecation *
                                    conversionRate
                                ).format("0,0")
                              : country === "South America"
                              ? "€" +
                                numeral(
                                  aircraft.SA_annual_deprecation *
                                    conversionRate
                                ).format("0,0")
                              : country === "Europe"
                              ? "€" +
                                numeral(
                                  aircraft.EU_annual_deprecation *
                                    conversionRate
                                ).format("0,0")
                              : "€" +
                                numeral(
                                  aircraft.AS_annual_deprecation *
                                    conversionRate
                                ).format("0,0")}
                          </span>
                        </div>
                        <div className={cn(styles.bar)}>
                          <div
                            className={
                              index === 0
                                ? cn(styles.bar__fill1)
                                : index === 1
                                ? cn(styles.bar__fill2)
                                : cn(styles.bar__fill3)
                            }
                            style={{
                              width:
                                data[2] !== undefined
                                  ? (country === "North America"
                                      ? aircraft.NA_annual_deprecation /
                                        (data[0].NA_annual_deprecation +
                                          data[1].NA_annual_deprecation +
                                          data[2].NA_annual_deprecation)
                                      : country === "South America"
                                      ? aircraft.SA_annual_deprecation /
                                        (data[0].SA_annual_deprecation +
                                          data[1].SA_annual_deprecation +
                                          data[2].SA_annual_deprecation)
                                      : country === "Europe"
                                      ? aircraft.EU_annual_deprecation /
                                        (data[0].EU_annual_deprecation +
                                          data[1].EU_annual_deprecation +
                                          data[2].EU_annual_deprecation)
                                      : aircraft.AS_annual_deprecation /
                                        (data[0].AS_annual_deprecation +
                                          data[1].AS_annual_deprecation +
                                          data[2].AS_annual_deprecation)) *
                                      100 +
                                    "%"
                                  : (country === "North America"
                                      ? aircraft.NA_hourly_deprecation /
                                        (data[0].NA_hourly_deprecation +
                                          data[1].NA_hourly_deprecation)
                                      : country === "South America"
                                      ? aircraft.SA_hourly_deprecation /
                                        (data[0].SA_hourly_deprecation +
                                          data[1].SA_hourly_deprecation)
                                      : country === "Europe"
                                      ? aircraft.EU_hourly_deprecation /
                                        (data[0].EU_hourly_deprecation +
                                          data[1].EU_hourly_deprecation)
                                      : aircraft.AS_hourly_deprecation /
                                        (data[0].AS_hourly_deprecation +
                                          data[1].AS_hourly_deprecation)) *
                                      100 +
                                    "%",
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div> */}
              <h5>Misc Fixed</h5>
              <div className={cn(styles.crew_salary)}>
                <div className={cn(styles.aircraft_names)}>
                  {data.map((aircraft, index) => {
                    return (
                      <div className={styles.key_value_bar}>
                        <div className={cn(styles.key_value)}>
                          <span>{aircraft.aircraft_name} </span>
                          <span>
                            {currency === "USD"
                              ? country === "North America"
                                ? "$" +
                                  numeral(aircraft.NA_annual_misc).format("0,0")
                                : country === "South America"
                                ? "$" +
                                  numeral(aircraft.SA_annual_misc).format("0,0")
                                : country === "Europe"
                                ? "$" +
                                  numeral(aircraft.EU_annual_misc).format("0,0")
                                : "$" +
                                  numeral(aircraft.AS_annual_misc).format("0,0")
                              : currency === "GBP"
                              ? country === "North America"
                                ? "£" +
                                  numeral(
                                    aircraft.NA_annual_misc * conversionRate
                                  ).format("0,0")
                                : country === "South America"
                                ? "£" +
                                  numeral(
                                    aircraft.SA_annual_misc * conversionRate
                                  ).format("0,0")
                                : country === "Europe"
                                ? "£" +
                                  numeral(
                                    aircraft.EU_annual_misc * conversionRate
                                  ).format("0,0")
                                : "£" +
                                  numeral(
                                    aircraft.AS_annual_misc * conversionRate
                                  ).format("0,0")
                              : country === "North America"
                              ? "€" +
                                numeral(
                                  aircraft.NA_annual_misc * conversionRate
                                ).format("0,0")
                              : country === "South America"
                              ? "€" +
                                numeral(
                                  aircraft.SA_annual_misc * conversionRate
                                ).format("0,0")
                              : country === "Europe"
                              ? "€" +
                                numeral(
                                  aircraft.EU_annual_misc * conversionRate
                                ).format("0,0")
                              : "€" +
                                numeral(
                                  aircraft.AS_annual_misc * conversionRate
                                ).format("0,0")}
                          </span>
                        </div>
                        <div className={cn(styles.bar)}>
                          <div
                            className={
                              index === 0
                                ? cn(styles.bar__fill1)
                                : index === 1
                                ? cn(styles.bar__fill2)
                                : cn(styles.bar__fill3)
                            }
                            style={{
                              width:
                                data[2] !== undefined
                                  ? (country === "North America"
                                      ? aircraft.NA_annual_misc /
                                        (data[0].NA_annual_misc +
                                          data[1].NA_annual_misc +
                                          data[2].NA_annual_misc)
                                      : country === "South America"
                                      ? aircraft.SA_annual_misc /
                                        (data[0].SA_annual_misc +
                                          data[1].SA_annual_misc +
                                          data[2].SA_annual_misc)
                                      : country === "Europe"
                                      ? aircraft.EU_annual_misc /
                                        (data[0].EU_annual_misc +
                                          data[1].EU_annual_misc +
                                          data[2].EU_annual_misc)
                                      : aircraft.AS_annual_misc /
                                        (data[0].AS_annual_misc +
                                          data[1].AS_annual_misc +
                                          data[2].AS_annual_misc)) *
                                      100 +
                                    "%"
                                  : (country === "North America"
                                      ? aircraft.NA_hourly_misc /
                                        (data[0].NA_hourly_misc +
                                          data[1].NA_hourly_misc)
                                      : country === "South America"
                                      ? aircraft.SA_hourly_misc /
                                        (data[0].SA_hourly_misc +
                                          data[1].SA_hourly_misc)
                                      : country === "Europe"
                                      ? aircraft.EU_hourly_misc /
                                        (data[0].EU_hourly_misc +
                                          data[1].EU_hourly_misc)
                                      : aircraft.AS_hourly_misc /
                                        (data[0].AS_hourly_misc +
                                          data[1].AS_hourly_misc)) *
                                      100 +
                                    "%",
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <br></br>
            <br></br>
            <h3>Variable Costs Breakdown</h3>
            <div>
              <h5>Fuel Cost</h5>
              <div className={cn(styles.crew_salary)}>
                <div className={cn(styles.aircraft_names)}>
                  {data.map((aircraft, index) => {
                    return (
                      <div className={styles.key_value_bar}>
                        <div className={cn(styles.key_value)}>
                          <span>{aircraft.aircraft_name} </span>
                          <span>
                            {currency === "USD"
                              ? country === "North America"
                                ? "$" +
                                  numeral(aircraft.NA_hourly_fuel).format("0,0")
                                : country === "South America"
                                ? "$" +
                                  numeral(aircraft.SA_hourly_fuel).format("0,0")
                                : country === "Europe"
                                ? "$" +
                                  numeral(aircraft.EU_hourly_fuel).format("0,0")
                                : "$" +
                                  numeral(aircraft.AS_hourly_fuel).format("0,0")
                              : currency === "GBP"
                              ? country === "North America"
                                ? "£" +
                                  numeral(
                                    aircraft.NA_hourly_fuel * conversionRate
                                  ).format("0,0")
                                : country === "South America"
                                ? "£" +
                                  numeral(
                                    aircraft.SA_hourly_fuel * conversionRate
                                  ).format("0,0")
                                : country === "Europe"
                                ? "£" +
                                  numeral(
                                    aircraft.EU_hourly_fuel * conversionRate
                                  ).format("0,0")
                                : "£" +
                                  numeral(
                                    aircraft.AS_hourly_fuel * conversionRate
                                  ).format("0,0")
                              : country === "North America"
                              ? "€" +
                                numeral(
                                  aircraft.NA_hourly_fuel * conversionRate
                                ).format("0,0")
                              : country === "South America"
                              ? "€" +
                                numeral(
                                  aircraft.SA_hourly_fuel * conversionRate
                                ).format("0,0")
                              : country === "Europe"
                              ? "€" +
                                numeral(
                                  aircraft.EU_hourly_fuel * conversionRate
                                ).format("0,0")
                              : "€" +
                                numeral(
                                  aircraft.AS_hourly_fuel * conversionRate
                                ).format("0,0")}
                          </span>
                        </div>
                        <div className={cn(styles.bar)}>
                          <div
                            className={
                              index === 0
                                ? cn(styles.bar__fill1)
                                : index === 1
                                ? cn(styles.bar__fill2)
                                : cn(styles.bar__fill3)
                            }
                            style={{
                              width:
                                data[2] !== undefined
                                  ? (country === "North America"
                                      ? aircraft.NA_hourly_fuel /
                                        (data[0].NA_hourly_fuel +
                                          data[1].NA_hourly_fuel +
                                          data[2].NA_hourly_fuel)
                                      : country === "South America"
                                      ? aircraft.SA_hourly_fuel /
                                        (data[0].SA_hourly_fuel +
                                          data[1].SA_hourly_fuel +
                                          data[2].SA_hourly_fuel)
                                      : country === "Europe"
                                      ? aircraft.EU_hourly_fuel /
                                        (data[0].EU_hourly_fuel +
                                          data[1].EU_hourly_fuel +
                                          data[2].EU_hourly_fuel)
                                      : aircraft.AS_hourly_fuel /
                                        (data[0].AS_hourly_fuel +
                                          data[1].AS_hourly_fuel +
                                          data[2].AS_hourly_fuel)) *
                                      100 +
                                    "%"
                                  : (country === "North America"
                                      ? aircraft.NA_hourly_fuel /
                                        (data[0].NA_hourly_fuel +
                                          data[1].NA_hourly_fuel)
                                      : country === "South America"
                                      ? aircraft.SA_hourly_fuel /
                                        (data[0].SA_hourly_fuel +
                                          data[1].SA_hourly_fuel)
                                      : country === "Europe"
                                      ? aircraft.EU_hourly_fuel /
                                        (data[0].EU_hourly_fuel +
                                          data[1].EU_hourly_fuel)
                                      : aircraft.AS_hourly_fuel /
                                        (data[0].AS_hourly_fuel +
                                          data[1].AS_hourly_fuel)) *
                                      100 +
                                    "%",
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <h5>Maintenance</h5>
              <div className={cn(styles.crew_salary)}>
                <div className={cn(styles.aircraft_names)}>
                  {data.map((aircraft, index) => {
                    return (
                      <div className={styles.key_value_bar}>
                        <div className={cn(styles.key_value)}>
                          <span>{aircraft.aircraft_name} </span>
                          <span>
                            {currency === "USD"
                              ? country === "North America"
                                ? "$" +
                                  numeral(
                                    aircraft.NA_hourly_maintenance
                                  ).format("0,0")
                                : country === "South America"
                                ? "$" +
                                  numeral(
                                    aircraft.SA_hourly_maintenance
                                  ).format("0,0")
                                : country === "Europe"
                                ? "$" +
                                  numeral(
                                    aircraft.EU_hourly_maintenance
                                  ).format("0,0")
                                : "$" +
                                  numeral(
                                    aircraft.AS_hourly_maintenance
                                  ).format("0,0")
                              : currency === "GBP"
                              ? country === "North America"
                                ? "£" +
                                  numeral(
                                    aircraft.NA_hourly_maintenance *
                                      conversionRate
                                  ).format("0,0")
                                : country === "South America"
                                ? "£" +
                                  numeral(
                                    aircraft.SA_hourly_maintenance *
                                      conversionRate
                                  ).format("0,0")
                                : country === "Europe"
                                ? "£" +
                                  numeral(
                                    aircraft.EU_hourly_maintenance *
                                      conversionRate
                                  ).format("0,0")
                                : "£" +
                                  numeral(
                                    aircraft.AS_hourly_maintenance *
                                      conversionRate
                                  ).format("0,0")
                              : country === "North America"
                              ? "€" +
                                numeral(
                                  aircraft.NA_hourly_maintenance *
                                    conversionRate
                                ).format("0,0")
                              : country === "South America"
                              ? "€" +
                                numeral(
                                  aircraft.SA_hourly_maintenance *
                                    conversionRate
                                ).format("0,0")
                              : country === "Europe"
                              ? "€" +
                                numeral(
                                  aircraft.EU_hourly_maintenance *
                                    conversionRate
                                ).format("0,0")
                              : "€" +
                                numeral(
                                  aircraft.AS_hourly_maintenance *
                                    conversionRate
                                ).format("0,0")}
                          </span>
                        </div>
                        <div className={cn(styles.bar)}>
                          <div
                            className={
                              index === 0
                                ? cn(styles.bar__fill1)
                                : index === 1
                                ? cn(styles.bar__fill2)
                                : cn(styles.bar__fill3)
                            }
                            style={{
                              width:
                                data[2] !== undefined
                                  ? (country === "North America"
                                      ? aircraft.NA_hourly_maintenance /
                                        (data[0].NA_hourly_maintenance +
                                          data[1].NA_hourly_maintenance +
                                          data[2].NA_hourly_maintenance)
                                      : country === "South America"
                                      ? aircraft.SA_hourly_maintenance /
                                        (data[0].SA_hourly_maintenance +
                                          data[1].SA_hourly_maintenance +
                                          data[2].SA_hourly_maintenance)
                                      : country === "Europe"
                                      ? aircraft.EU_hourly_maintenance /
                                        (data[0].EU_hourly_maintenance +
                                          data[1].EU_hourly_maintenance +
                                          data[2].EU_hourly_maintenance)
                                      : aircraft.AS_hourly_maintenance /
                                        (data[0].AS_hourly_maintenance +
                                          data[1].AS_hourly_maintenance +
                                          data[2].AS_hourly_maintenance)) *
                                      100 +
                                    "%"
                                  : (country === "North America"
                                      ? aircraft.NA_hourly_maintenance /
                                        (data[0].NA_hourly_maintenance +
                                          data[1].NA_hourly_maintenance)
                                      : country === "South America"
                                      ? aircraft.SA_hourly_maintenance /
                                        (data[0].SA_hourly_maintenance +
                                          data[1].SA_hourly_maintenance)
                                      : country === "Europe"
                                      ? aircraft.EU_hourly_maintenance /
                                        (data[0].EU_hourly_maintenance +
                                          data[1].EU_hourly_maintenance)
                                      : aircraft.AS_hourly_maintenance /
                                        (data[0].AS_hourly_maintenance +
                                          data[1].AS_hourly_maintenance)) *
                                      100 +
                                    "%",
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <h5>Engine Overhaul</h5>
              <div className={cn(styles.crew_salary)}>
                <div className={cn(styles.aircraft_names)}>
                  {data.map((aircraft, index) => {
                    return (
                      <div className={styles.key_value_bar}>
                        <div className={cn(styles.key_value)}>
                          <span>{aircraft.aircraft_name} </span>
                          <span>
                            {currency === "USD"
                              ? country === "North America"
                                ? "$" +
                                  numeral(
                                    aircraft.NA_hourly_engine_overhaul
                                  ).format("0,0")
                                : country === "South America"
                                ? "$" +
                                  numeral(
                                    aircraft.SA_hourly_engine_overhaul
                                  ).format("0,0")
                                : country === "Europe"
                                ? "$" +
                                  numeral(
                                    aircraft.EU_hourly_engine_overhaul
                                  ).format("0,0")
                                : "$" +
                                  numeral(
                                    aircraft.AS_hourly_engine_overhaul
                                  ).format("0,0")
                              : currency === "GBP"
                              ? country === "North America"
                                ? "£" +
                                  numeral(
                                    aircraft.NA_hourly_engine_overhaul *
                                      conversionRate
                                  ).format("0,0")
                                : country === "South America"
                                ? "£" +
                                  numeral(
                                    aircraft.SA_hourly_engine_overhaul *
                                      conversionRate
                                  ).format("0,0")
                                : country === "Europe"
                                ? "£" +
                                  numeral(
                                    aircraft.EU_hourly_engine_overhaul *
                                      conversionRate
                                  ).format("0,0")
                                : "£" +
                                  numeral(
                                    aircraft.AS_hourly_engine_overhaul *
                                      conversionRate
                                  ).format("0,0")
                              : country === "North America"
                              ? "€" +
                                numeral(
                                  aircraft.NA_hourly_engine_overhaul *
                                    conversionRate
                                ).format("0,0")
                              : country === "South America"
                              ? "€" +
                                numeral(
                                  aircraft.SA_hourly_engine_overhaul *
                                    conversionRate
                                ).format("0,0")
                              : country === "Europe"
                              ? "€" +
                                numeral(
                                  aircraft.EU_hourly_engine_overhaul *
                                    conversionRate
                                ).format("0,0")
                              : "€" +
                                numeral(
                                  aircraft.AS_hourly_engine_overhaul *
                                    conversionRate
                                ).format("0,0")}
                          </span>
                        </div>
                        <div className={cn(styles.bar)}>
                          <div
                            className={
                              index === 0
                                ? cn(styles.bar__fill1)
                                : index === 1
                                ? cn(styles.bar__fill2)
                                : cn(styles.bar__fill3)
                            }
                            style={{
                              width:
                                data[2] !== undefined
                                  ? (country === "North America"
                                      ? aircraft.NA_hourly_engine_overhaul /
                                        (data[0].NA_hourly_engine_overhaul +
                                          data[1].NA_hourly_engine_overhaul +
                                          data[2].NA_hourly_engine_overhaul)
                                      : country === "South America"
                                      ? aircraft.SA_hourly_engine_overhaul /
                                        (data[0].SA_hourly_engine_overhaul +
                                          data[1].SA_hourly_engine_overhaul +
                                          data[2].SA_hourly_engine_overhaul)
                                      : country === "Europe"
                                      ? aircraft.EU_hourly_engine_overhaul /
                                        (data[0].EU_hourly_engine_overhaul +
                                          data[1].EU_hourly_engine_overhaul +
                                          data[2].EU_hourly_engine_overhaul)
                                      : aircraft.AS_hourly_engine_overhaul /
                                        (data[0].AS_hourly_engine_overhaul +
                                          data[1].AS_hourly_engine_overhaul +
                                          data[2].AS_hourly_engine_overhaul)) *
                                      100 +
                                    "%"
                                  : (country === "North America"
                                      ? aircraft.NA_hourly_engine_overhaul /
                                        (data[0].NA_hourly_engine_overhaul +
                                          data[1].NA_hourly_engine_overhaul)
                                      : country === "South America"
                                      ? aircraft.SA_hourly_engine_overhaul /
                                        (data[0].SA_hourly_engine_overhaul +
                                          data[1].SA_hourly_engine_overhaul)
                                      : country === "Europe"
                                      ? aircraft.EU_hourly_engine_overhaul /
                                        (data[0].EU_hourly_engine_overhaul +
                                          data[1].EU_hourly_engine_overhaul)
                                      : aircraft.AS_hourly_engine_overhaul /
                                        (data[0].AS_hourly_engine_overhaul +
                                          data[1].AS_hourly_engine_overhaul)) *
                                      100 +
                                    "%",
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <h5>Ground Fees</h5>
              <div className={cn(styles.crew_salary)}>
                <div className={cn(styles.aircraft_names)}>
                  {data.map((aircraft, index) => {
                    return (
                      <div className={styles.key_value_bar}>
                        <div className={cn(styles.key_value)}>
                          <span>{aircraft.aircraft_name} </span>
                          <span>
                            {currency === "USD"
                              ? country === "North America"
                                ? "$" +
                                  numeral(
                                    aircraft.NA_hourly_ground_fees
                                  ).format("0,0")
                                : country === "South America"
                                ? "$" +
                                  numeral(
                                    aircraft.SA_hourly_ground_fees
                                  ).format("0,0")
                                : country === "Europe"
                                ? "$" +
                                  numeral(
                                    aircraft.EU_hourly_ground_fees
                                  ).format("0,0")
                                : "$" +
                                  numeral(
                                    aircraft.AS_hourly_ground_fees
                                  ).format("0,0")
                              : currency === "GBP"
                              ? country === "North America"
                                ? "£" +
                                  numeral(
                                    aircraft.NA_hourly_ground_fees *
                                      conversionRate
                                  ).format("0,0")
                                : country === "South America"
                                ? "£" +
                                  numeral(
                                    aircraft.SA_hourly_ground_fees *
                                      conversionRate
                                  ).format("0,0")
                                : country === "Europe"
                                ? "£" +
                                  numeral(
                                    aircraft.EU_hourly_ground_fees *
                                      conversionRate
                                  ).format("0,0")
                                : "£" +
                                  numeral(
                                    aircraft.AS_hourly_ground_fees *
                                      conversionRate
                                  ).format("0,0")
                              : country === "North America"
                              ? "€" +
                                numeral(
                                  aircraft.NA_hourly_ground_fees *
                                    conversionRate
                                ).format("0,0")
                              : country === "South America"
                              ? "€" +
                                numeral(
                                  aircraft.SA_hourly_ground_fees *
                                    conversionRate
                                ).format("0,0")
                              : country === "Europe"
                              ? "€" +
                                numeral(
                                  aircraft.EU_hourly_ground_fees *
                                    conversionRate
                                ).format("0,0")
                              : "€" +
                                numeral(
                                  aircraft.AS_hourly_ground_fees *
                                    conversionRate
                                ).format("0,0")}
                          </span>
                        </div>
                        <div className={cn(styles.bar)}>
                          <div
                            className={
                              index === 0
                                ? cn(styles.bar__fill1)
                                : index === 1
                                ? cn(styles.bar__fill2)
                                : cn(styles.bar__fill3)
                            }
                            style={{
                              width:
                                data[2] !== undefined
                                  ? (country === "North America"
                                      ? aircraft.NA_hourly_ground_fees /
                                        (data[0].NA_hourly_ground_fees +
                                          data[1].NA_hourly_ground_fees +
                                          data[2].NA_hourly_ground_fees)
                                      : country === "South America"
                                      ? aircraft.SA_hourly_ground_fees /
                                        (data[0].SA_hourly_ground_fees +
                                          data[1].SA_hourly_ground_fees +
                                          data[2].SA_hourly_ground_fees)
                                      : country === "Europe"
                                      ? aircraft.EU_hourly_ground_fees /
                                        (data[0].EU_hourly_ground_fees +
                                          data[1].EU_hourly_ground_fees +
                                          data[2].EU_hourly_ground_fees)
                                      : aircraft.AS_hourly_ground_fees /
                                        (data[0].AS_hourly_ground_fees +
                                          data[1].AS_hourly_ground_fees +
                                          data[2].AS_hourly_ground_fees)) *
                                      100 +
                                    "%"
                                  : (country === "North America"
                                      ? aircraft.NA_hourly_ground_fees /
                                        (data[0].NA_hourly_ground_fees +
                                          data[1].NA_hourly_ground_fees)
                                      : country === "South America"
                                      ? aircraft.SA_hourly_ground_fees /
                                        (data[0].SA_hourly_ground_fees +
                                          data[1].SA_hourly_ground_fees)
                                      : country === "Europe"
                                      ? aircraft.EU_hourly_ground_fees /
                                        (data[0].EU_hourly_ground_fees +
                                          data[1].EU_hourly_ground_fees)
                                      : aircraft.AS_hourly_ground_fees /
                                        (data[0].AS_hourly_ground_fees +
                                          data[1].AS_hourly_ground_fees)) *
                                      100 +
                                    "%",
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <h5>Misc Variable</h5>
              <div className={cn(styles.crew_salary)}>
                <div className={cn(styles.aircraft_names)}>
                  {data.map((aircraft, index) => {
                    return (
                      <div className={styles.key_value_bar}>
                        <div className={cn(styles.key_value)}>
                          <span>{aircraft.aircraft_name} </span>
                          <span>
                            {currency === "USD"
                              ? country === "North America"
                                ? "$" +
                                  numeral(aircraft.NA_hourly_misc).format("0,0")
                                : country === "South America"
                                ? "$" +
                                  numeral(aircraft.SA_hourly_misc).format("0,0")
                                : country === "Europe"
                                ? "$" +
                                  numeral(aircraft.EU_hourly_misc).format("0,0")
                                : "$" +
                                  numeral(aircraft.AS_hourly_misc).format("0,0")
                              : currency === "GBP"
                              ? country === "North America"
                                ? "£" +
                                  numeral(
                                    aircraft.NA_hourly_misc * conversionRate
                                  ).format("0,0")
                                : country === "South America"
                                ? "£" +
                                  numeral(
                                    aircraft.SA_hourly_misc * conversionRate
                                  ).format("0,0")
                                : country === "Europe"
                                ? "£" +
                                  numeral(
                                    aircraft.EU_hourly_misc * conversionRate
                                  ).format("0,0")
                                : "£" +
                                  numeral(
                                    aircraft.AS_hourly_misc * conversionRate
                                  ).format("0,0")
                              : country === "North America"
                              ? "€" +
                                numeral(
                                  aircraft.NA_hourly_misc * conversionRate
                                ).format("0,0")
                              : country === "South America"
                              ? "€" +
                                numeral(
                                  aircraft.SA_hourly_misc * conversionRate
                                ).format("0,0")
                              : country === "Europe"
                              ? "€" +
                                numeral(
                                  aircraft.EU_hourly_misc * conversionRate
                                ).format("0,0")
                              : "€" +
                                numeral(
                                  aircraft.AS_hourly_misc * conversionRate
                                ).format("0,0")}
                          </span>
                        </div>
                        <div className={cn(styles.bar)}>
                          <div
                            className={
                              index === 0
                                ? cn(styles.bar__fill1)
                                : index === 1
                                ? cn(styles.bar__fill2)
                                : cn(styles.bar__fill3)
                            }
                            style={{
                              width:
                                data[2] !== undefined
                                  ? (country === "North America"
                                      ? aircraft.NA_hourly_misc /
                                        (data[0].NA_hourly_misc +
                                          data[1].NA_hourly_misc +
                                          data[2].NA_hourly_misc)
                                      : country === "South America"
                                      ? aircraft.SA_hourly_misc /
                                        (data[0].SA_hourly_misc +
                                          data[1].SA_hourly_misc +
                                          data[2].SA_hourly_misc)
                                      : country === "Europe"
                                      ? aircraft.EU_hourly_misc /
                                        (data[0].EU_hourly_misc +
                                          data[1].EU_hourly_misc +
                                          data[2].EU_hourly_misc)
                                      : aircraft.AS_hourly_misc /
                                        (data[0].AS_hourly_misc +
                                          data[1].AS_hourly_misc +
                                          data[2].AS_hourly_misc)) *
                                      100 +
                                    "%"
                                  : (country === "North America"
                                      ? aircraft.NA_hourly_misc /
                                        (data[0].NA_hourly_misc +
                                          data[1].NA_hourly_misc)
                                      : country === "South America"
                                      ? aircraft.SA_hourly_misc /
                                        (data[0].SA_hourly_misc +
                                          data[1].SA_hourly_misc)
                                      : country === "Europe"
                                      ? aircraft.EU_hourly_misc /
                                        (data[0].EU_hourly_misc +
                                          data[1].EU_hourly_misc)
                                      : aircraft.AS_hourly_misc /
                                        (data[0].AS_hourly_misc +
                                          data[1].AS_hourly_misc)) *
                                      100 +
                                    "%",
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
export default OwnershipCost;
