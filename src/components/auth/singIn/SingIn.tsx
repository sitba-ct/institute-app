import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { supabase } from "../../../utils/supabaseClient";
import "./singIn.scss";
import { useTranslation } from "react-i18next";
import SignUpError from "../../../services/signUp/validations/SignUpError";
import { container } from "tsyringe";
import { SignUpValidationService } from "../../../services/signUp/validations/SignUpValidationService";
import { AuthError } from "@supabase/supabase-js";

const SignIn = () => {
  const [t, i18n] = useTranslation();

  const [email, setEmail] = useState("");
  const [signInTranslation] = useTranslation("signUp");
  const [saveButtonEnabled, setSaveButtonEnabled] = useState(true);
  const [errors, setErrors] = useState(new SignUpError());
  const [hidenText, setHidenText] = useState(true);
  const [successfulMaildeliveryMessage, setSuccessfulMaildeliveryMessage] =
    useState(false);

  const [error, setError] = useState<AuthError | null>(null);

  useEffect(() => {
    setSaveButtonEnabled(true);
    if (Object.values(errors).every((x) => x === "")) {
      const result = signInMethod(
        email,
        setSuccessfulMaildeliveryMessage,
        setError
      );
    } else {
    }
  }, [errors]);

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
                ? i18n.changeLanguage("es")
                : i18n.changeLanguage("en")
            }
          />
          <label htmlFor="language-toggle"></label>
          <span className="on">ENG</span>
          <span className="off">ESP</span>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div className="form border  border-dark rounded   bg-gradient  p-2 text-dark">
          <div className="mb-3 ">
            <label className="fs-5 fw-bold">
              {signInTranslation("signUp.emailAddress")}
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
            onClick={() => errorHandle(email, setErrors)}
            disabled={saveButtonEnabled}
          >
            {signInTranslation("signUp.signUp")}
          </button>
          {errors.email && (
            <p className="errorMessage1 mt-2 fs-6 fw-bold ">{errors.email}</p>
          )}
          {successfulMaildeliveryMessage && (
            <p className="successfulMaildeliveryMessage mt-2 fs-6 fw-bold">
              {signInTranslation("signUp.textEmailSended")}
            </p>
          )}
          {error && (
            <p className="errorMessage1">
              {signInTranslation("signUp.textEmailFailedToSend") + error}
            </p>
          )}
        </div>
      </div>
      <div className=" ">
        <label className=" textform   p-2 text-dark ">
          <p className="p-0 m-0 fs-3 fw-bold"> SITBA</p>
          <p className="p-0 m-0">
            {signInTranslation("signUp.introductionText0")}
          </p>
          <div className="linkFeatures d-flex justify-content-center">
            <p className="p-0 m-0">
              {signInTranslation("signUp.introductionText1")}
            </p>
            <button
              className="textToClickOn p-0 ms-1"
              onClick={() => {
                setHidenText(hidenText ? false : true);
              }}
            >
              {signInTranslation("signUp.introductionText10")}
            </button>
          </div>
          <ul
            className={
              hidenText ? "hidenText" : "text-start bulletPointsText  "
            }
          >
            <li>{signInTranslation("signUp.introductionText2")}</li>
            <li>{signInTranslation("signUp.introductionText3")}</li>
            <li>{signInTranslation("signUp.introductionText5")}</li>
            <li>{signInTranslation("signUp.introductionText6")}</li>
            <li>{signInTranslation("signUp.introductionText7")}</li>
            <li>{signInTranslation("signUp.introductionText8")}</li>
          </ul>
        </label>
      </div>
    </div>
  );
};
export default SignIn;

export async function signInMethod(
  email: string,
  setSuccessfulMaildeliveryMessage: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<AuthError | null>>
) {
  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: process.env.REACT_APP_EMAILREDIRECTTO,
      },
    });

    if (!error && data) {
      setSuccessfulMaildeliveryMessage(true);
      setError(error);
    } else {
      setError(error);
    }
  } catch (error: any) {
    alert(error.error_description || error.message);
  }
}

export function errorHandle(
  email: string,
  setErrors: Dispatch<SetStateAction<SignUpError>>
) {
  const signUpValidationService = container.resolve(SignUpValidationService);
  let signUpErrors = signUpValidationService.validateSignUp(email);
  setErrors(signUpErrors);
}
