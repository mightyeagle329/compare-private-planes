import cn from "classnames";
import global from "./styles/global.module.scss";
import SectionHeader from "./shared/SectionHeader";

const Dimensions = () => {
  return (
    <section className={cn(global.section)}>
      <SectionHeader title="Dimensions" />
      <main className={cn(global.flex_main)}>
        <div className={cn(global.table_container)}>
          <div className={cn(global.details_table)}>
            <div className={cn(global.column)}>
              <span className={cn(global.column_header)}>
                High Speed Cruise
              </span>
              <div className={cn(global.rows)}>
                <div className={cn(global.row)}>
                  <span className={cn(global.key)}>Knots</span>
                  <span className={cn(global.key)}>MPH</span>
                  <span className={cn(global.key)}>Mach</span>
                </div>
                <div className={cn(global.row)}>
                  <span>597</span>
                  <span>650</span>
                  <span>09</span>
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
                High Speed Cruise
              </span>
              <div className={cn(global.rows)}>
                <div className={cn(global.row)}>
                  <span className={cn(global.key)}>Knots</span>
                  <span className={cn(global.key)}>MPH</span>
                  <span className={cn(global.key)}>Mach</span>
                </div>
                <div className={cn(global.row)}>
                  <span>597</span>
                  <span>650</span>
                  <span>09</span>
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
                High Speed Cruise
              </span>
              <div className={cn(global.rows)}>
                <div className={cn(global.row)}>
                  <span className={cn(global.key)}>Knots</span>
                  <span className={cn(global.key)}>MPH</span>
                  <span className={cn(global.key)}>Mach</span>
                </div>
                <div className={cn(global.row)}>
                  <span>597</span>
                  <span>650</span>
                  <span>09</span>
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
