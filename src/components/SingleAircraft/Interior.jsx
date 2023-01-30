import cn from "classnames";
import global from "../styles/global.module.scss";
import SectionHeader from "../shared/SectionHeader";


const Interior = ({ params }) => {
  return (
    <section className={cn(global.section)}>
      <SectionHeader title="Interior" />
      <main>
        <div className={cn(global.details_table)}>
          <div className={cn(global.column)}>
            <div className={cn(global.rows)}>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>Maximum Passengers</span>
                <span>{params.max_pax}</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>Typical Passengers</span>
                <span>{params.typical_pax}</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>Number of Living Zones</span>
                <span>{params.living_zones}</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>Cabin Noise (dB)</span>
                <span>{params.cabin_noise}</span>
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
                <span>{params.cabin_altitude}</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>Sea Level Cabin (Feet)</span>
                <span>{params.sea_level_cabin}</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Pressure Differential (PSI)
                </span>
                <span>{params.cabin_pressure}</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Cabin Volume (Cubic Feet)
                </span>
                <span>{params.cabin_volume_CF}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Interior;
