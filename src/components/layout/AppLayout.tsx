import Sidebar from "../sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import "./appLayout.scss";

import { useTranslation } from "react-i18next";

const AppLayout = () => {
  const [t, i18n] = useTranslation();

  return (
    <body>
      <Sidebar />
      <div className="d-flex flex-column outlet">
        <Outlet />
        <div className="outletDropdown">
          <div className="switch">
            <input
              id="language-toggle"
              className="check-toggle check-toggle-round-flat"
              type="checkbox"
              onChange={(e) =>
                e.target.checked === true
                  ? i18n.changeLanguage("es")
                  : i18n.changeLanguage("en")
              }
            />
            <label htmlFor="language-toggle"></label>
            <span className="on">ENG</span>
            <span className="off">ESP</span>
          </div>
        </div>
      </div>
    </body>
  );
};

export default AppLayout;
