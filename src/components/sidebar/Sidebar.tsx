import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import INavItem from "../../services/sideBar/INavItems";
import "../layout/appLayout.scss";
import getSessionFromStorage from "../../services/auth/SessionService";
import { BiBody } from "react-icons/bi";
import { BsCashCoin } from "react-icons/bs";
import React from "react";
import AddIncome from "../cashflow/incomes/addIncome/AddIncome";
import AddOutflow from "../cashflow/outFlows/addOutflow/AddOutflow";

type sidebarProps = {
  sidebarNavItems: INavItem[];
};

const Sidebar = (props: sidebarProps) => {
  const [sidebarTranslation] = useTranslation("sidebar");

  const [activeIndex, setActiveIndex] = useState(0);
  const [stepHeight, setStepHeight] = useState(0);
  const sidebarRef: any = useRef();
  const indicatorRef: any = useRef();
  const location = useLocation();
  const [visibleNavBarItems, setVisibleNavBarItems] = useState<INavItem[]>(
    props.sidebarNavItems
  );
  const [userRole, setUserRole] = useState<string>();
  const [expandCourses, setExpandCourses] = useState<boolean>(false);
  const [expandCashflow, setExpandCashflow] = useState<boolean>(false);

  useEffect(() => {
    // setTimeout(() => {
    //   if (sidebarRef.current.querySelector(".sidebar__menu__item") !== null) {
    //     const sidebarItem = sidebarRef.current.querySelector(
    //       ".sidebar__menu__item"
    //     );
    //     indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
    //     setStepHeight(sidebarItem.clientHeight);
    //   }
    // }, 50);

    let session = getSessionFromStorage(); // we can only get here after user has logged in and therefore session is defined
    if (session) {
      let sessionAsObject = JSON.parse(session);
      let userRole = sessionAsObject.user.user_metadata.demo_app_role;
      filterNavBarsByRole(userRole);
      setUserRole(userRole);
    }
  }, []);

  useEffect(() => {
    filterNavBarsByRole(userRole);
  }, [userRole]);

  const filterNavBarsByRole = (userRole: string | undefined) => {
    if (userRole) {
      let roleAllowedNavItems = getFilteredRoleBasedNavBars(
        visibleNavBarItems,
        userRole
      );
      setVisibleNavBarItems(roleAllowedNavItems);
    }
  };
  const getFilteredRoleBasedNavBars = (
    navItems: INavItem[],
    role: string
  ): INavItem[] => {
    return navItems.filter((navItem) => navItem.rolesAllowed.includes(role));
  };

  // change active index
  useEffect(() => {
    const curPath = window.location.pathname.split("/")[1];
    const activeItem = props.sidebarNavItems.findIndex(
      (item) => item.section === curPath
    );
    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);

  return (
    <div className="sidebar-container">
      <div className="sidebar-container__header">
        <div className="sidebar-container__header__logo">
          <i className="fa fa-bandcamp" aria-hidden="true"></i>
          <div className="sidebar-container__header__brand">S I T B A</div>
          <div className="sidebar-container__list">
            <Link to={"/students"} className="sidebar-container__list__item">
              <div className="sidebar-container__list__item__img">
                <BiBody size="2rem" />
              </div>
              <div className="sidebar-container__list__item__title">
                {sidebarTranslation("sidebar.Students")}
              </div>
            </Link>

            <Link
              to={"/courses"}
              className="sidebar-container__list__item"
              onClick={() => setExpandCourses(!expandCourses)}
            >
              <div className="sidebar-container__list__item__img">
                <i className="bx bx-book"></i>
              </div>
              <div className="sidebar-container__list__item__title">
                {sidebarTranslation("sidebar.Courses.Courses")}
              </div>
            </Link>
            <ul
              className={`sidebar-container__list__itemSub ${
                expandCourses ? "active" : ""
              }`}
            >
              <li>
                <a> {sidebarTranslation("sidebar.Courses.changeCourseFees")}</a>
              </li>
              <li>
                <a> {sidebarTranslation("sidebar.Courses.listCourses")}</a>
              </li>
            </ul>
            <Link to={"/groups"} className="sidebar-container__list__item">
              <div className="sidebar-container__list__item__img">
                <i className="bx bx-group"></i>
              </div>
              <div className="sidebar-container__list__item__title">
                {sidebarTranslation("sidebar.Groups")}
              </div>
            </Link>
            <Link
              to={"/Cashflow"}
              className="sidebar-container__list__item"
              onClick={() => setExpandCashflow(!expandCashflow)}
            >
              <div className="sidebar-container__list__item__img">
                <BsCashCoin size="2rem" />
              </div>
              <div className="sidebar-container__list__item__title">
                {sidebarTranslation("sidebar.Cashflow.Cashflow")}
              </div>
            </Link>
            <ul
              className={`sidebar-container__list__itemSub ${
                expandCashflow ? "active" : ""
              }`}
            >
              <li>
                <AddIncome />
              </li>
              <li>
                <AddOutflow />
              </li>
              <li>
                <Link to={"/cashflow/bookletPaymentControl"}>
                  {sidebarTranslation("sidebar.Cashflow.bookletPaymentControl")}
                </Link>
              </li>
              <li>
                <Link to={"/cashflow/daily"}>
                  {sidebarTranslation("sidebar.Cashflow.cashBox")}
                </Link>
              </li>
            </ul>
            <Link to={"/Reports"} className="sidebar-container__list__item">
              <div className="sidebar-container__list__item__img">
                <i className="bx bx-line-chart"></i>
              </div>
              <div className="sidebar-container__list__item__title">
                {sidebarTranslation("sidebar.Reports")}
              </div>
            </Link>

            <Link to={"/LogOut"} className="sidebar-container__list__item">
              <div className="sidebar-container__list__item__img">
                <i className="bx bx-log-out"></i>
              </div>
              <div className="sidebar-container__list__item__title">
                {sidebarTranslation("sidebar.LogOut")}
              </div>
            </Link>
          </div>
          <div className="sidebar-container__footer">
            <div className="sidebar-container__footer__logo"></div>
            <div className="sidebar-container__footer__data">
              <div className="sidebar-container__footer__data__title">
                vicotio testa
              </div>
              <div className="sidebar-container__footer__data__subtitle">
                full stack developer
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
