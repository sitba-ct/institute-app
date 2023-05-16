import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { supabase } from "../../../utils/supabaseClient";
import "./singIn.css";
import { useTranslation } from "react-i18next";
import SignUpError from "../../../services/signUp/validations/SignUpError";
import { container } from "tsyringe";
import { SignUpValidationService } from "../../../services/signUp/validations/SignUpValidationService";

const SignIn = () => {
  const signUpValidationService = container.resolve(SignUpValidationService);

  const [t, i18n] = useTranslation();

  const [email, setEmail] = useState("");
  const [signInTranslation] = useTranslation("signIn");
  const [saveButtonEnabled, setSaveButtonEnabled] = useState(true);
  const [errors, setErrors] = useState(new SignUpError());
  const [textEmailSended, setTextEmailSended] = useState(false);

  const handleSignIn = async () => {
    updateLocalStorageVariableHasRoleDefined();
    signInMethod(email, setTextEmailSended);
  };

  useEffect(() => {
    if (Object.values(errors).every((x) => x === "")) {
      handleSignIn();
    } else {
      setSaveButtonEnabled(true);
    }
  }, [errors]);

  const refreshErrors = () => {
    let signUpErrors = signUpValidationService.validateSignUp(email);
    setErrors(signUpErrors);
  };

  return (
    <div className="d-flex flex-column  containerSingIn ">
      <div className="d-flex flex-row-reverse">
        <div className="switch">
          <input
            id="language-toggle"
            className="check-toggle check-toggle-round-flat"
            type="checkbox"
            onChange={(e) =>
              e.target.checked === true
                ? i18n.changeLanguage("en")
                : i18n.changeLanguage("es")
            }
          />
          <label htmlFor="language-toggle"></label>
          <span className="on">ESP</span>
          <span className="off">ENG</span>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <form className="form border  border-dark rounded   bg-gradient  p-2 text-dark">
          <div className="mb-3 ">
            <label className="fs-5 fw-bold">
              {signInTranslation("signIn.emailAddress")}
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setSaveButtonEnabled(false);
              }}
            ></input>
          </div>
          <button
            className="btn btn-primary "
            onClick={() => refreshErrors()}
            disabled={saveButtonEnabled}
          >
            {signInTranslation("signIn.logIn")}
          </button>
          {errors.email && <p className="errorMessage">{errors.email}</p>}
          {textEmailSended && (
            <p className="successfulMaildeliveryMessage">
              {signInTranslation("signIn.textEmailSended")}
            </p>
          )}
        </form>
      </div>

      <div className=" ">
        <label className=" textform border border-dark rounded  bg-gradient  p-2 text-dark ">
          <p className="p-0 m-0 fs-3 fw-bold"> Sitba </p>
          <p className="p-0 m-0">
            {signInTranslation("signIn.introductionText")}
          </p>
        </label>
      </div>
    </div>
  );
};
export default SignIn;

export function updateLocalStorageVariableHasRoleDefined() {
  const hasRoleBeenDefined = localStorage.setItem(
    "hasRoleBeenDefined",
    "false"
  );
  return hasRoleBeenDefined;
}

export async function signInMethod(
  email: string,
  setTextEmailSended: Dispatch<SetStateAction<boolean>>
) {
  try {
    setTextEmailSended(true);
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: process.env.REACT_APP_EMAILREDIRECTTO,
      },
    });
  } catch (error: any) {
    alert(error.error_description || error.message);
  }
}
