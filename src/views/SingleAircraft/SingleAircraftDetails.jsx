import global from "../../components/styles/global.module.scss";
import pdf from "../../components/styles/pdf.module.scss";
import logo from "../../assets/logo.png";
import { HiOutlineSearch } from "react-icons/hi";

import scopedStyles from "./styles.module.scss";
import cn from "classnames";
import Header from "../../components/common/header";
import KeyFacts from "../../components/SingleAircraft/KeyFacts";
import BasicInfo from "../../components/SingleAircraft/BasicInfo";
import PerformanceData from "../../components/SingleAircraft/PerformanceData";
import OwnershipCosts from "../../components/SingleAircraft/OwnershipCosts/OwnershipCosts";
import Acquisition from "../../components/SingleAircraft/Acquisition";
import RangeMap from "../../components/SingleAircraft/RangeMap";
import Maintenance from "../../components/SingleAircraft/Maintenance";
import Interior from "../../components/SingleAircraft/Interior";
import Features from "../../components/SingleAircraft/Features";
import Powerplant from "../../components/SingleAircraft/Powerplant";
import Weights from "../../components/SingleAircraft/Weights";
import Dimensions from "../../components/SingleAircraft/Dimensions";
import AccidentData from "../../components/SingleAircraft/AccidentData";
import Similar from "../../components/SingleAircraft/Similar";
import Modal from "../../components/common/modal/Modal";

import aircraftService from "../../services/aircraft-service";

import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { searchService } from "../../utils/hooks/utils";
import styles from "./styles.module.scss";
import {
  COUNTRY_OPTIONS,
  CURRENCY_OPTIONS,
  UNIT_OPTIONS,
} from "../../utils/constants/app-constants";
import Dropdown from "../../components/common/Dropdown";
import Footer from "../../components/common/footer";
import { style } from "@mui/system";

