import React from "react";
import cn from "classnames";
import global from "../styles/global.module.scss";
import SectionHeader from "../shared/SectionHeader";

const Range = () => {
  return (
    <>
      <section className={cn(global.section)}>
        <SectionHeader title="Range Map" />
        <main></main>
      </section>
    </>
  );
};
export default Range;
