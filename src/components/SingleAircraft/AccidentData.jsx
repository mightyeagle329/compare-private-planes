import cn from "classnames";
import global from "../styles/global.module.scss";
import styles from "./styles/styles.module.scss";
import SectionHeader from "../shared/SectionHeader";

const AccidentData = () => {
  return (
    <section className={cn(global.section)}>
      <SectionHeader title="Accident DataBase" />
      <main className={cn(styles.main_accidentData)}>
        <table className={cn(global.table)}>
          <thead>
            <tr className={cn(global.tr)}>
              <th className={cn(global._padding)}>Make</th>
              <th>Model</th>
              <th>Common Name</th>
              <th>Reg</th>
              <th>Serial Number</th>
              <th>Year</th>
              <th>Owner Name</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            <tr className={cn(global.tr)}>
              <td className={cn(global._padding)}>Boeing</td>
              <td>737-800</td>
              <td>737</td>
              <td>N12345</td>
              <td>12345</td>
              <td>2015</td>
              <td>United Airlines</td>
              <td>United States</td>
            </tr>
          </tbody>
        </table>
        <div className={cn(global.pagination_container, global.pdf_hidden)}>
          <span> Prev </span>
          <span>1</span>
          <span>2</span>
          <span>...</span>
          <span>Next</span>
        </div>
        <p className={cn(styles.total_aircraft, global.pdf_hidden)}>
          Total Aircraft 9367
        </p>
        <p className={cn(global.pdf_only, global.pdf_accidentData_text)}>For a full list of assumptions and how data is collected, please visit compareprivateplanes.com</p>
      </main>
    </section>
  );
};

export default AccidentData;