export default function SingleAircraftDetails() {
  const [aircraftData, setAircraftData] = useState([]);
  const [aircraftsData, setAircraftsData] = useState([]);
  const [accidentsData, setAccidentsData] = useState([]);
  const [nbAccidents, setNbAccidents] = useState(0);
  const [searchText, setsearchText] = useState("");
  const [similarAircrafts, setSimilarAircrafts] = useState([]);
  const [currency, setCurrency] = useState(CURRENCY_OPTIONS[0]);
  const [country, setCountry] = useState(COUNTRY_OPTIONS[0]);
  const [unit, setUnit] = useState(UNIT_OPTIONS[0]);
  const [openModal, setOpenModal] = useState(false);
  const [keys, setKeys] = useState([]);
  const [history, setHistory] = useState([]);
  const [filteredAircrafts, setFilteredAircrafts] = useState();

  const searchAircraft = async (cat) => {
    console.log(cat);
    const res = await searchService(
      `/api/search?aircraft_name=&category=${cat}&in_production=&aircraft_manufacturer=&max_pax=120&max_pax_min=0&range_NM_min=0&range_NM=8000&high_cruise_knots_min=0&high_cruise_knots=12312&max_altitude_feet_min=0&max_altitude_feet=60000&hourly_fuel_burn_GPH_min=0&hourly_fuel_burn_GPH=50000&baggage_capacity_CF_min=0&baggage_capacity_CF=10000&TO_distance_feet_min=0&TO_distance_feet=10000&landing_distance_feet_min=0&landing_distance_feet=10000&annual_cost_min=0&annual_cost=9000000&estimated_hourly_charter_min=0&estimated_hourly_charter=1000000&new_purchase_min=0&new_purchase=100000000&average_pre_owned_min=0&average_pre_owned=100000000`
    );
    setSimilarAircrafts(
      res.filter(
        (aircraft) => aircraft.aircraft_id !== aircraftData.aircraft_id
      )
    );
    setSimilarAircrafts(res.slice(0, 3));
  };

  var id = -1;
  const loc = useLocation();
  if (loc.state === null) {
    const baseURL = window.location.origin;
    window.location.href = baseURL + "/not-found";
  } else {
    id = loc.state.aircraftData.aircraft_id;
  }

  const onCurrencyChanged = (val) => {
    setCurrency(val);
  };

  const onUnitChanged = (val) => {
    setUnit(val);
  };

  const onCountryChanged = (val) => {
    setCountry(val);
  };
  const location = useLocation();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    console.log(token);
    if (location.state !== null) {
      if (
        location.state.prevRoute === "/subscription/check" &&
        token === "enabled"
      ) {
        console.log(location.state.prevRoute);
        return;
      }
    }
    if (token === null) {
      navigate("not-found");
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    aircraftService
      .getAircraftById(id)
      .then((data) =>
        searchAircraft(data[0].category, data[0].range_NM, data[0].new_purchase)
      );
  }, [aircraftsData, aircraftData]);

  useEffect(() => {
    window.scrollTo(0, 0);
    aircraftService
      .getAircraftById(id)
      .then((data) => setAircraftData(data[0]));
  }, [id]);

  useEffect(() => {
    aircraftService
      .getAircraftById(id)
      .then((data) => setKeys(JSON.parse(data[0].acquisition_values)));
  }, [id]);

  useEffect(() => {
    aircraftService
      .getAircraftById(id)
      .then((data) => setHistory(JSON.parse(data[0].historical_data)));
  }, [id]);

  useEffect(() => {
    aircraftService.getAircrafts().then((data) => setAircraftsData(data));
  }, []);

  useEffect(() => {
    aircraftService.getAircrafts().then((data) => setFilteredAircrafts(data));
  }, []);

  useEffect(() => {
    aircraftService
      .getAccidents()
      .then((data) => setAccidentsData(data.accidents))
      .then((data) => setNbAccidents(data.count));
  }, []);

  useEffect(() => {
    aircraftService.getAccidents().then((data) => setNbAccidents(data.count));
  }, []);

  let selectedAircafts = [];
  selectedAircafts.push(aircraftData);
  const onSelect = (e, aircraft) => {
    if (selectedAircafts.includes(aircraft)) {
      e.target.checked = false;
      selectedAircafts.pop(aircraft);
      return;
    }
    if (selectedAircafts.length >= 3) {
      alert("Max 3");
      e.target.checked = false;
      return;
    }

    selectedAircafts.push(aircraft);
  };
  const navigate = useNavigate();

  const onCompare = () => {
    if (selectedAircafts.length < 1) {
      alert("Select at least 1 aircraft");
      return;
    }
    navigate("/compare", { state: selectedAircafts });
  };

  const handleSearchChanged = async (value) => {
    setsearchText(value);
    const res = await searchService(
      `/api/search?aircraft_name=${value}&category=&in_production=&aircraft_manufacturer=&max_pax=120&max_pax_min=0&range_NM_min=0&range_NM=8000&high_cruise_knots_min=0&high_cruise_knots=12312&max_altitude_feet_min=0&max_altitude_feet=60000&hourly_fuel_burn_GPH_min=0&hourly_fuel_burn_GPH=50000&baggage_capacity_CF_min=0&baggage_capacity_CF=10000&TO_distance_feet_min=0&TO_distance_feet=10000&landing_distance_feet_min=0&landing_distance_feet=10000&annual_cost_min=0&annual_cost=9000000&estimated_hourly_charter_min=0&estimated_hourly_charter=1000000&new_purchase_min=0&new_purchase=100000000&average_pre_owned_min=0&average_pre_owned=100000000`
    );
    setFilteredAircrafts(res);
  };

  return (
    <>
      <Header />
      <div className={cn(pdf.for_pdf)}>
        <div className={pdf.first_page}>
          <div className={pdf.logo_container}>
            <img src={logo} alt="logo" />
          </div>
          <h3>Compare Private Planes</h3>
          <h1>{aircraftData.aircraft_name}</h1>
          <div className={cn(pdf.sample_aircrafts)}>
            <div className={cn(pdf.sample_aircraft)}>
              <div className={cn(pdf.image_container)}>
                <img src={aircraftData.image_name} alt="aircraft" />
              </div>
              <div className={cn(pdf.sample_aircraft_info)}>
                <p>{aircraftData.manufacturer}</p>
              </div>
            </div>
          </div>
          <footer>
            <center>
              <p>&#169; Magic Lagoon Limited</p>
              <p>{new Date().getFullYear()}</p>
            </center>
          </footer>
        </div>
      </div>
      <main className={cn(global.wrapper)}>
        <div className={styles.sorting + " " + global.pdf_hidden}>
          <div className={styles.dropdown}>
            <Dropdown
              className={styles.dropdown}
              headerDropdown={true}
              value={unit}
              setValue={(value) => onUnitChanged(value)}
              options={UNIT_OPTIONS}
            />
            <Dropdown
              className={styles.dropdown}
              headerDropdown={true}
              value={country}
              setValue={(value) => onCountryChanged(value)}
              options={COUNTRY_OPTIONS}
            />
            <Dropdown
              className={styles.dropdown}
              headerDropdown={true}
              value={currency}
              setValue={(value) => onCurrencyChanged(value)}
              options={CURRENCY_OPTIONS}
            />
            <input
              type="button"
              className={styles.header_btn}
              value="Compare Aircraft"
              onClick={() => setOpenModal(!openModal)}
            />
            <input
              type="button"
              className={styles.header_btn}
              value="Export Report"
              onClick={() => window.print()}
            />{" "}
          </div>
        </div>
        <KeyFacts
          params={aircraftData}
          currency={currency}
          country={country}
          unit={unit}
        />
        <BasicInfo params={aircraftData} currency={currency} />
        <PerformanceData params={aircraftData} unit={unit} />
        <OwnershipCosts
          params={aircraftData}
          currency={currency}
          country={country}
        />
        <Acquisition
          params={aircraftData}
          acquisition={keys}
          currency={currency}
        />
        <RangeMap params={aircraftData} />
        {aircraftData.a_check === "" &&
        aircraftData.b_check === "" &&
        aircraftData.c_check === "" &&
        aircraftData.d_check === "" ? (
          <div></div>
        ) : (
          <Maintenance params={aircraftData} />
        )}
        <Interior params={aircraftData} unit={unit} />
        <Features params={aircraftData} />
        <Powerplant params={aircraftData} unit={unit} />
        <Weights params={aircraftData} unit={unit} />
        <Dimensions params={aircraftData} unit={unit} />
        <AccidentData
          params={accidentsData}
          nbAccidents={nbAccidents}
          aircraftName={aircraftData.aircraft_name}
        />

        <Similar
          params={similarAircrafts.filter(
            (aircraft) => aircraft.aircraft_id !== aircraftData.aircraft_id
          )}
        />
        <div className={cn(global.footer, global.pdf_hidden)}>
          <div>
            <div className={cn(global.btns_container)}>
              <button
                className={cn(global.action_btn)}
                onClick={() => window.print()}
              >
                Export Report as PDF
              </button>
              <button
                className={cn(global.action_btn)}
                onClick={() => setOpenModal(!openModal)}
              >
                Add Aircraft to compare
              </button>
            </div>
          </div>
        </div>
        <Modal
          title={`Compare ${aircraftData.aircraft_name} with other aircraft`}
          notice="You can compare up to 3 aircraft"
          toggler={openModal}
        >   
          <div className={cn(global.pdf_hidden)}>
            <div className={styles.form}>
              <form className={styles.search} action="">
                <input
                  type="text"
                  value={searchText}
                  className={styles.input}
                  placeholder="Search aircraft"
                  onChange={(e) => handleSearchChanged(e.target.value)}
                />
              </form>
            </div>
            <div className={cn(scopedStyles.options)}>
              {searchText === "" ? (
                aircraftsData.map((aircraft) => {
                  return (
                    <label
                      className={cn(scopedStyles.option)}
                      key={aircraft.aircraft_id}
                    >
                      <span>{aircraft.aircraft_name}</span>
                      <input
                        type="checkbox"
                        value={aircraft.aircraft_id}
                        name="aircraft"
                        // pass aircraft_id as param to onSelect
                        onClick={(e) => onSelect(e, aircraft)}
                      />
                      <i
                        className={
                          "fa-solid fa-check " + cn(scopedStyles.checkmark)
                        }
                      ></i>
                      <img src={aircraft.image_name} alt="" />
                    </label>
                  );
                })
              ) : filteredAircrafts?.length ? (
                filteredAircrafts.map((aircraft) => {
                  return (
                    <label
                      className={cn(scopedStyles.option)}
                      key={aircraft.aircraft_id}
                    >
                      <span>{aircraft.aircraft_name}</span>
                      <input
                        type="checkbox"
                        value={aircraft.aircraft_id}
                        name="aircraft"
                        // pass aircraft_id as param to onSelect
                        onClick={(e) => onSelect(e, aircraft)}
                      />
                      <i
                        className={
                          "fa-solid fa-check " + cn(scopedStyles.checkmark)
                        }
                      ></i>
                      <img src={aircraft.image_name} alt="" />
                    </label>
                  );
                })
              ) : (
                <p>loading</p>
              )}
            </div>
            <button
              onClick={() => onCompare()}
              className={scopedStyles.compare_btn}
            >
              Compare
            </button>
          </div>
        </Modal>
      </main>
      <Footer />
    </>
  );
}
