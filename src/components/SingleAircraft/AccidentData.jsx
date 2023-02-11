import cn from "classnames";
import global from "../styles/global.module.scss";
import styles from "./styles/styles.module.scss";
import SectionHeader from "../shared/SectionHeader";

const AccidentData = ({ params, nbAccidents }) => {
  return (
    <section className={cn(global.section)}>
      <SectionHeader title="Accident DataBase" />
      <main className={cn(styles.main_accidentData)}>
        <table className={cn(global.table)}>
          <thead>
            <tr className={cn(global.tr)}>
              <th className={cn(global._padding)}>Country</th>
              <th>Aircraft</th>
              <th>Reg</th>
              <th>Date</th>
              <th>Occurrence</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {params.map((accident) => {
              return (
                <tr className={cn(global.tr)} key={accident.reg}>
                  <td className={cn(global._padding)}>{accident.country}</td>
                  <td>{accident.aircraft_incident}</td>
                  <td>{accident.reg}</td>
                  <td>{accident.date}</td>
                  <td>{accident.occurrence}</td>
                  <td>{accident.details}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* <div className={cn(global.pagination_container, global.pdf_hidden)}>
          <span> Prev </span>
          <span>1</span>
          <span>2</span>
          <span>...</span>
          <span>Next</span>
        </div> */}
        <p className={cn(styles.total_aircraft, global.pdf_hidden)}>
          Total Accidents: {nbAccidents}
        </p>
        <p className={cn(global.pdf_only, global.pdf_accidentData_text)}>
          For a full list of assumptions and how data is collected, please visit
          compareprivateplanes.com
        </p>
      </main>
    </section>
  );
};

export default AccidentData;
