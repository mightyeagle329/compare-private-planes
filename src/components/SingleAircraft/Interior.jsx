import cn from "classnames";
import global from "../styles/global.module.scss";
import SectionHeader from "../shared/SectionHeader";
import numeral from "numeral";

const Interior = ({ params }) => {
  return (
    <section className={cn(global.section)}>
      <SectionHeader title="Interior" />
      <main>
        <div className={cn(global.details_table)}>
          <div className={cn(global.column)}>
            <div className={cn(global.rows)}>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Maximum Passengers
                </span>
                <span>{numeral(params.max_pax).format("0,0")}</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Typical Passengers
                </span>
                <span>{numeral(params.typical_pax).format("0,0")}</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Number of Living Zones
                </span>
                <span>{numeral(params.living_zones).format("0,0")}</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Cabin Noise (dB)
                </span>
                <span>
                  {numeral(params.cabin_noise).format("0,0") === 0
                    ? "-"
                    : numeral(params.cabin_noise).format("0,0")}
                </span>
              </div>
            </div>
          </div>
          <span className={cn(global.seperator)}></span>
          <div className={cn(global.column)}>
            <div className={cn(global.rows)}>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Max Cabin Altitude (Feet)
                </span>
                <span>{numeral(params.cabin_altitude).format("0,0")}</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Sea Level Cabin (Feet)
                </span>
                <span>{numeral(params.sea_level_cabin).format("0,0")}</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Pressure Differential (PSI)
                </span>
                <span>
                  {numeral(params.pressure_differential_psi).format("0,0")}
                </span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Cabin Volume (Cubic Feet)
                </span>
                <span>{numeral(params.cabin_volume_CF).format("0,0")}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Interior;
