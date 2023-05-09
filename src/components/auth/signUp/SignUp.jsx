import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabaseClient";
import "./signUp.scss";
import { useTranslation } from "react-i18next";
import { UserRoleService } from "../../../services/userRole/UserRoleService";
import { SignUpValidationService } from "../../../services/signUp/validations/SignUpValidationService";
import SignUpError from "../../../services/signUp/validations/SignUpError";
import { container } from "tsyringe";

const SignUp = () => {
  const userRoleService = container.resolve(UserRoleService);
  const signUpValidationService = container.resolve(SignUpValidationService);

  const [email, setEmail] = useState("");
  const [successfulSend, setSuccessfulSend] = useState(false);
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState("");
  const [saveButtonEnabled, setSaveButtonEnabled] = useState(false);
  const [errors, setErrors] = useState(new SignUpError());

  const [signUpTranslation] = useTranslation("signUp");

  useEffect(() => {
    initRoles();
  }, []);

  const initRoles = async () => {
    const roles = await userRoleService.initRoles();
    setRoles(roles);
  };

  const handleSignUp = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: process.env.REACT_APP_RESETPASSWORD_PASSWORD,
      });
      if (!error) {
        setSuccessfulSend(true);
        userRoleService.newUserRole(data.user.id, role);
      }
    } catch (error) {
      alert(error.error_description || error.message);
    }
    await supabase.auth.resetPasswordForEmail(email);
    // , {
    //   redirectTo: process.env.REACT_APP_RESETPASSWORD_URL,
    // });
  };

  useEffect(() => {
    if (Object.values(errors).every((x) => x === "")) {
      handleSignUp();
    } else {
      setSaveButtonEnabled(true);
    }
  }, [errors]);

  const refreshErrors = (e) => {
    e.preventDefault();
    let signUpErrors = signUpValidationService.validateSignUp(email, role);
    setErrors(signUpErrors);
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="d-flex justify-content-center  ">
        <form className=" form border border-dark rounded   bg-gradient  p-2 text-dark ">
          <h5 className="  text-center title">
            {signUpTranslation("signUp.createNewUser")}
          </h5>
          <div className="mb-3 ">
            <h6 className=""> {signUpTranslation("signUp.emailAddress")}</h6>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setSaveButtonEnabled(false);
              }}
            ></input>
            {errors.email && <p className="errorMessage">{errors.email}</p>}
          </div>
          <div className="mb-3">
            <h6 className="">{signUpTranslation("signUp.userRole")}</h6>
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
          <button
            className="btn btn-primary"
            onClick={(e) => refreshErrors(e)}
            disabled={saveButtonEnabled}
          >
            {signUpTranslation("signUp.signUp")}
          </button>
          {successfulSend && (
            <p className="text-success">
              {signUpTranslation("signUp.successfullyCreated")}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
