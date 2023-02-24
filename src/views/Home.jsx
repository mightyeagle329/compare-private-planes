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
import { Slider } from "@mui/material";

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
  const [hourlyPriceExpanded, setHourlyPriceExpanded] = useState(false);
  const [annualPriceExpanded, setannualPriceExpanded] = useState(false);
  const [purchasePriceAccordion, setPurchasePriceAccordion] = useState(false);
  const [preOwnedExpanded, setpreOwnedExpanded] = useState(false);
  const [maxPax, setMaxPax] = useState(null);
  const [range, setRange] = useState(null);
  const [cruiseSpeed, setcruiseSpeed] = useState(null);
  const [maxAltitude, setmaxAltitude] = useState(null);
  const [fuelBurn, setfuelBurn] = useState(null);
  const [baggageCapacity, setbaggageCapacity] = useState(null);
  const [takeOffDistance, settakeOffDistance] = useState(null);
  const [landingDistance, setlandingDistance] = useState(null);
  const [annualFixedCost, setannualFixedCost] = useState(null);
  const [hourlyprice, sethourlyprice] = useState(null);
  const [purchaseprice, setpurchaseprice] = useState(null);
  const [preowned, setpreowned] = useState(null);

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
  const handleAnnualPriceAccordion = () => {
    setannualPriceExpanded(!annualPriceExpanded);
  };

  const handleHourlyPriceAccordion = () => {
    setHourlyPriceExpanded(!hourlyPriceExpanded);
  };

  const handlePurchaseAccordion = () => {
    setPurchasePriceAccordion(!purchasePriceAccordion);
  };

  const handlePreOwnedAccordion = () => {
    setpreOwnedExpanded(!preOwnedExpanded);
  };
  const [search, setSearch] = useState({
    aircraft_name: "",
    category: "",
    in_production: "",
    aircraft_manufacturer: "",
    max_pax: 120,
    range_NM: 3000,
    high_cruise_knots: 12312,
    max_altitude_feet: 12312,
    hourly_fuel_burn_GPH: 10000,
    baggage_capacity_CF: 10000,
    TO_distance_feet: 10000,
    landing_distance_feet: 10000,
    annual_cost: 1000000,
    estimated_hourly_charter: 1000000,
    new_purchase: 10000000,
    average_pre_owned: 1000000,
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

  const handlePaxChanged = (event, newValue) => {
    setMaxPax(newValue);
    handleSearchChanged("max_pax", newValue);
  };

  const handleRangeChanged = (event, newValue) => {
    setRange(newValue);
    handleSearchChanged("range_NM", newValue);
  };

  const handleCruiseChanged = (event, newValue) => {
    setcruiseSpeed(newValue);
    handleSearchChanged("high_cruise_knots", newValue);
  };

  const handleMaxAltitudeChanged = (event, newValue) => {
    setmaxAltitude(newValue);
    handleSearchChanged("max_altitude_feet", newValue);
  };

  const handleFuelBurnChanged = (event, newValue) => {
    setfuelBurn(newValue);
    handleSearchChanged("hourly_fuel_burn_GPH", newValue);
  };

  const handleBaggageCapacityChanged = (event, newValue) => {
    setbaggageCapacity(newValue);
    handleSearchChanged("baggage_capacity_CF", newValue);
  };

  const handleTakeOffChanged = (event, newValue) => {
    settakeOffDistance(newValue);
    handleSearchChanged("TO_distance_feet", newValue);
  };

  const handleLandingDistanceChanged = (event, newValue) => {
    setlandingDistance(newValue);
    handleSearchChanged("landing_distance_feet", newValue);
  };
  const handleAnnualFixedChanged = (event, newValue) => {
    setannualFixedCost(newValue);
    handleSearchChanged("annual_cost", newValue);
  };
  const handleHourlyPriceChange = (event, newValue) => {
    sethourlyprice(newValue);
    handleSearchChanged("estimated_hourly_charter", newValue);
  };
  const handlePurchasePriceChanged = (event, newValue) => {
    setpurchaseprice(newValue);
    handleSearchChanged("new_purchase", newValue);
  };
  const handlePreOwnedChanged = (event, newValue) => {
    setpreowned(newValue);
    handleSearchChanged("average_pre_owned", newValue);
  };

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
                    handleSearchChanged(
                      "in_production",
                      value === "Yes" ? true : false
                    )
                  }
                  options={PRODUCTION_OPTIONS}
                />
              </div>
            </div>
            <div>
              <Accordion
                expanded={passengerExpanded}
                onChange={handlePassengerAccordion}
              >
                <AccordionSummary
                  expandIcon={<MdOutlineExpandMore />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <div className={styles.label}>Max Passengers: {maxPax}</div>
                </AccordionSummary>
                <div className={styles.range}>
                  <Slider
                    className={styles.slider_home}
                    aria-label="Volume"
                    value={maxPax}
                    max={20}
                    onChange={handlePaxChanged}
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
                  <div className={styles.label}>Max Range: {range}</div>
                </AccordionSummary>
                <div className={styles.range}>
                  <Slider
                    className={styles.slider_home}
                    aria-label="Volume"
                    value={range}
                    max={300}
                    onChange={handleRangeChanged}
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
                  <div className={styles.label}>
                    Cruise Speed (Knots): {cruiseSpeed}
                  </div>
                </AccordionSummary>
                <div className={styles.range}>
                  <Slider
                    className={styles.slider_home}
                    aria-label="Volume"
                    value={cruiseSpeed}
                    max={3000}
                    onChange={handleCruiseChanged}
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
                  <div className={styles.label}>
                    Max Altitude (Feet): {maxAltitude}
                  </div>
                </AccordionSummary>
                <div className={styles.range}>
                  <Slider
                    className={styles.slider_home}
                    aria-label="Volume"
                    value={maxAltitude}
                    max={30000}
                    onChange={handleMaxAltitudeChanged}
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
                  <div className={styles.label}>
                    Fuel Burn (Gallons/Hour): {fuelBurn}
                  </div>
                </AccordionSummary>
                <div className={styles.range}>
                  <Slider
                    className={styles.slider_home}
                    aria-label="Volume"
                    value={fuelBurn}
                    max={3000}
                    onChange={handleFuelBurnChanged}
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
                  <div className={styles.label}>
                    Baggage Capacity (cu ft): {baggageCapacity}
                  </div>
                </AccordionSummary>
                <div className={styles.range}>
                  <Slider
                    className={styles.slider_home}
                    aria-label="Volume"
                    value={baggageCapacity}
                    max={3000}
                    onChange={handleBaggageCapacityChanged}
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
                  <div className={styles.label}>
                    Take-Off Distance (feet): {takeOffDistance}
                  </div>
                </AccordionSummary>
                <div className={styles.range}>
                  <Slider
                    className={styles.slider_home}
                    aria-label="Volume"
                    value={takeOffDistance}
                    max={3000}
                    onChange={handleTakeOffChanged}
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
                  <div className={styles.label}>
                    Landing Distance (feet): {landingDistance}
                  </div>
                </AccordionSummary>
                <div className={styles.range}>
                  <Slider
                    className={styles.slider_home}
                    aria-label="Volume"
                    value={landingDistance}
                    max={3000}
                    onChange={handleLandingDistanceChanged}
                  />
                </div>
              </Accordion>
            </div>

            <div>
              <Accordion
                expanded={annualPriceExpanded}
                onChange={handleAnnualPriceAccordion}
              >
                <AccordionSummary
                  expandIcon={<MdOutlineExpandMore />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <div className={styles.label}>
                    Annual Fixed Cost ($): {annualFixedCost}
                  </div>
                </AccordionSummary>
                <div className={styles.range}>
                  <Slider
                    className={styles.slider_home}
                    aria-label="Volume"
                    value={annualFixedCost}
                    max={30000}
                    onChange={handleAnnualFixedChanged}
                  />
                </div>
              </Accordion>
            </div>

            <div>
              <Accordion
                expanded={hourlyPriceExpanded}
                onChange={handleHourlyPriceAccordion}
              >
                <AccordionSummary
                  expandIcon={<MdOutlineExpandMore />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <div className={styles.label}>
                    Hourly Price ($): {hourlyprice}
                  </div>
                </AccordionSummary>
                <div className={styles.range}>
                  <Slider
                    className={styles.slider_home}
                    aria-label="Volume"
                    value={hourlyprice}
                    max={10000}
                    onChange={handleHourlyPriceChange}
                  />
                </div>
              </Accordion>
            </div>

            <div>
              <Accordion
                expanded={purchasePriceAccordion}
                onChange={handlePurchaseAccordion}
              >
                <AccordionSummary
                  expandIcon={<MdOutlineExpandMore />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <div className={styles.label}>
                    Purchase Price ($): {purchaseprice}
                  </div>
                </AccordionSummary>
                <div className={styles.range}>
                  <Slider
                    className={styles.slider_home}
                    aria-label="Volume"
                    value={purchaseprice}
                    min={100000}
                    max={1000000}
                    onChange={handlePurchasePriceChanged}
                  />
                </div>
              </Accordion>
            </div>

            <div>
              <Accordion
                expanded={preOwnedExpanded}
                onChange={handlePreOwnedAccordion}
              >
                <AccordionSummary
                  expandIcon={<MdOutlineExpandMore />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <div className={styles.label}>
                    Pre-Owned ($ million): {preowned}
                  </div>
                </AccordionSummary>
                <div className={styles.range}>
                  <Slider
                    className={styles.slider_home}
                    aria-label="Volume"
                    value={preowned}
                    max={300}
                    onChange={handlePreOwnedChanged}
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
