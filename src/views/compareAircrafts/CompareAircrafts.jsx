import global from "../../components/styles/global.module.scss";
import pdf from "../../components/styles/pdf.module.scss";
import cn from "classnames";

import logo from "../../assets/logo.png";

import Header from "../../components/common/header";
import AquisitionCost from "../../components/CompareAircrafts/AquisitionCost";
import BascInfo from "../../components/CompareAircrafts/BasicInfo";
import Dimensions from "../../components/CompareAircrafts/Dimensions";
import Features from "../../components/CompareAircrafts/Features";
import HistoricalMarket from "../../components/CompareAircrafts/HistoricalMarket";
import Interior from "../../components/CompareAircrafts/Interior";
import KeyFacts from "../../components/CompareAircrafts/KeyFacts";
import Maintenance from "../../components/CompareAircrafts/Maintenance";
import OwnershipCost from "../../components/CompareAircrafts/OwnershipCost";
import Performance from "../../components/CompareAircrafts/Performance";
import Powerplant from "../../components/CompareAircrafts/Powerplant";
import Range from "../../components/CompareAircrafts/Range";
import Weights from "../../components/CompareAircrafts/Weight";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import Dropdown from "../../components/common/Dropdown";
import {
  COUNTRY_OPTIONS,
  CURRENCY_OPTIONS,
  UNIT_OPTIONS,
} from "../../utils/constants/app-constants";

const CompareAircrafts = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const [unit, setUnit] = useState(UNIT_OPTIONS[0]);
  const [currency, setCurrency] = useState(CURRENCY_OPTIONS[0]);
  const [country, setCountry] = useState(COUNTRY_OPTIONS[0]);
  const [openModal, setOpenModal] = useState(false);
  const location = useLocation();
  const aircrafts = location.state;
  const [aircraftsData, setAircraftsData] = useState(aircrafts);

  const onCurrencyChanged = (val) => {
    setCurrency(val);
  };

  const onUnitChanged = (val) => {
    setUnit(val);
  };

  const onCountryChanged = (val) => {
    setCountry(val);
  };

  const onRemoveAircraft = (data) => {
    setAircraftsData(data);
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
          <h1>Aircraft Comparison Report</h1>
          <div className={cn(pdf.sample_aircrafts)}>
            {aircraftsData.map((aircraft, index) => {
              return (
                <div className={cn(pdf.sample_aircraft)} key={index}>
                  <div className={cn(pdf.image_container)}>
                    <img src={aircraft.image_name} alt="aircraft" />
                  </div>
                  <div className={cn(pdf.sample_aircraft_info)}>
                    <h4>{aircraft.aircraft_name}</h4>
                    <p>{aircraft.manufacturer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={cn(pdf.second_page)}>
          <p>
            This report has been generated using Compare Private Planes premium
            service. Data is to be used for comparison purposes only and should
            not be used for flight planning. Costs are estimates only. For a
            full list of assumptions and the methodology of data collection,
            please visit compareprivateplanes.com Compare Private Planes is
            wholly owned and operated by Magic Lagoon Limited. This report has
            been generated by USER FIRST NAME OR EMAIL Options selected for this
            report are: Region: North America Currency: USD Units: Imperial
            Estimated Annual Flight Hours: 200
          </p>

          {/* <footer>
            <p>&#169; Magic Lagoon Limited</p>
            <p>{new Date().getFullYear()}</p>
          </footer> */}
        </div>
      </div>

      <main className={cn(global.wrapper)}>
        <div className={styles.sorting}>
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
              value="Export Report"
              onClick={() => window.print()}
            />{" "}
          </div>
        </div>
        <KeyFacts data={aircraftsData} onRemoveAircraft={onRemoveAircraft} />
        <BascInfo data={aircraftsData} />
        <Performance
          data={aircraftsData}
          currency={currency}
          country={country}
          unit={unit}
        />
        <OwnershipCost
          data={aircraftsData}
          currency={currency}
          country={country}
          unit={unit}
        />
        <AquisitionCost
          data={aircraftsData}
          currency={currency}
          country={country}
          unit={unit}
        />
        <HistoricalMarket params={aircraftsData} />
        <Range data={aircraftsData} />
        <Maintenance
          data={aircraftsData}
          currency={currency}
          country={country}
          unit={unit}
        />
        <Interior
          data={aircraftsData}
          currency={currency}
          country={country}
          unit={unit}
        />
        <Features
          data={aircraftsData}
          currency={currency}
          country={country}
          unit={unit}
        />
        <Powerplant
          data={aircraftsData}
          currency={currency}
          country={country}
          unit={unit}
        />
        <Weights
          data={aircraftsData}
          currency={currency}
          country={country}
          unit={unit}
        />
        <Dimensions
          data={aircraftsData}
          currency={currency}
          country={country}
          unit={unit}
        />
        <div className={cn(global.footer)}>
          <div>
            <div className={cn(global.btns_container)}>
              <button
                className={cn(global.action_btn, global.pdf_hidden)}
                onClick={() => window.print()}
              >
                Export Report as PDF
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CompareAircrafts;
