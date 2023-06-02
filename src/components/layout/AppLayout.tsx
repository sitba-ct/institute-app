import Sidebar from "../sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import "./appLayout.scss";

import { useTranslation } from "react-i18next";
import INavItem from "../../services/sideBar/INavItems";

const AppLayout = () => {
  const sidebarNavItems: INavItem[] = [
    {
      display: "Students",
      icon: <i className="bx bx-body"></i>,
      to: "/students",
      section: "students",
      rolesAllowed: ["secretary", "admin"],
      isVisible: JSON.parse(
        process.env.REACT_APP_UI_NAVITEM_STUDENTS_ISVISIBLE!
      ),
    },
    {
      display: "Courses",
      icon: <i className="bx bx-book"></i>,
      to: "/courses",
      section: "courses",
      rolesAllowed: ["secretary", "admin"],
      isVisible: JSON.parse(
        process.env.REACT_APP_UI_NAVITEM_COURSES_ISVISIBLE!
      ),
    },
    {
      display: "Groups",
      icon: <i className="bx bx-group"></i>,
      to: "/groups",
      section: "groups",
      rolesAllowed: ["secretary", "admin"],
      isVisible: JSON.parse(process.env.REACT_APP_UI_NAVITEM_GROUPS_ISVISIBLE!),
    },
    {
      display: "Cashflow",
      icon: <i className="bx bx-money"></i>,
      to: "/cashflow",
      section: "cashflow",
      rolesAllowed: ["secretary", "admin"],
      isVisible: JSON.parse(
        process.env.REACT_APP_UI_NAVITEM_CASHFLOW_ISVISIBLE!
      ),
    },
    {
      display: "Reports",
      icon: <i className="bx bx-line-chart"></i>,
      to: "/reports",
      section: "reports",
      rolesAllowed: ["admin"],
      isVisible: JSON.parse(
        process.env.REACT_APP_UI_NAVITEM_REPORTS_ISVISIBLE!
      ),
    },
    {
      display: "LogOut",
      icon: <i className="bx bx-log-out"></i>,
      to: "/logOut",
      section: "logOut",
      rolesAllowed: ["secretary", "admin"],
      isVisible: JSON.parse(process.env.REACT_APP_UI_NAVITEM_LOGOUT_ISVISIBLE!),
    },
  ];

  const [t, i18n] = useTranslation();

  return (
    <body>
      <Sidebar
        sidebarNavItems={sidebarNavItems.filter(
          (navItem) => navItem.isVisible === true
        )}
      />
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
