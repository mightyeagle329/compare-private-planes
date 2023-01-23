import React from "react";
import { HiAdjustments } from "react-icons/hi";
import cn from "classnames";
import styles from "./Card.module.scss";

const Card = ({ className, item }) => {
  return (
    <div className={cn(styles.card, className)} aria-hidden="true">
      <div className={styles.preview}>
        <img
          src={`${item?.metadata?.image?.imgix_url}?w=600&format=auto`}
          alt="Card"
        />
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
          <p>Embraer Praetor 500</p>
          <p className={styles.count}>
            Number of passengers{" "}
            {item?.metadata?.count > 0
              ? `${item?.metadata?.count} `
              : "Not Available"}
          </p>
          <p className={styles.count}>
            Range{" "}
            {item?.metadata?.count > 0
              ? `${item?.metadata?.count} `
              : "Not Available"}
          </p>
          <p className={styles.count}>
            Cruise Speed{" "}
            {item?.metadata?.count > 0
              ? `${item?.metadata?.count} `
              : "Not Available"}
          </p>
          <p className={styles.count}>
            Max Altitude{" "}
            {item?.metadata?.count > 0
              ? `${item?.metadata?.count} `
              : "Not Available"}
          </p>
          <p className={styles.count}>
            Fuel Burn{" "}
            {item?.metadata?.count > 0
              ? `${item?.metadata?.count} `
              : "Not Available"}
          </p>
          <p className={styles.count}>
            Baggage Capacity{" "}
            {item?.metadata?.count > 0
              ? `${item?.metadata?.count} `
              : "Not Available"}
          </p>
          <p className={styles.count}>
            Take-Off Distance{" "}
            {item?.metadata?.count > 0
              ? `${item?.metadata?.count} `
              : "Not Available"}
          </p>
          <p className={styles.count}>
            Landing Distance{" "}
            {item?.metadata?.count > 0
              ? `${item?.metadata?.count} `
              : "Not Available"}
          </p>
          <p className={styles.count}>
            Annual Fixed Costs{" "}
            {item?.metadata?.count > 0
              ? `${item?.metadata?.count} `
              : "Not Available"}
          </p>
          <p className={styles.count}>
            Hourly Price{" "}
            {item?.metadata?.count > 0
              ? `${item?.metadata?.count} `
              : "Not Available"}
          </p>
          <p className={styles.count}>
            Price (New){" "}
            {item?.metadata?.count > 0
              ? `${item?.metadata?.count} `
              : "Not Available"}
          </p>
          <p className={styles.count}>
            Average Pre-Owned{" "}
            {item?.metadata?.count > 0
              ? `${item?.metadata?.count} `
              : "Not Available"}
          </p>
          <p className={styles.count}>
            Years Produced{" "}
            {item?.metadata?.count > 0
              ? `${item?.metadata?.count} `
              : "Not Available"}
          </p>
        </div>
        <div
          className={styles.bid}
          dangerouslySetInnerHTML={{ __html: item?.count }}
        />
      </div>
    </div>
  );
};

export default Card;
