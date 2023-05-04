import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import INavItem from "../../services/sideBar/INavItems";
import LogOut from "../auth/logOut/LogOut";
import "./sidebar.scss";
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

  useEffect(() => {
    setTimeout(() => {
      if (sidebarRef.current.querySelector(".sidebar__menu__item") !== null) {
        const sidebarItem = sidebarRef.current.querySelector(
          ".sidebar__menu__item"
        );
        indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
        setStepHeight(sidebarItem.clientHeight);
      }
    }, 50);

    let session = getSessionFromStorage(); // we can only get here after user has logged in and therefore session is defined
    if (session) {
      let sessionAsObject = JSON.parse(session);
      let userRole = sessionAsObject.user.user_metadata.ken_role;
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
    <div className="sidebar ">
      <div className="sidebar__logo ">KEN</div>
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
      </div>
      <LogOut />
    </div>
  );
};

export default Sidebar;
