import cn from "classnames";
import global from "../styles/global.module.scss";
import SectionHeader from "../shared/SectionHeader";

const RangeMap = ({ params }) => {
  return (
    <section className={cn(global.section)}>
      <SectionHeader title="Range Map" />
      <main>
        <p>content</p>
      </main>
    </section>
  );
};

export default RangeMap;
