import { useState, useEffect } from "react";

import { supabase } from "../../../utils/supabaseClient";
import "./singIn.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SignUpError from "../../../services/signUp/validations/SignUpError";
import { container } from "tsyringe";
import { UserRoleService } from "../../../services/userRole/UserRoleService";
import { SignUpValidationService } from "../../../services/signUp/validations/SignUpValidationService";

const SignIn = () => {
  const userRoleService = container.resolve(UserRoleService);
  const signUpValidationService = container.resolve(SignUpValidationService);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [signInTranslation] = useTranslation("signIn");
  const [saveButtonEnabled, setSaveButtonEnabled] = useState(false);
  const [errors, setErrors] = useState(new SignUpError());
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session !== null) {
        navigate("/students");
      }
    });
  }, []);

  useEffect(() => {
    initRoles();
  }, []);

  const initRoles = async () => {
    const roles = await userRoleService.initRoles();
    setRoles(roles);
  };

  const handleSignIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: "http://localhost:3000/login",
        },
      });
      if (error) throw error;
      else {
        signOut();
      }
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };

  async function signOut() {
    const { error } = await supabase.auth.signOut();
  }

  useEffect(() => {
    debugger;

    if (Object.values(errors).every((x) => x === "")) {
      debugger;

      handleSignIn();
    } else {
      setSaveButtonEnabled(true);
    }
  }, [errors]);

  const refreshErrors = () => {
    console.log("hola");
    debugger;
    let signUpErrors = signUpValidationService.validateSignUp(email, role);
    debugger;

    setErrors(signUpErrors);
  };

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
          <button className="btn btn-primary " onClick={() => refreshErrors()}>
            {signInTranslation("signIn.logIn")}
          </button>
        </form>
      </div>
    </div>
  );
};
export default SignIn;
