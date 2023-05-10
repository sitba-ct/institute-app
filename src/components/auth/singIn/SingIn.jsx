import { useState } from "react";

import { supabase } from "../../../utils/supabaseClient";
import "./singIn.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SignUpError from "../../../services/signUp/validations/SignUpError";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [signInTranslation] = useTranslation("signIn");
  const [saveButtonEnabled, setSaveButtonEnabled] = useState(false);
  const [errors, setErrors] = useState(new SignUpError());
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState([]);

  const handleSignIn = async (e) => {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
        // options: {
        //   emailRedirectTo: "http://localhost:3000/",
        // },
      });
      if (error) throw error;
      else navigate("/");
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };

  // useEffect(() => {
  //   if (Object.values(errors).every((x) => x === "")) {
  //     handleSignIn();
  //   } else {
  //     setSaveButtonEnabled(true);
  //   }
  // }, [errors]);

  return (
    <div className="container">
      <div className="d-flex justify-content-center containerSingIn ">
        <form className=" form border border-dark rounded   bg-gradient  p-2 text-dark ">
          <div className="mb-3 ">
            <label className="fs-5 fw-bold">
              {signInTranslation("signIn.emailAddress")}
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="mb-3">
            <h6 className="fs-5 fw-bold">
              {signInTranslation("signIn.userRole")}
            </h6>
            <select
              className="form-select"
              value={role || ""}
              disabled={false}
              onChange={(e) => {
                setSaveButtonEnabled(false);
                setRole(e.target.value);
              }}
            >
              <option value={0 || ""}></option>
              {roles.map((role) => (
                <option key={role.id} value={role.id || ""}>
                  {role.name}
                </option>
              ))}
            </select>
            {errors.role && <p className="errorMessage">{errors.role}</p>}
          </div>
          <button className="btn btn-primary " onClick={(e) => handleSignIn(e)}>
            {signInTranslation("signIn.logIn")}
          </button>
        </form>
      </div>
    </div>
  );
};
export default SignIn;
