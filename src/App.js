import React, { useState, useEffect, useCallback } from "react";
import cn from "classnames";
import { HiOutlineSearch } from "react-icons/hi";

import useDebounce from "./utils/hooks/useDebounce";
import { getAllDataByType, filterDataByParams } from "./cosmic";

import Card from "./components/Card";
import Dropdown from "./components/Dropdown";
import {
  OPTIONS,
  CATEGORY_OPTIONS,
  ACTIVE_INDEX,
  MANUFACTURER_OPTIONS,
  PRODUCTION_OPTIONS,
} from "./utils/constants/app-constants";
import aircraftService from "./services/aircraft-service";
import axios from "axios";

import styles from "./styles/Search.module.scss";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export default function Search() {
  const [search, setSearch] = useState("");
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

  const debouncedMinTerm = useDebounce(min, 500);
  const debouncedMaxTerm = useDebounce(max, 500);

  const debouncedMinPassengers = useDebounce(min, 500);
  const debouncedMaxPassengers = useDebounce(max, 500);

  const [filterResult, setFilterResult] = useState([]);
  const [option, setOption] = useState(OPTIONS[0]);
  const [categoryOption, setCategoryOption] = useState(CATEGORY_OPTIONS[0]);
  const [productionOption, setProductionOption] = useState(
    PRODUCTION_OPTIONS[0]
  );
  const [manufacturerOption, setManufacturerOption] = useState(
    MANUFACTURER_OPTIONS[0]
  );

  const [categories, setCategories] = useState([]);
  const [activeIndex, setActiveIndex] = useState(ACTIVE_INDEX);

  const [aircraftsData, setAircraftsData] = useState([]);

  const handleChange = ({ target: { name, value } }) => {
    setValues((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

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

  const getCategories = async () => {
    const categoryTypes = await getAllDataByType("categories");
    if (categoryTypes.length) {
      setCategories(categoryTypes);
    }
  };

  useEffect(() => {
    aircraftService.getAircrafts().then((data) => setAircraftsData(data));
  }, []);

  const handleFilterDataByParams = useCallback(
    async ({
      category = activeIndex,
      color = option,
      min = debouncedMinTerm,
      max = debouncedMaxTerm,
      search = debouncedSearchTerm,
    }) => {
      const filterResult = await filterDataByParams({
        category,
        color,
        min,
        max,
        search: search.toLowerCase().trim(),
      });

      if (filterResult.hasOwnProperty("error")) {
        setFilterResult([]);
      } else {
        setFilterResult(filterResult);
      }
    },
    [debouncedSearchTerm, debouncedMinTerm, debouncedMaxTerm, option]
  );

  const getDataByFilterCategoryOptions = useCallback(
    async (color) => {
      setManufacturerOption(color);
      handleFilterDataByParams({ color });
    },
    [handleFilterDataByParams]
  );

  const getDataByFilterManufacturerOptions = useCallback(
    async (color) => {
      setCategoryOption(color);
      handleFilterDataByParams({ color });
    },
    [handleFilterDataByParams]
  );

  const getDataByFilterProductionOptions = useCallback(
    async (color) => {
      setProductionOption(color);
      handleFilterDataByParams({ color });
    },
    [handleFilterDataByParams]
  );

  const getDataByFilterOptions = useCallback(
    async (color) => {
      setOption(color);
      handleFilterDataByParams({ color });
    },
    [handleFilterDataByParams]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFilterDataByParams({ search: debouncedSearchTerm });
  };

  const handleChangeCategory = (id) => {
    setActiveIndex(id);
    handleFilterDataByParams({ category: id });
  };

  useEffect(() => {
    let isMount = true;

    if (
      isMount &&
      (debouncedSearchTerm?.length ||
        debouncedMinTerm?.length ||
        debouncedMaxTerm?.length)
    ) {
      handleFilterDataByParams({
        min: debouncedMinTerm,
        max: debouncedMaxTerm,
        search: debouncedSearchTerm,
      });
    } else {
      !search?.length && handleFilterDataByParams({ category: activeIndex });
    }

    !categories?.length && getCategories();

    return () => {
      isMount = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, debouncedMinTerm, debouncedMaxTerm]);

  return (
    <div className={cn("section-pt80", styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.row}>
          <div className={styles.filters}>
            <div className={styles.top}>
              <div className={styles.title}>Search Aircraft</div>
            </div>
            <div className={styles.form}>
              <form className={styles.search} action="" onSubmit={handleSubmit}>
                <input
                  className={styles.input}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
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
                  value={categoryOption}
                  setValue={getDataByFilterCategoryOptions}
                  options={CATEGORY_OPTIONS}
                />
              </div>
            </div>
            <div className={styles.sorting}>
              <div className={styles.dropdown}>
                <div className={styles.label}>Manufacturer</div>
                <Dropdown
                  className={styles.dropdown}
                  value={manufacturerOption}
                  setValue={getDataByFilterManufacturerOptions}
                  options={MANUFACTURER_OPTIONS}
                />
              </div>
            </div>
            <div className={styles.sorting}>
              <div className={styles.dropdown}>
                <div className={styles.label}>In Production</div>
                <Dropdown
                  className={styles.dropdown}
                  value={productionOption}
                  setValue={getDataByFilterProductionOptions}
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
              {aircraftsData?.length ? (
                aircraftsData?.map((product) => (
                  <Card
                    className={styles.card}
                    item={product}
                    key={product.slug}
                  />
                ))
              ) : (
                <p className={styles.inform}>Try another category!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
