import React from "react";
import { HiAdjustments } from "react-icons/hi";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./Card.module.scss";

const Card = ({ className, item }) => {
  return (
    <div className={cn(styles.card, className)} aria-hidden="true">
      <Link to={`/singleAircraft/${item?.aircraft_id}`}>
        <div className={styles.preview}>
          <img src={`${item?.image_name}`} alt={`${item?.aircraft_name}`} />
          <div className={styles.control}>
            <div className={styles.category}>{item?.title}</div>
            <div className={cn("button-small", styles.button)}>
              <span>{`${item?.metadata?.categories[0]?.title}`}</span>
              <HiAdjustments name="scatter-up" size="16" />
            </div>
          </div>
        </div>
        <div className={styles.foot}>
          <div className={styles.status}>
            {/* <p>{item?.title}</p> */}
            <p>{`${item?.aircraft_name}`} </p>

            <p className={styles.count}>
              Range{" "}
              {item?.range_km > 0 ? `${item?.range_km} ` : "Not Available"}
            </p>
            <p className={styles.count}>
              High Speed Cruise{" "}
              {item?.high_speed_cruise_kmh > 0
                ? `${item?.high_speed_cruise_kmh} `
                : "Not Available"}
            </p>
            <p className={styles.count}>
              Cabin Altitude{" "}
              {item?.cabin_altitude > 0
                ? `${item?.cabin_altitude} `
                : "Not Available"}
            </p>
            <p className={styles.count}>
              Hourly Fuel Burn{" "}
              {item?.hourly_fuel_burn_GPH > 0
                ? `${item?.hourly_fuel_burn_GPH} `
                : "Not Available"}
            </p>
            <p className={styles.count}>
              Baggage Capacity CF{" "}
              {item?.baggage_capacity_CF > 0
                ? `${item?.baggage_capacity_CF} `
                : "Not Available"}
            </p>
            <p className={styles.count}>
              Take-Off Distance{" "}
              {item?.TO_distance_meters > 0
                ? `${item?.TO_distance_meters} `
                : "Not Available"}
            </p>
            <p className={styles.count}>
              Landing Distance{" "}
              {item?.landing_distance_meters > 0
                ? `${item?.landing_distance_meters} `
                : "Not Available"}
            </p>
            <p className={styles.count}>
              Annual Fixed Costs{" "}
              {item?.annual_cost > 0
                ? `${item?.annual_cost} `
                : "Not Available"}
            </p>
            <p className={styles.count}>
              Hourly Charter{" "}
              {item?.estimated_hourly_charter > 0
                ? `${item?.estimated_hourly_charter} `
                : "Not Available"}
            </p>
            <p className={styles.count}>
              Average Pre-Owned{" "}
              {item?.average_pre_owned > 0
                ? `${item?.average_pre_owned} `
                : "Not Available"}
            </p>
            <p className={styles.count}>
              Production Start{" "}
              {item?.production_start > 0
                ? `${item?.production_start} `
                : "Not Available"}
            </p>
          </div>
          <div
            className={styles.bid}
            dangerouslySetInnerHTML={{ __html: item?.count }}
          />
        </div>
      </Link>
    </div>
  );
};

export default Card;
