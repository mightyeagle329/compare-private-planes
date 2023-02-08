import React, { useState, useEffect } from "react";
import cn from "classnames";
import { HiOutlineSearch } from "react-icons/hi";

import useDebounce from "../utils/hooks/useDebounce";
import { searchService } from "../utils/hooks/utils";

import Card from "../components/common/Card";
import Dropdown from "../components/common/Dropdown";
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

import styles from "../styles/Search.module.scss";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export default function Search() {
  const [search, setSearch] = useState({
    aircraft_name: "",
    category: "",
    in_production: "",
    model: "",
  });
  const debouncedSearchTerm = useDebounce(search, 500);

  const [{ min, max }, setValues] = useState({ min: "", max: "" });
  const [{ minPassengers, maxPassengers }, setPassengerValues] = useState({
    minPassengers: "",
    maxPassengers: "",
  });

  const [{ minRange, maxRange }, setRangeValues] = useState({
    minRange: "",
    maxRange: "",
  });
  const [{ minCruise, maxCruise }, setCruiseValues] = useState({
    minCruise: "",
    maxCruise: "",
  });
  const [{ minAltitude, maxAltitude }, setAltitudeValues] = useState({
    minAltitude: "",
    maxAltitude: "",
  });

  const [aircraftsData, setAircraftsData] = useState([]);
  const [filterResult, setFilterResult] = useState([]);

  const handlePassengerChange = ({ target: { name, value } }) => {
    setPassengerValues((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleRangeChange = ({ target: { name, value } }) => {
    setRangeValues((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleCruiseChange = ({ target: { name, value } }) => {
    setCruiseValues((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleAltitudeChange = ({ target: { name, value } }) => {
    setAltitudeValues((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

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

  const [rerender, setRerenderer] = useState(false)
  const openFilter = () => {
    const filter = document.querySelector(".filters_target");
    if(filter.style.display === "none"){
      filter.style.display = "flex";
    }else{
      filter.style.display = "none";
    }
    
  };
  

  return (
    <div className={cn("section-pt80", styles.section)}>
      <div className={cn(styles.container)}>
        <div className={styles.row}>
          <span className={styles.open_filter} 
            onClick={() => openFilter()}
          >
            <i class="fa-solid fa-sliders"></i>
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
                  value={MANUFACTURER_OPTIONS_DIC[search.model]}
                  setValue={(value) => handleSearchChanged("model", value)}
                  options={MANUFACTURER_OPTIONS}
                />
              </div>
            </div>
            <div className={styles.sorting}>
              <div className={styles.dropdown}>
                <div className={styles.label}>In Production</div>
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
            <div className={styles.range}>
              <div className={styles.label}>Passengers</div>
              <div className={styles.prices}>
                <input
                  className={styles.input}
                  type="text"
                  value={minPassengers}
                  onChange={handlePassengerChange}
                  name="minPassengers"
                  placeholder="MIN"
                  required
                />
                <p className={styles.separator}>to</p>
                <input
                  className={styles.input}
                  type="text"
                  value={maxPassengers}
                  onChange={handlePassengerChange}
                  name="maxPassengers"
                  placeholder="MAX"
                  required
                />
              </div>
            </div>
            <div className={styles.range}>
              <div className={styles.label}>Range (NM)</div>
              <div className={styles.prices}>
                <input
                  className={styles.input}
                  type="text"
                  value={minRange}
                  onChange={handleRangeChange}
                  name="minRange"
                  placeholder="MIN"
                  required
                />
                <p className={styles.separator}>to</p>
                <input
                  className={styles.input}
                  type="text"
                  value={maxRange}
                  onChange={handleRangeChange}
                  name="maxRange"
                  placeholder="MAX"
                  required
                />
              </div>
            </div>
            <div className={styles.range}>
              <div className={styles.label}>Cruise Speed (Knots)</div>
              <div className={styles.prices}>
                <input
                  className={styles.input}
                  type="text"
                  value={minCruise}
                  onChange={handleCruiseChange}
                  name="minCruise"
                  placeholder="MIN"
                  required
                />
                <p className={styles.separator}>to</p>
                <input
                  className={styles.input}
                  type="text"
                  value={maxCruise}
                  onChange={handleCruiseChange}
                  name="maxCruise"
                  placeholder="MAX"
                  required
                />
              </div>
            </div>
            <div className={styles.range}>
              <div className={styles.label}>Max Altitude (Feet)</div>
              <div className={styles.prices}>
                <input
                  className={styles.input}
                  type="text"
                  value={minAltitude}
                  onChange={handleAltitudeChange}
                  name="minAltitude"
                  placeholder="MIN"
                  required
                />
                <p className={styles.separator}>to</p>
                <input
                  className={styles.input}
                  type="text"
                  value={maxAltitude}
                  onChange={handleAltitudeChange}
                  name="maxAltitude"
                  placeholder="MAX"
                  required
                />
              </div>
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
