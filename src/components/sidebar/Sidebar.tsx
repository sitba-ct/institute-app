import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import INavItem from "../../services/sideBar/INavItems";
import "../layout/appLayout.scss";
import getSessionFromStorage from "../../services/auth/SessionService";

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
            <div className="sidebar-container__list__item">
              <div className="sidebar-container__list__item__img">
                <i className="bx bx-body"></i>
              </div>
              <div className="sidebar-container__list__item__title">
                {sidebarTranslation("sidebar.Students")}
              </div>
            </div>
            <div
              className="sidebar-container__list__item"
              onClick={() => setExpandCourses(!expandCourses)}
            >
              <div className="sidebar-container__list__item__img">
                <i className="bx bx-book"></i>
              </div>
              <div className="sidebar-container__list__item__title">
                {sidebarTranslation("sidebar.Courses.Courses")}
              </div>
            </div>
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
            <div className="sidebar-container__list__item">
              <div className="sidebar-container__list__item__img">
                <i className="bx bx-group"></i>
              </div>
              <div className="sidebar-container__list__item__title">
                {sidebarTranslation("sidebar.Groups")}
              </div>
            </div>
            <div
              className="sidebar-container__list__item"
              onClick={() => setExpandCashflow(!expandCashflow)}
            >
              <div className="sidebar-container__list__item__img">
                <i className="bx bx-money"></i>
              </div>
              <div className="sidebar-container__list__item__title">
                {sidebarTranslation("sidebar.Cashflow.Cashflow")}
              </div>
            </div>
            <ul
              className={`sidebar-container__list__itemSub ${
                expandCashflow ? "active" : ""
              }`}
            >
              <li>
                <a> {sidebarTranslation("sidebar.Cashflow.addIncome")}</a>
              </li>
              <li>
                <a> {sidebarTranslation("sidebar.Cashflow.addOutflow")}</a>
              </li>
              <li>
                <a>
                  {sidebarTranslation("sidebar.Cashflow.bookletPaymentControl")}
                </a>
              </li>
              <li>
                <a> {sidebarTranslation("sidebar.Cashflow.cashBox")}</a>
              </li>
            </ul>
            <div className="sidebar-container__list__item">
              <div className="sidebar-container__list__item__img">
                <i className="bx bx-line-chart"></i>
              </div>
              <div className="sidebar-container__list__item__title">
                {sidebarTranslation("sidebar.Reports")}
              </div>
            </div>
            <div className="sidebar-container__list__item">
              <div className="sidebar-container__list__item__img">
                <i className="bx bx-log-out"></i>
              </div>
              <div className="sidebar-container__list__item__title">
                {sidebarTranslation("sidebar.LogOut")}
              </div>
            </div>
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
      {/* <div className="sidebar__logo">S I T B A</div>
      <div ref={sidebarRef} className="sidebar__menu ">
        <div
          ref={indicatorRef}
          className="sidebar__menu__indicator "
          style={{
            transform: `translateX(-50%) translateY(${
              activeIndex * stepHeight
            }px)`,
          }}
        ></div>
        {visibleNavBarItems.map((item, index) => (
          <Link to={item.to} key={index}>
            <div
              className={`sidebar__menu__item ${
                activeIndex === index ? "active" : ""
              }`}
            >
              <div className="sidebar__menu__item__icon">{item.icon}</div>
              <div className="sidebar__menu__item__text">
                {sidebarTranslation("sidebar." + item.display)}
              </div>
            </div>
          </Link>
        ))}
      </div> */}
    </div>
  );
};

export default Sidebar;
