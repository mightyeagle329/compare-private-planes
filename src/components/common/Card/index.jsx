import React from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./Card.module.scss";
import {
  HiOutlineUsers,
  HiOutlineMap,
  HiOutlineShoppingCart,
  HiOutlineCurrencyDollar,
  HiOutlineTrendingDown,
  HiOutlineTrendingUp,
  HiOutlineCube,
  HiOutlineFire,
  HiOutlineClock,
} from "react-icons/hi";
import { ImWarning } from "react-icons/im";
import { SiSpeedtest } from "react-icons/si";
import numeral from "numeral";

const Card = ({ className, item }) => {
  const aircraftName = item?.aircraft_name.replace(/\s/g, "-");
  return (
    <div className={cn(styles.card, className)} aria-hidden="true">
      <Link
        to={`/${aircraftName}`}
        state={{
          id: item.aircraft_id,
        }}
      >
        <div className={styles.preview}>
          <img src={`${item?.image_name}`} alt={`${item?.aircraft_name}`} />
        </div>
        <div className={styles.foot}>
          <div className={styles.status}>
            <p>{`${item?.aircraft_name}`} </p>

            <p className={styles.count}>
              <HiOutlineUsers name="search" size="16" /> Number of Passengers:{" "}
              {item?.max_pax > 0 ? `${item?.max_pax} ` : "Not Available"}
            </p>
            <p className={styles.count}>
              <HiOutlineMap name="search" size="16" /> Range:{" "}
              {item?.range_NM > 0
                ? `${numeral(item?.range_NM).format("0,0")} `
                : "Not Available"}
            </p>
            <p className={styles.count}>
              <SiSpeedtest name="search" size="16" /> High Speed Cruise:{" "}
              {item?.high_cruise_knots > 0
                ? `${numeral(item?.high_cruise_knots).format("0,0")} `
                : "Not Available"}
            </p>
            <p className={styles.count}>
              <ImWarning name="search" size="16" /> Max Altitude:{" "}
              {item?.max_altitude_feet > 0
                ? `${numeral(item?.cabin_altitude).format("0,0")} `
                : "Not Available"}
            </p>
            <p className={styles.count}>
              <HiOutlineFire name="search" size="16" /> Hourly Fuel Burn:{" "}
              {item?.hourly_fuel_burn_GPH > 0
                ? `${numeral(item?.hourly_fuel_burn_GPH).format("0,0")} `
                : "Not Available"}
            </p>
            <p className={styles.count}>
              <HiOutlineCube name="search" size="16" /> Baggage Capacity CF:{" "}
              {item?.baggage_capacity_CF > 0
                ? `${item?.baggage_capacity_CF} `
                : "Not Available"}
            </p>
            <p className={styles.count}>
              <HiOutlineTrendingUp name="search" size="16" /> Take-Off Distance:{" "}
              {item?.TO_distance_meters > 0
                ? `${numeral(item?.TO_distance_meters).format("0,0")} `
                : "Not Available"}
            </p>
            <p className={styles.count}>
              <HiOutlineTrendingDown name="search" size="16" /> Landing
              Distance:{" "}
              {item?.landing_distance_meters > 0
                ? `${numeral(item?.landing_distance_meters).format("0,0")} `
                : "Not Available"}
            </p>
            <p className={styles.count}>
              <HiOutlineCurrencyDollar name="search" size="16" /> Annual Fixed
              Costs:{" "}
              {item?.annual_cost > 0
                ? `${numeral(item?.annual_cost).format("0,0")} `
                : "Not Available"}
            </p>
            <p className={styles.count}>
              <HiOutlineCurrencyDollar name="search" size="16" /> Hourly
              Charter:{" "}
              {item?.estimated_hourly_charter > 0
                ? `${numeral(item?.estimated_hourly_charter).format("0,0")} `
                : "Not Available"}
            </p>
            <p className={styles.count}>
              <HiOutlineShoppingCart name="search" size="16" /> Price (New):{" "}
              {item?.new_purchase > 0
                ? `${numeral(item?.new_purchase).format("0,0")} `
                : "Not Available"}
            </p>
            <p className={styles.count}>
              <HiOutlineShoppingCart name="search" size="16" /> Average
              Pre-Owned:{" "}
              {item?.average_pre_owned > 0
                ? `${numeral(item?.average_pre_owned).format("0,0")} `
                : "Not Available"}
            </p>
            <p className={styles.count}>
              <HiOutlineClock name="search" size="16" /> Years Produced:{" "}
              {item?.production_start > 0
                ? `${item?.production_start} - ${item?.production_end} `
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
