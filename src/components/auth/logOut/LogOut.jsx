import { supabase } from "../../../utils/supabaseClient";
import "./LogOut.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    handleLogOut();
  }, []);

  const handleLogOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      else navigate("/login");
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };
  return <div></div>;
};

export default LogOut;
