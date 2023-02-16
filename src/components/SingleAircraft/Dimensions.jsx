import cn from "classnames";
import global from "../styles/global.module.scss";
import SectionHeader from "../shared/SectionHeader";

const Dimensions = ({ params }) => {
  return (
    <section className={cn(global.section)}>
      <SectionHeader title="Dimensions" />
      <main className={cn(global.flex_main)}>
        <div className={cn(global.table_container)}>
          <div className={cn(global.details_table)}>
            <div className={cn(global.column)}>
              <span className={cn(global.column_header)}>
                Exterior Dimensions (Feet)
              </span>
              <div className={cn(global.rows)}>
                <div className={cn(global.row)}>
                  <span className={cn(global.key)}>Length</span>
                  <span className={cn(global.key)}>Height</span>
                  <span className={cn(global.key)}>Wingspan</span>
                </div>
                <div className={cn(global.row)}>
                  <span className={cn(global.value)}>
                    {params.ext_length_feet}
                  </span>
                  <span className={cn(global.value)}>
                    {params.exterior_height_feet}
                  </span>
                  <span className={cn(global.value)}>
                    {params.wingspan_feet}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <span className={cn(global.line)}></span>
        <div className={cn(global.table_container)}>
          <div className={cn(global.details_table)}>
            <div className={cn(global.column)}>
              <span className={cn(global.column_header)}>
                Interior Dimensions (Feet)
              </span>
              <div className={cn(global.rows)}>
                <div className={cn(global.row)}>
                  <span className={cn(global.key)}>Length</span>
                  <span className={cn(global.key)}>Height</span>
                  <span className={cn(global.key)}>Width</span>
                </div>
                <div className={cn(global.row)}>
                  <span className={cn(global.value)}>
                    {params.int_length_feet}
                  </span>
                  <span className={cn(global.value)}>
                    {params.int_height_feet}
                  </span>
                  <span className={cn(global.value)}>
                    {params.int_width_feet}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <span className={cn(global.line)}></span>
        <div className={cn(global.table_container)}>
          <div className={cn(global.details_table)}>
            <div className={cn(global.column)}>
              <span className={cn(global.column_header)}>
                Door Dimensions (Feet)
              </span>
              <div className={cn(global.rows)}>
                <div className={cn(global.row)}>
                  <span className={cn(global.key)}>Height</span>
                  <span className={cn(global.key)}>Width</span>
                </div>
                <div className={cn(global.row)}>
                  <span className={cn(global.value)}>
                    {params.door_height_feet}
                  </span>
                  <span className={cn(global.value)}>
                    {params.door_width_feet}
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

export default Dimensions;
