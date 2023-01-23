import cn from "classnames";
import global from "./styles/global.module.scss";
import SectionHeader from "./shared/SectionHeader";
const BasicInfo = () => {
  return (
    <section className={cn(global.section)}>
      <SectionHeader title="Basic Info" />
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
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default BasicInfo;
