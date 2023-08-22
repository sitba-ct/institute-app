import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "../layout/appLayout.scss";
import getSessionFromStorage from "../../services/auth/SessionService";
import { BiBody, BiGroup, BiLogOut, BiBookAlt } from "react-icons/bi";
import { FaCashRegister } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import { ImBooks } from "react-icons/im";
import { TbReportAnalytics } from "react-icons/tb";
import { MdOutlineCurrencyExchange, MdOutlineListAlt } from "react-icons/md";
import AddIncome from "../cashflow/incomes/addIncome/AddIncome";
import AddOutflow from "../cashflow/outFlows/addOutflow/AddOutflow";

const Sidebar = () => {
  const [sidebarTranslation] = useTranslation("sidebar");

  const [userRole, setUserRole] = useState<string>();
  const [expandCourses, setExpandCourses] = useState<boolean>(false);
  const [expandCashflow, setExpandCashflow] = useState<boolean>(false);

  useEffect(() => {
    let session = getSessionFromStorage(); // we can only get here after user has logged in and therefore session is defined
    if (session) {
      let sessionAsObject = JSON.parse(session);
      let userRole = sessionAsObject.user.user_metadata.demo_app_role;
      setUserRole(userRole);
    }
  }, []);

  return (
    <div className="sidebar-container">
      <div className="sidebar-container__header">
        <div className="sidebar-container__header__logo">
          <i className="fa fa-bandcamp" aria-hidden="true"></i>
          <div className="sidebar-container__header__brand"></div>
        </div>
      </div>
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
            <ImBooks size="2rem" />
          </div>
          <div className="sidebar-container__list__item__title">
            {sidebarTranslation("sidebar.Courses.Courses")}
          </div>
        </Link>
        <div
          className={`sidebar-container__list__itemSub ${
            expandCourses ? "active" : ""
          }`}
        >
          <div className="sidebar-container__list__itemSub__detail">
            <Link
              to={"/courses/fee"}
              className="sidebar-container__list__itemSub__detail"
            >
              <MdOutlineCurrencyExchange size="1.5rem" className="me-3" />
              {sidebarTranslation("sidebar.Courses.changeCourseFees")}
            </Link>
          </div>
          <div className="sidebar-container__list__itemSub__detail">
            <Link
              to={"/courses/list"}
              className="sidebar-container__list__itemSub__detail"
            >
              <MdOutlineListAlt size="1.5rem" className="me-3" />
              {sidebarTranslation("sidebar.Courses.listCourses")}
            </Link>
          </div>
        </div>
        <Link to={"/groups"} className="sidebar-container__list__item">
          <div className="sidebar-container__list__item__img">
            <BiGroup size="2rem" />
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
        <div
          className={`sidebar-container__list__itemSub ${
            expandCashflow ? "active" : ""
          }`}
        >
          <div className="sidebar-container__list__itemSub__detail">
            <AddIncome />
          </div>
          <div className="sidebar-container__list__itemSub__detail">
            <AddOutflow />
          </div>
          <div className="sidebar-container__list__itemSub__detail">
            <Link
              to={"/cashflow/bookletPaymentControl"}
              className="sidebar-container__list__itemSub__detail"
            >
              <BiBookAlt size="1.5rem" className="me-3" />

              {sidebarTranslation("sidebar.Cashflow.bookletPaymentControl")}
            </Link>
          </div>
          <div className="sidebar-container__list__itemSub__detail">
            <Link
              to={"/cashflow/daily"}
              className="sidebar-container__list__itemSub__detail"
            >
              <FaCashRegister size="1.5rem" className="me-3" />
              {sidebarTranslation("sidebar.Cashflow.cashBox")}
            </Link>
          </div>
        </div>
        {userRole === "admin" ? (
          <Link to={"/Reports"} className="sidebar-container__list__item">
            <div className="sidebar-container__list__item__img">
              <TbReportAnalytics size="2rem" />
            </div>
            <div className="sidebar-container__list__item__title">
              {sidebarTranslation("sidebar.Reports")}
            </div>
          </Link>
        ) : (
          <></>
        )}
        <Link to={"/LogOut"} className="sidebar-container__list__item">
          <div className="sidebar-container__list__item__img">
            <BiLogOut size="2rem" />
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
            S I T B A
          </div>
          <div className="sidebar-container__footer__data__subtitle">
            technological solutions
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
