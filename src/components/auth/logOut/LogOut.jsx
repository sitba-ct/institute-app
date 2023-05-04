import { supabase } from "../../../utils/supabaseClient";
import "./LogOut.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LogOut = () => {
  const [sidebarTranslation] = useTranslation("sidebar");

  const [activeIndexButton, setactiveIndexButton] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      else navigate("/login");
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };
  return (
    <div
      onClick={() =>
        setactiveIndexButton(activeIndexButton === true ? false : true)
      }
      className={`menu__item ${
        activeIndexButton ? "active" : ""
      } d-flex align-items-end`}
    >
      <div className="menu__item__icon">
        {<i className="bx bx-log-out"></i>}
      </div>
      <div className="menu__item__text button" onClick={(e) => handleLogOut(e)}>
        {sidebarTranslation("sidebar.LogOut")}
      </div>
    </div>
  );
};

export default LogOut;
