import React, { useState, useEffect, useCallback } from "react";
import cn from "classnames";
import { HiOutlineSearch } from "react-icons/hi";

import useDebounce from "./utils/hooks/useDebounce";
import { getAllDataByType, filterDataByParams } from "./cosmic";

import Card from "./components/Card";
import Dropdown from "./components/Dropdown";
import { OPTIONS, ACTIVE_INDEX } from "./utils/constants/app-constants";
import aircraftService from "./services/aircraft-service";
import axios from "axios";

import styles from "./styles/Search.module.scss";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export default function Search() {
  const [search, setSearch] = useState("");
  const debouncedSearchTerm = useDebounce(search, 500);

  const [{ min, max }, setRangeValues] = useState({ min: "", max: "" });
  const debouncedMinTerm = useDebounce(min, 500);
  const debouncedMaxTerm = useDebounce(max, 500);

  const [filterResult, setFilterResult] = useState([]);
  const [option, setOption] = useState(OPTIONS[0]);

  const [categories, setCategories] = useState([]);
  const [activeIndex, setActiveIndex] = useState(ACTIVE_INDEX);

  const [aircraftsData, setAircraftsData] = useState([]);

  const handleChange = ({ target: { name, value } }) => {
    setRangeValues((prevFields) => ({
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

  async function getAircrafts() {
    const aircrafts = await aircraftService
      .getAircrafts()
      .then((data) => setAircraftsData(data));
    if (aircrafts != null) {
      return aircrafts.results;
    } else {
    }
  }

  useEffect(() => {
    getAircrafts();
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
                  value={option}
                  setValue={getDataByFilterOptions}
                  options={OPTIONS}
                />
              </div>
            </div>
            <div className={styles.sorting}>
              <div className={styles.dropdown}>
                <div className={styles.label}>Manufacturer</div>
                <Dropdown
                  className={styles.dropdown}
                  value={option}
                  setValue={getDataByFilterOptions}
                  options={OPTIONS}
                />
              </div>
            </div>
            <div className={styles.sorting}>
              <div className={styles.dropdown}>
                <div className={styles.label}>In Production</div>
                <Dropdown
                  className={styles.dropdown}
                  value={option}
                  setValue={getDataByFilterOptions}
                  options={OPTIONS}
                />
              </div>
            </div>
            <div className={styles.range}>
              <div className={styles.label}>Passengers</div>
              <div className={styles.prices}>
                <input
                  className={styles.input}
                  type="text"
                  value={min}
                  onChange={handleChange}
                  name="min"
                  placeholder="MIN"
                  required
                />
                <p className={styles.separator}>to</p>
                <input
                  className={styles.input}
                  type="text"
                  value={max}
                  onChange={handleChange}
                  name="max"
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
                  value={min}
                  onChange={handleChange}
                  name="min"
                  placeholder="MIN"
                  required
                />
                <p className={styles.separator}>to</p>
                <input
                  className={styles.input}
                  type="text"
                  value={max}
                  onChange={handleChange}
                  name="max"
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
                  value={min}
                  onChange={handleChange}
                  name="min"
                  placeholder="MIN"
                  required
                />
                <p className={styles.separator}>to</p>
                <input
                  className={styles.input}
                  type="text"
                  value={max}
                  onChange={handleChange}
                  name="max"
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
                  value={min}
                  onChange={handleChange}
                  name="min"
                  placeholder="MIN"
                  required
                />
                <p className={styles.separator}>to</p>
                <input
                  className={styles.input}
                  type="text"
                  value={max}
                  onChange={handleChange}
                  name="max"
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
