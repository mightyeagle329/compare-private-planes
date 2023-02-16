import cn from "classnames";
import global from "../styles/global.module.scss";
import SectionHeader from "../shared/SectionHeader";

const Weights = ({ params }) => {
  return (
    <section className={cn(global.section)}>
      <SectionHeader title="Weights" />
      <main>
        <div className={cn(global.details_table)}>
          <div className={cn(global.column)}>
            <div className={cn(global.rows)}>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Max Take-Off Weight (lbs)
                </span>
                <span>{params.max_TO_weight_lbs}</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Max Landing Weight (lbs)
                </span>
                <span>{params.max_landing_weight_lbs}</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Max Payload (lbs)
                </span>
                <span>{params.max_payload_lbs}</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Basic Operating Weight (lbs)
                </span>
                <span>{params.basic_operating_weight_lbs}</span>
              </div>
            </div>
          </div>
          <span className={cn(global.seperator)}></span>
          <div className={cn(global.column)}>
            <div className={cn(global.rows)}>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Max Ramp Weight (lbs)
                </span>
                <span>{params.max_ramp_weight_lbs}</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Available Fuel (lbs)
                </span>
                <span>{params.available_fuel_lbs}</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Useful Payload (lbs)
                </span>
                <span>{params.useful_payload_lbs}</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Baggage Weight (lbs)
                </span>
                <span>{params.baggage_weight_lbs}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ----------------- */}
        <div className={cn(global.table_container)}>
          <div className={cn(global.details_table)}>
            <div className={cn(global.column)}>
              <span className={cn(global.column_header)}>
                Baggage Capacity (cubic feet)
              </span>
              <div className={cn(global.rows)}>
                <div className={cn(global.row)}>
                  <span className={cn(global.key)}>Total</span>
                  <span className={cn(global.key)}>Internal</span>
                  <span className={cn(global.key)}>External</span>
                </div>
                <div className={cn(global.row)}>
                  <span className={cn(global.value)}>
                    {params.baggage_capacity_cubicmeters}
                  </span>
                  <span className={cn(global.value)}>
                    {params.internal_baggage_cubicfeet}
                  </span>
                  <span className={cn(global.value)}>
                    {params.external_baggage_cubicfeet}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Weights;
