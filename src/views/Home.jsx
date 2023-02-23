import React, { useState, useEffect } from "react";
import cn from "classnames";
import { HiOutlineSearch } from "react-icons/hi";

import useDebounce from "../utils/hooks/useDebounce";
import { searchService } from "../utils/hooks/utils";
import Card from "../components/common/Card";
import Dropdown from "../components/common/Dropdown";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import {
  CATEGORY_OPTIONS,
  MANUFACTURER_OPTIONS,
  PRODUCTION_OPTIONS,
  CATEGORY_OPTIONS_DIC,
  MANUFACTURER_OPTIONS_DIC,
  PRODUCTION_OPTIONS_DIC,
} from "../utils/constants/app-constants";
import aircraftService from "../services/aircraft-service";
import axios from "axios";
import { MdOutlineExpandMore } from "react-icons/md";
import styles from "../styles/Search.module.scss";
import MultiRangeSlider from "../components/common/multiRangeSlider/MultiRangeSlider";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export default function Search() {
  const [passengerExpanded, setPassengerExpanded] = useState(false);
  const [rangeExpanded, setRangeExpanded] = useState(false);
  const [cruiseExpanded, setCruiseExpanded] = useState(false);
  const [altitudeExpanded, setAltitudeExpanded] = useState(false);
  const [fuelBurnExpanded, setfuelBurnExpanded] = useState(false);
  const [baggageExpanded, setbaggageExpanded] = useState(false);
  const [takeOffExpanded, settakeOffExpanded] = useState(false);
  const [landingDistanceExpanded, setLandingDistanceExpanded] = useState(false);
  const [hourlyPrice, setHourlyPrice] = useState(false);
  const [purchasePrice, setPurchasePrice] = useState(false);
  const [preOwned, setpreOwned] = useState(false);

  const handlePassengerAccordion = () => {
    setPassengerExpanded(!passengerExpanded);
  };
  const handleRangeAccordion = () => {
    setRangeExpanded(!rangeExpanded);
  };
  const handleCruiseAccordion = () => {
    setCruiseExpanded(!cruiseExpanded);
  };
  const handleAltitudeAccordion = () => {
    setAltitudeExpanded(!altitudeExpanded);
  };
  const handleFuelAccordion = () => {
    setfuelBurnExpanded(!fuelBurnExpanded);
  };
  const handleBaggageAccordion = () => {
    setbaggageExpanded(!baggageExpanded);
  };
  const handleTakeOffAccordion = () => {
    settakeOffExpanded(!takeOffExpanded);
  };
  const handleLandingAccordion = () => {
    setLandingDistanceExpanded(!landingDistanceExpanded);
  };
  const handleHourlyPriceAccordion = () => {
    setHourlyPrice(!hourlyPrice);
  };

  const handlePurchaseAccordion = () => {
    setPurchasePrice(!purchasePrice);
  };

  const handlePreOwnedAccordion = () => {
    setpreOwned(!preOwned);
  };
  const [search, setSearch] = useState({
    aircraft_name: "",
    category: "",
    in_production: "",
    aircraft_manufacturer: "",
    max_pax: 20,
    range_NM: 8000,
    high_cruise_knots: 520,
    max_altitude_feet: 51000,
    hourly_fuel_burn_GPH: 500,
    baggage_capacity_CF: 200,
    TO_distance_feet: 1500,
    landing_distance_feet: 1500,
    NA_hourly_total: 10000,
    new_purchase: 10000000,
    average_pre_owned: 3000000,
  });
  const debouncedSearchTerm = useDebounce(search, 500);

  const [aircraftsData, setAircraftsData] = useState([]);
  const [filterResult, setFilterResult] = useState([]);

  useEffect(() => {
    aircraftService.getAircrafts().then((data) => setAircraftsData(data));
  }, []);

  useEffect(() => {
    searchAircraft();
  }, [search]);

  const handleSearchChanged = (key, value) => {
    setSearch((currentSearch) => ({ ...currentSearch, [key]: value }));
  };

  const searchAircraft = async () => {
    const searchParams = new URLSearchParams(search);
    console.log(searchParams.toString());
    const res = await searchService(`/api/search?${searchParams.toString()}`);
    console.log(res);
    setFilterResult(res);
  };

  const [rerender, setRerenderer] = useState(false);
  const openFilter = () => {
    const filter = document.querySelector(".filters_target");
    if (filter.style.display === "none") {
      filter.style.display = "flex";
    } else {
      filter.style.display = "none";
    }
  };

  return (
    <div className={cn("section-pt80", styles.section)}>
      <div className={cn(styles.container)}>
        <div className={styles.row}>
          <span className={styles.open_filter} onClick={() => openFilter()}>
            <i className="fa-solid fa-sliders"></i>
          </span>
          <div className={"filters_target " + styles.filters}>
            <div className={styles.top}>
              <div className={styles.title}>Search Aircraft</div>
            </div>
            <div className={styles.form}>
              <form className={styles.search} action="">
                <input
                  className={styles.input}
                  type="text"
                  value={search.aircraft_name}
                  onChange={(e) =>
                    handleSearchChanged("aircraft_name", e.target.value)
                  }
                  name="search"
                  placeholder="Search Aircraft"
                  required
                />
                <button className={styles.result}>
                  <HiOutlineSearch name="search" size="16" />
                </button>
              </form>
            </div>

            <div className={styles.sorting}>
              <div className={styles.dropdown}>
                <div className={styles.label}>Category</div>
                <Dropdown
                  className={styles.dropdown}
                  value={CATEGORY_OPTIONS_DIC[search.category]}
                  setValue={(value) => handleSearchChanged("category", value)}
                  options={CATEGORY_OPTIONS}
                />
              </div>
            </div>
            <div className={styles.sorting}>
              <div className={styles.dropdown}>
                <div className={styles.label}>Manufacturer</div>
                <Dropdown
                  className={styles.dropdown}
                  value={MANUFACTURER_OPTIONS_DIC[search.aircraft_manufacturer]}
                  setValue={(value) =>
                    handleSearchChanged("aircraft_manufacturer", value)
                  }
                  options={MANUFACTURER_OPTIONS}
                />
              </div>
            </div>
            <div className={styles.sorting}>
              <div className={styles.dropdown}>
                <div className={styles.label}>In Production</div>{" "}
                <Dropdown
                  className={styles.dropdown}
                  value={PRODUCTION_OPTIONS_DIC[search.in_production]}
                  setValue={(value) =>
                    handleSearchChanged("in_production", value)
                  }
                  options={PRODUCTION_OPTIONS}
                />
              </div>
            </div>
            <div>
              {" "}
              <Accordion
                expanded={passengerExpanded}
                onChange={handlePassengerAccordion}
              >
                <AccordionSummary
                  expandIcon={<MdOutlineExpandMore />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <div className={styles.label}>Passengers</div>
                </AccordionSummary>
                <div className={styles.range}>
                  <MultiRangeSlider
                    min={0}
                    max={20}
                    onChange={({ min, max }) => {
                      handleSearchChanged("max_pax", max);
                    }}
                  />
                </div>
              </Accordion>
            </div>

            <div>
              <Accordion
                expanded={rangeExpanded}
                onChange={handleRangeAccordion}
              >
                <AccordionSummary
                  expandIcon={<MdOutlineExpandMore />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <div className={styles.label}>Range (NM)</div>
                </AccordionSummary>
                <div className={styles.range}>
                  <MultiRangeSlider
                    min={0}
                    max={8000}
                    onChange={({ min, max }) => {
                      handleSearchChanged("range_NM", max);
                    }}
                  />
                </div>
              </Accordion>
            </div>

            <div>
              <Accordion
                expanded={cruiseExpanded}
                onChange={handleCruiseAccordion}
              >
                <AccordionSummary
                  expandIcon={<MdOutlineExpandMore />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <div className={styles.label}>Cruise Speed (Knots)</div>
                </AccordionSummary>
                <div className={styles.range}>
                  <MultiRangeSlider
                    min={0}
                    max={520}
                    onChange={({ min, max }) => {
                      handleSearchChanged("high_cruise_knots", max);
                    }}
                  />
                </div>
              </Accordion>
            </div>

            <div>
              <Accordion
                expanded={altitudeExpanded}
                onChange={handleAltitudeAccordion}
              >
                <AccordionSummary
                  expandIcon={<MdOutlineExpandMore />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <div className={styles.label}>Max Altitude (Feet)</div>
                </AccordionSummary>
                <div className={styles.range}>
                  <MultiRangeSlider
                    min={0}
                    max={51000}
                    onChange={({ min, max }) => {
                      handleSearchChanged("max_altitude_feet", max);
                    }}
                  />
                </div>
              </Accordion>
            </div>

            <div>
              <Accordion
                expanded={fuelBurnExpanded}
                onChange={handleFuelAccordion}
              >
                <AccordionSummary
                  expandIcon={<MdOutlineExpandMore />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <div className={styles.label}>Fuel Burn (Gallons/Hour)</div>
                </AccordionSummary>
                <div className={styles.range}>
                  <MultiRangeSlider
                    min={0}
                    max={500}
                    onChange={({ min, max }) => {
                      handleSearchChanged("hourly_fuel_burn_GPH", max);
                    }}
                  />
                </div>
              </Accordion>
            </div>

            <div>
              <Accordion
                expanded={baggageExpanded}
                onChange={handleBaggageAccordion}
              >
                <AccordionSummary
                  expandIcon={<MdOutlineExpandMore />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <div className={styles.label}>Baggage Capacity (cu ft)</div>
                </AccordionSummary>
                <div className={styles.range}>
                  <MultiRangeSlider
                    min={0}
                    max={200}
                    onChange={({ min, max }) => {
                      handleSearchChanged("baggage_capacity_CF", max);
                    }}
                  />
                </div>
              </Accordion>
            </div>

            <div>
              <Accordion
                expanded={takeOffExpanded}
                onChange={handleTakeOffAccordion}
              >
                <AccordionSummary
                  expandIcon={<MdOutlineExpandMore />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <div className={styles.label}>Take-Off Distance (Feet)</div>
                </AccordionSummary>
                <div className={styles.range}>
                  <MultiRangeSlider
                    min={0}
                    max={1500}
                    onChange={({ min, max }) => {
                      handleSearchChanged("TO_distance_feet", max);
                    }}
                  />
                </div>
              </Accordion>
            </div>

            <div>
              <Accordion
                expanded={landingDistanceExpanded}
                onChange={handleLandingAccordion}
              >
                <AccordionSummary
                  expandIcon={<MdOutlineExpandMore />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <div className={styles.label}>Landing Distance (Feet)</div>
                </AccordionSummary>
                <div className={styles.range}>
                  <MultiRangeSlider
                    min={0}
                    max={1500}
                    onChange={({ min, max }) => {
                      handleSearchChanged("landing_distance_feet", max);
                    }}
                  />
                </div>
              </Accordion>
            </div>

            <div>
              <Accordion
                expanded={hourlyPrice}
                onChange={handleHourlyPriceAccordion}
              >
                <AccordionSummary
                  expandIcon={<MdOutlineExpandMore />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <div className={styles.label}>Hourly Price ($)</div>
                </AccordionSummary>
                <div className={styles.range}>
                  <MultiRangeSlider
                    min={0}
                    max={10000}
                    onChange={({ min, max }) => {
                      handleSearchChanged("NA_hourly_total", max);
                    }}
                  />
                </div>
              </Accordion>
            </div>

            <div>
              <Accordion
                expanded={purchasePrice}
                onChange={handlePurchaseAccordion}
              >
                <AccordionSummary
                  expandIcon={<MdOutlineExpandMore />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <div className={styles.label}>Purchase Price ($ million)</div>
                </AccordionSummary>
                <div className={styles.range}>
                  <MultiRangeSlider
                    min={0}
                    max={10000000}
                    onChange={({ min, max }) => {
                      handleSearchChanged("new_purchase", max);
                    }}
                  />
                </div>
              </Accordion>
            </div>

            <div>
              <Accordion expanded={preOwned} onChange={handlePreOwnedAccordion}>
                <AccordionSummary
                  expandIcon={<MdOutlineExpandMore />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <div className={styles.label}>Pre-Owned ($ million)</div>
                </AccordionSummary>
                <div className={styles.range}>
                  <MultiRangeSlider
                    min={0}
                    max={3000000}
                    onChange={({ min, max }) => {
                      handleSearchChanged("average_pre_owned", max);
                    }}
                  />
                </div>
              </Accordion>
            </div>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.list}>
              {filterResult?.length ? (
                filterResult?.map((product) => (
                  <Card
                    className={styles.card}
                    item={product}
                    key={product.aircraft_id}
                  />
                ))
              ) : aircraftsData?.length ? (
                aircraftsData?.map((product) => (
                  <Card
                    className={styles.card}
                    item={product}
                    key={product.aircraft_id}
                  />
                ))
              ) : (
                <p className={styles.inform}>Loading</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
