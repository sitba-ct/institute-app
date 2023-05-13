import { useState, useEffect } from "react";

import { supabase } from "../../../utils/supabaseClient";
import "./singIn.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SignUpError from "../../../services/signUp/validations/SignUpError";
import { container } from "tsyringe";
import { UserRoleService } from "../../../services/userRole/UserRoleService";

const SignInRole = () => {
  const userRoleService = container.resolve(UserRoleService);
  // const signUpValidationService = container.resolve(SignUpValidationService);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [signInTranslation] = useTranslation("signIn");
  const [saveButtonEnabled, setSaveButtonEnabled] = useState(true);
  const [errors, setErrors] = useState(new SignUpError());
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState([]);
  const [userId, setUserId] = useState();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session.user.id);
    });

    supabase.auth.onAuthStateChange((event, session) => {
      console.log(session);
    });
  }, []);

  useEffect(() => {
    debugger;
    initRoles();
  }, []);

  const initRoles = async () => {
    const roles = await userRoleService.initRoles();
    setRoles(roles);
  };

  const goHome = () => {
    userRoleService.newUserRole(userId, role);
    console.log(userId);
    console.log(role);
    debugger;
    navigate("/students");
  };
  return (
    <div className="d-flex justify-content-center containerSingIn ">
      <form className=" formRole border border-dark rounded   bg-gradient  p-2 text-dark ">
        <div className="mb-3 ">
          <label className="fs-5 fw-bold">
            {signInTranslation("signIn.emailAddress")}
          </label>
          <input
            type="email"
            className="form-control"
            disabled={true}
            value={email}
          ></input>{" "}
          {errors.email && <p className="errorMessage">{errors.email}</p>}
        </div>
        <div className="mb-3">
          <h6 className="fs-5 fw-bold">
            {signInTranslation("signIn.userRole")}
          </h6>
          <select
            className="form-select"
            value={role || ""}
            onChange={(e) => {
              setRole(e.target.value);
            }}
          >
            {roles.map((role) => (
              <option key={role.id} value={role.id || ""}>
                {role.name}
              </option>
            ))}
          </select>
          {errors.role && <p className="errorMessage">{errors.role}</p>}
        </div>

        <button className="btn btn-primary " onClick={() => goHome()}>
          {signInTranslation("signIn.logIn")}
        </button>
      </form>
    </div>
  );
};
export default SignInRole;
