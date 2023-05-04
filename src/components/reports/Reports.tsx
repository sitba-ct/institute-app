import { useState } from "react";
import { useTranslation } from "react-i18next";
import DailyIncomes from "./daily/incomes/DailyIncomes";
import DailyOutflow from "./daily/outflow/DailyOutflow";
import MonthlyIncomes from "./monthly/incomes/MonthlyIncomes";
import MonthlyOutflows from "./monthly/outFlows/MonthlyOutflows";
import "./reports.scss";

const Reports = () => {
  const [toggleState, setToggleState] = useState(1);
  const [reportsTranslation] = useTranslation("reports");

  const toggleTab = (index: any) => {
    setToggleState(index);
  };

  return (
    <div className="tabNavigationContainer">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          {reportsTranslation("reports.TabNavigation.dailyReports")}
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          {reportsTranslation("reports.TabNavigation.monthlyReports")}
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <DailyIncomes />
          <DailyOutflow />
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <MonthlyIncomes />
          <MonthlyOutflows />
        </div>
      </div>
    </div>
  );
};

export default Reports;
