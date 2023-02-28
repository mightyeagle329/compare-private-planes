import cn from "classnames";
import global from "../styles/global.module.scss";
import SectionHeader from "../shared/SectionHeader";
import numeral from "numeral";

const Weights = ({ params, unit }) => {
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
                <span>{numeral(params.MTOW_kgs).format("0,0")}</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Max Landing Weight (lbs)
                </span>
                <span>
                  {numeral(params.max_landing_weight_lbs).format("0,0")}
                </span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Max Payload (lbs)
                </span>
                <span>{numeral(params.max_payload_lbs).format("0,0")}</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Basic Operating Weight (lbs)
                </span>
                <span>
                  {numeral(params.basic_operating_weight_lbs).format("0,0")}
                </span>
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
                <span>{numeral(params.max_ramp_weight_lbs).format("0,0")}</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Available Fuel (lbs)
                </span>
                <span>{numeral(params.available_fuel_lbs).format("0,0")}</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Useful Payload (lbs)
                </span>
                <span>{numeral(params.useful_load_lbs).format("0,0")}</span>
              </div>
              <div className={cn(global.row)}>
                <span className={cn(global.key, global.key_realign)}>
                  Baggage Weight (lbs)
                </span>
                <span>
                  {params.baggage_weight_lbs !== 0
                    ? numeral(params.baggage_weight_lbs).format("0,0")
                    : "-"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ----------------- */}
        <div className={cn(global.table_container)}>
          <div className={cn(global.details_table)}>
            <div className={cn(global.column)}>
              <span className={cn(global.column_header)}>
                Baggage Capacity{" "}
                {unit === "Imerial Units" ? "(cubic feet)" : "(cubic meters)"}
              </span>
              <div className={cn(global.rows)}>
                <div className={cn(global.row)}>
                  <span className={cn(global.key)}>Total</span>
                  <span className={cn(global.key)}>Internal</span>
                  <span className={cn(global.key)}>External</span>
                </div>
                <div className={cn(global.row)}>
                  <span className={cn(global.value)}>
                    {unit === "Imerial Units"
                      ? params.baggage_capacity_CF === 0
                        ? "-"
                        : params.baggage_capacity_CF
                      : params.baggage_capacity_cubicmeters === 0
                      ? "-"
                      : params.baggage_capacity_cubicmeters}
                  </span>
                  <span className={cn(global.value)}>
                    {unit === "Imerial Units"
                      ? params.internal_baggage_cubicfeet === 0
                        ? "-"
                        : params.internal_baggage_cubicfeet
                      : params.internal_baggage_cubicmeters === 0
                      ? "-"
                      : params.internal_baggage_cubicmeters}
                  </span>
                  <span className={cn(global.value)}>
                    {unit === "Imerial Units"
                      ? params.external_baggage_CF === 0
                        ? "-"
                        : params.external_baggage_CF
                      : params.external_baggage_cubicmeters === 0
                      ? "-"
                      : params.external_baggage_cubicmeters}
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
