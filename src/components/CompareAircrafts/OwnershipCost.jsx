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
        ? ((country === "North America"
            ? parseFloat(data[0].NA_annual_total)
            : country === "Europe"
            ? parseFloat(data[0].EU_annual_total)
            : country === "South America"
            ? parseFloat(data[0].SA_annual_total)
            : parseFloat(data[0].AS_annual_total)) +
            parseFloat(e.target.value)) *
            conversionRate
        : (country === "North America"
            ? parseFloat(data[0].NA_annual_total)
            : country === "Europe"
            ? parseFloat(data[0].EU_annual_total)
            : country === "South America"
            ? parseFloat(data[0].SA_annual_total)
            : parseFloat(data[0].AS_annual_total)) + parseFloat(e.target.value)
    );
    if (e.target.value === "") {
      setAnnualBudget0(data[0].NA_annual_total);
    }

    setAnnualBudget1(
      currency !== "USD"
        ? ((country === "North America"
            ? parseFloat(data[1].NA_annual_total)
            : country === "Europe"
            ? parseFloat(data[1].EU_annual_total)
            : country === "South America"
            ? parseFloat(data[1].SA_annual_total)
            : parseFloat(data[1].AS_annual_total)) +
            parseFloat(e.target.value)) *
            conversionRate
        : (country === "North America"
            ? parseFloat(data[1].NA_annual_total)
            : country === "Europe"
            ? parseFloat(data[1].EU_annual_total)
            : country === "South America"
            ? parseFloat(data[1].SA_annual_total)
            : parseFloat(data[1].AS_annual_total)) + parseFloat(e.target.value)
    );
    if (e.target.value === "") {
      setAnnualBudget1(data[1].NA_annual_total);
    }

    if (data[1] !== undefined) {
      setAnnualBudget2(
        currency !== "USD"
          ? ((country === "North America"
              ? parseFloat(data[2].NA_annual_total)
              : country === "Europe"
              ? parseFloat(data[2].EU_annual_total)
              : country === "South America"
              ? parseFloat(data[2].SA_annual_total)
              : parseFloat(data[2].AS_annual_total)) +
              parseFloat(e.target.value)) *
              conversionRate
          : (country === "North America"
              ? parseFloat(data[2].NA_annual_total)
              : country === "Europe"
              ? parseFloat(data[2].EU_annual_total)
              : country === "South America"
              ? parseFloat(data[2].SA_annual_total)
              : parseFloat(data[2].AS_annual_total)) +
              parseFloat(e.target.value)
      );
      if (e.target.value === "") {
        setAnnualBudget2(data[2].NA_annual_total);
      }
    }
  };

  return (
    <>
      <section className={cn(global.section)}>
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

                  <span className={cn(styles.compare_table_column_cell)}>
                    {currency === "USD" ? "$" : currency === "GBP" ? "£" : "€"}
                    {index === 0
                      ? annualBudget0 === 0
                        ? "-"
                        : numeral(annualBudget0).format("0,0")
                      : index === 1
                      ? annualBudget1 === 0
                        ? "-"
                        : numeral(annualBudget1).format("0,0")
                      : annualBudget2 === 0
                      ? "-"
                      : numeral(annualBudget2).format("0,0")}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {currency === "USD"
                      ? country === "North America"
                        ? "$" + numeral(aircraft.NA_annual_total).format("0,0")
                        : country === "South America"
                        ? "$" + numeral(aircraft.SA_annual_total).format("0,0")
                        : country === "Europe"
                        ? "$" + numeral(aircraft.EU_annual_total).format("0,0")
                        : "$" + numeral(aircraft.AS_annual_total).format("0,0")
                      : currency === "GBP"
                      ? country === "North America"
                        ? "£" +
                          numeral(
                            aircraft.NA_annual_total * conversionRate
                          ).format("0,0")
                        : country === "South America"
                        ? "£" +
                          numeral(
                            aircraft.SA_annual_total * conversionRate
                          ).format("0,0")
                        : country === "Europe"
                        ? "£" +
                          numeral(
                            aircraft.EU_annual_total * conversionRate
                          ).format("0,0")
                        : "£" +
                          numeral(
                            aircraft.AS_annual_total * conversionRate
                          ).format("0,0")
                      : country === "North America"
                      ? "€" +
                        numeral(
                          aircraft.NA_annual_total * conversionRate
                        ).format("0,0")
                      : country === "South America"
                      ? "€" +
                        numeral(
                          aircraft.SA_annual_total * conversionRate
                        ).format("0,0")
                      : country === "Europe"
                      ? "€" +
                        numeral(
                          aircraft.EU_annual_total * conversionRate
                        ).format("0,0")
                      : "€" +
                        numeral(
                          aircraft.AS_annual_total * conversionRate
                        ).format("0,0")}
                  </span>
                  <span className={cn(styles.compare_table_column_cell)}>
                    {currency === "USD"
                      ? country === "North America"
                        ? "$" + numeral(aircraft.NA_hourly_total).format("0,0")
                        : country === "South America"
                        ? "$" + numeral(aircraft.SA_hourly_total).format("0,0")
                        : country === "Europe"
                        ? "$" + numeral(aircraft.EU_hourly_total).format("0,0")
                        : "$" + numeral(aircraft.AS_hourly_total).format("0,0")
                      : currency === "GBP"
                      ? country === "North America"
                        ? "£" +
                          numeral(
                            aircraft.NA_hourly_total * conversionRate
                          ).format("0,0")
                        : country === "South America"
                        ? "£" +
                          numeral(
                            aircraft.SA_hourly_total * conversionRate
                          ).format("0,0")
                        : country === "Europe"
                        ? "£" +
                          numeral(
                            aircraft.EU_hourly_total * conversionRate
                          ).format("0,0")
                        : "£" +
                          numeral(
                            aircraft.AS_hourly_total * conversionRate
                          ).format("0,0")
                      : country === "North America"
                      ? "€" +
                        numeral(
                          aircraft.NA_hourly_total * conversionRate
                        ).format("0,0")
                      : country === "South America"
                      ? "€" +
                        numeral(
                          aircraft.SA_hourly_total * conversionRate
                        ).format("0,0")
                      : country === "Europe"
                      ? "€" +
                        numeral(
                          aircraft.EU_hourly_total * conversionRate
                        ).format("0,0")
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
            <h3>Annual Fixed Costs Breakdown</h3>
            <div>
              <h5>Crew Salary</h5>
              <div className={cn(styles.crew_salary)}>
                <div className={cn(styles.aircraft_names)}>
                  {data.map((aircraft) => {
                    return (
                      <div
                        className={cn(styles.aircraft_name)}
                        key={aircraft.aircraft_id}
                      >
                        {aircraft.aircraft_name}
                      </div>
                    );
                  })}
                </div>
                <div className={cn(styles.bars)}>
                  {data.map((aircraft) => {
                    return (
                      <div
                        className={cn(styles.bar)}
                        key={aircraft.aircraft_id}
                      >
                        {aircraft.NA_annual_captain +
                          aircraft.NA_annual_first_office}
                      </div>
                    );
                  })}
                </div>
              </div>
              <h5>Crew Training</h5>
              <div className={cn(styles.crew_salary)}>
                <div className={cn(styles.aircraft_names)}>
                  {data.map((aircraft) => {
                    return (
                      <div
                        className={cn(styles.aircraft_name)}
                        key={aircraft.aircraft_id}
                      >
                        {aircraft.aircraft_name}
                      </div>
                    );
                  })}
                </div>
                <div className={cn(styles.bars)}>
                  {data.map((aircraft) => {
                    return (
                      <div
                        className={cn(styles.bar)}
                        key={aircraft.aircraft_id}
                      >
                        {aircraft.NA_annual_captain +
                          aircraft.NA_annual_first_office}
                      </div>
                    );
                  })}
                </div>
              </div>
              <h5>Hangar</h5>
              <div className={cn(styles.crew_salary)}>
                <div className={cn(styles.aircraft_names)}>
                  {data.map((aircraft) => {
                    return (
                      <div
                        className={cn(styles.aircraft_name)}
                        key={aircraft.aircraft_id}
                      >
                        {aircraft.aircraft_name}
                      </div>
                    );
                  })}
                </div>
                <div className={cn(styles.bars)}>
                  {data.map((aircraft) => {
                    return (
                      <div
                        className={cn(styles.bar)}
                        key={aircraft.aircraft_id}
                      >
                        {aircraft.NA_annual_captain +
                          aircraft.NA_annual_first_office}
                      </div>
                    );
                  })}
                </div>
              </div>
              <h5>Insurance Hull</h5>
              <div className={cn(styles.crew_salary)}>
                <div className={cn(styles.aircraft_names)}>
                  {data.map((aircraft) => {
                    return (
                      <div
                        className={cn(styles.aircraft_name)}
                        key={aircraft.aircraft_id}
                      >
                        {aircraft.aircraft_name}
                      </div>
                    );
                  })}
                </div>
                <div className={cn(styles.bars)}>
                  {data.map((aircraft) => {
                    return (
                      <div
                        className={cn(styles.bar)}
                        key={aircraft.aircraft_id}
                      >
                        {aircraft.NA_annual_captain +
                          aircraft.NA_annual_first_office}
                      </div>
                    );
                  })}
                </div>
              </div>
              <h5>Insurance Liability</h5>
              <div className={cn(styles.crew_salary)}>
                <div className={cn(styles.aircraft_names)}>
                  {data.map((aircraft) => {
                    return (
                      <div
                        className={cn(styles.aircraft_name)}
                        key={aircraft.aircraft_id}
                      >
                        {aircraft.aircraft_name}
                      </div>
                    );
                  })}
                </div>
                <div className={cn(styles.bars)}>
                  {data.map((aircraft) => {
                    return (
                      <div
                        className={cn(styles.bar)}
                        key={aircraft.aircraft_id}
                      >
                        {aircraft.NA_annual_captain +
                          aircraft.NA_annual_first_office}
                      </div>
                    );
                  })}
                </div>
              </div>
              <h5>Management</h5>
              <div className={cn(styles.crew_salary)}>
                <div className={cn(styles.aircraft_names)}>
                  {data.map((aircraft) => {
                    return (
                      <div
                        className={cn(styles.aircraft_name)}
                        key={aircraft.aircraft_id}
                      >
                        {aircraft.aircraft_name}
                      </div>
                    );
                  })}
                </div>
                <div className={cn(styles.bars)}>
                  {data.map((aircraft) => {
                    return (
                      <div
                        className={cn(styles.bar)}
                        key={aircraft.aircraft_id}
                      >
                        {aircraft.NA_annual_captain +
                          aircraft.NA_annual_first_office}
                      </div>
                    );
                  })}
                </div>
              </div>
              <h5>Deprication Rate</h5>
              <div className={cn(styles.crew_salary)}>
                <div className={cn(styles.aircraft_names)}>
                  {data.map((aircraft) => {
                    return (
                      <div
                        className={cn(styles.aircraft_name)}
                        key={aircraft.aircraft_id}
                      >
                        {aircraft.aircraft_name}
                      </div>
                    );
                  })}
                </div>
                <div className={cn(styles.bars)}>
                  {data.map((aircraft) => {
                    return (
                      <div
                        className={cn(styles.bar)}
                        key={aircraft.aircraft_id}
                      >
                        {aircraft.NA_annual_captain +
                          aircraft.NA_annual_first_office}
                      </div>
                    );
                  })}
                </div>
              </div>
              <h5>Misc Fixed</h5>
              <div className={cn(styles.crew_salary)}>
                <div className={cn(styles.aircraft_names)}>
                  {data.map((aircraft) => {
                    return (
                      <div
                        className={cn(styles.aircraft_name)}
                        key={aircraft.aircraft_id}
                      >
                        {aircraft.aircraft_name}
                      </div>
                    );
                  })}
                </div>
                <div className={cn(styles.bars)}>
                  {data.map((aircraft) => {
                    return (
                      <div
                        className={cn(styles.bar)}
                        key={aircraft.aircraft_id}
                      >
                        {aircraft.NA_annual_captain +
                          aircraft.NA_annual_first_office}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <h3>Variable Costs Breakdown</h3>
            <div>
              <h5>Fuel Cost</h5>
              <div className={cn(styles.crew_salary)}>
                <div className={cn(styles.aircraft_names)}>
                  {data.map((aircraft) => {
                    return (
                      <div
                        className={cn(styles.aircraft_name)}
                        key={aircraft.aircraft_id}
                      >
                        {aircraft.aircraft_name}
                      </div>
                    );
                  })}
                </div>
                <div className={cn(styles.bars)}>
                  {data.map((aircraft) => {
                    return (
                      <div
                        className={cn(styles.bar)}
                        key={aircraft.aircraft_id}
                      >
                        {aircraft.NA_annual_captain +
                          aircraft.NA_annual_first_office}
                      </div>
                    );
                  })}
                </div>
              </div>
              <h5>Maintenance</h5>
              <div className={cn(styles.crew_salary)}>
                <div className={cn(styles.aircraft_names)}>
                  {data.map((aircraft) => {
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
                            className={cn(styles.bar__fill2)}
                            style={{
                              width:
                                (aircraft.NA_annual_crew_training /
                                  maximumAnnualValue) *
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
                  {data.map((aircraft) => {
                    return (
                      <div
                        className={cn(styles.aircraft_name)}
                        key={aircraft.aircraft_id}
                      >
                        {aircraft.aircraft_name}
                      </div>
                    );
                  })}
                </div>
                <div className={cn(styles.bars)}>
                  {data.map((aircraft) => {
                    return (
                      <div
                        className={cn(styles.bar)}
                        key={aircraft.aircraft_id}
                      >
                        {aircraft.NA_annual_captain +
                          aircraft.NA_annual_first_office}
                      </div>
                    );
                  })}
                </div>
              </div>
              <h5>Ground Fees</h5>
              <div className={cn(styles.crew_salary)}>
                <div className={cn(styles.aircraft_names)}>
                  {data.map((aircraft) => {
                    return (
                      <div
                        className={cn(styles.aircraft_name)}
                        key={aircraft.aircraft_id}
                      >
                        {aircraft.aircraft_name}
                      </div>
                    );
                  })}
                </div>
                <div className={cn(styles.bars)}>
                  {data.map((aircraft) => {
                    return (
                      <div
                        className={cn(styles.bar)}
                        key={aircraft.aircraft_id}
                      >
                        {aircraft.NA_annual_captain +
                          aircraft.NA_annual_first_office}
                      </div>
                    );
                  })}
                </div>
              </div>
              <h5>Misc Variable</h5>
              <div className={cn(styles.crew_salary)}>
                <div className={cn(styles.aircraft_names)}>
                  {data.map((aircraft) => {
                    return (
                      <div
                        className={cn(styles.aircraft_name)}
                        key={aircraft.aircraft_id}
                      >
                        {aircraft.aircraft_name}
                      </div>
                    );
                  })}
                </div>
                <div className={cn(styles.bars)}>
                  {data.map((aircraft) => {
                    return (
                      <div
                        className={cn(styles.bar)}
                        key={aircraft.aircraft_id}
                      >
                        {aircraft.NA_annual_captain +
                          aircraft.NA_annual_first_office}
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
