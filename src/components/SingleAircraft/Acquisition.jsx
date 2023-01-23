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
} from 'chart.js';
import { faker } from "@faker-js/faker";
import { Line } from 'react-chartjs-2';



import global from "./styles/global.module.scss";
import styles from "./styles/styles.module.scss";
import SectionHeader from "./shared/SectionHeader";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const Acquisition = () => {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      }
    },
  };

  const labels = ['1998', '1999', '2000', '2002', '2001', '2003'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Current Values',
        data: labels.map(() => faker.datatype.number({ min: 11.0, max: 20.0 })),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Hour Adjusted',
        data: labels.map(() => faker.datatype.number({ min: 11.0, max: 20.0 })),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Future Values',
        data: labels.map(() => faker.datatype.number({ min: 11.0, max: 20.0 })),
        borderColor: 'rgb(153, 82, 155)',
        backgroundColor: 'rgba(153, 82, 155, 0.5)',
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
                <span className={cn(global.key)}>Production Start</span>
                <span>2015</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key)}>Production End</span>
                <span>Present</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key)}>In Production?</span>
                <span>Yes</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key)}>In Production?</span>
                <span>Yes</span>
              </div>
            </div>
          </div>
          <span className={cn(global.seperator)}></span>
          <div className={cn(global.column)}>
            <div className={cn(global.rows)}>
              <div className={cn(global.row)}>
                <span className={cn(global.key)}>Number Made</span>
                <span>150</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key)}>Number in Service</span>
                <span>135</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key)}>Serial Number Range</span>
                <span>0333 to 0555</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key)}>Serial Number Range</span>
                <span>0333 to 0555</span>
              </div>
            </div>
          </div>
        </div>

        {/* --------------- */}

        <div className={cn(styles.line_chart)}>
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
                <td className={cn(global.td)}>{data.datasets[0].data[index]}</td>
                <td className={cn(global.td)}>{data.datasets[1].data[index]}</td>
                <td className={cn(global.td)}>{data.datasets[2].data[index]}</td>
              </tr>
            ))}
          </tbody>
          
        </table>
      </main>
    </section>
  );
};

export default Acquisition;
