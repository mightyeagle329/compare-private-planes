import SectionHeader from "../shared/SectionHeader";
import cn from "classnames";
import global from "../styles/global.module.scss";
import numeral from "numeral";

const Powerplant = ({ params }) => {
  return (
    <section className={cn(global.section)}>
      <SectionHeader title="Powerplant" />
      <main>
        <div className={cn(global.details_table)}>
          <div className={cn(global.column)}>
            <div className={cn(global.rows)}>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Engine Make
                </span>
                <span>{params.engine_manufacturer}</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Thrust per Engine (lbs)
                </span>
                <span>{numeral(params.thrust_output_lbs).format("0,0")}</span>
              </div>
            </div>
          </div>
          <span className={cn(global.seperator)}></span>
          <div className={cn(global.column)}>
            <div className={cn(global.rows)}>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Engine Model
                </span>
                <span>{params.engine_model}</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Total Thrust Output (lbs)
                </span>
                <span>{numeral(params.total_thrust_lbs).format("0,0")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ----------------- */}

        <div className={cn(global.table_container)}>
          <div className={cn(global.details_table)}>
            <div className={cn(global.column)}>
              <span className={cn(global.column_header)}>
                Exterior Noise Levels (dB)
              </span>
              <div className={cn(global.rows)}>
                <div className={cn(global.row)}>
                  <span className={cn(global.key)}>Lateral</span>
                  <span className={cn(global.key)}>Flyover</span>
                  <span className={cn(global.key)}>Approach</span>
                </div>
                <div className={cn(global.rows)}>
                  <div className={cn(global.row)}>
                    <span className={cn(global.value)}>
                      {params.lateral_db}
                    </span>
                    <span className={cn(global.value)}>
                      {params.flyover_db}
                    </span>
                    <span className={cn(global.value)}>
                      {params.approach_db}
                    </span>
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

export default Powerplant;
