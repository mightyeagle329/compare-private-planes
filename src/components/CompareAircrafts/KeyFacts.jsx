import React from "react";
import cn from "classnames";
import global from "../styles/global.module.scss";
import styles from "./styles/styles.module.scss";
import SectionHeader from "../shared/SectionHeader";
import { useState } from "react";
const KeyFacts = ({ data, onRemoveAircraft }) => {
  const [aircraftsData, setAircraftsData] = useState(data);
  const removeAircraft = (aircraft) => {
    if (aircraftsData.length === 1)
      return alert("You must have at least one aircraft to compare");
    const data = aircraftsData.filter((value) => value !== aircraft);
    setAircraftsData(data);
    onRemoveAircraft(data);
  };

  return (
    <>
      <section className={cn(global.section)}>
        <SectionHeader title="Key Facts" />
        <main className={cn(styles.key_facts_container)}>
          <div className={cn(styles.facts)}>
            {aircraftsData.map((aircraft) => {
              return (
                <div className={cn(styles.fact)} key={aircraft.aircraft_id}>
                  <h2>{aircraft.aircraft_name}</h2>
                  {/* at least two aircrafts, this is just for testing */}
                  {aircraftsData.length > 2 ? (
                    <button
                      className={cn(styles.btn)}
                      onClick={() => removeAircraft(aircraft)}
                    >
                      Remove Aircraft
                    </button>
                  ) : (
                    ""
                  )}
                  <div className={cn(styles.image_container)}>
                    <img src={aircraft.image_name} alt="" />
                  </div>
                  <ul>
                    <li>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Quisquam ab reprehenderit, labore nemo aperiam corporis!{" "}
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Quisquam ab reprehenderit, labore nemo aperiam corporis!{" "}
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Quisquam ab reprehenderit, labore nemo aperiam corporis!{" "}
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Quisquam ab reprehenderit, labore nemo aperiam corporis!{" "}
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        </main>
      </section>
    </>
  );
};
export default KeyFacts;
