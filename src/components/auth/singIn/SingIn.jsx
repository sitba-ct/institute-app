import { useState, useEffect } from "react";

import { supabase } from "../../../utils/supabaseClient";
import "./singIn.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SignUpError from "../../../services/signUp/validations/SignUpError";

const SignIn = () => {
  // const signUpValidationService = container.resolve(SignUpValidationService);

  const [email, setEmail] = useState("");
  const [signInTranslation] = useTranslation("signIn");
  const [saveButtonEnabled, setSaveButtonEnabled] = useState(true);
  const [errors, setErrors] = useState(new SignUpError());

  const handleSignIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: "http://localhost:3000/loginRole",
        },
      });
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };

  // useEffect(() => {
  //   debugger;

  //   if (Object.values(errors).every((x) => x === "")) {
  //     debugger;

  //     handleSignIn();
  //   } else {
  //     setSaveButtonEnabled(true);
  //   }
  // }, [errors]);

  // const refreshErrors = () => {
  //   debugger;
  //   let signUpErrors = signUpValidationService.validateSignUp(email, role);
  //   debugger;

  //   setErrors(signUpErrors);
  // };

  return (
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
            onChange={(e) => {
              setEmail(e.target.value);
              setSaveButtonEnabled(false);
            }}
          ></input>{" "}
          {errors.email && <p className="errorMessage">{errors.email}</p>}
        </div>

        <button
          className="btn btn-primary "
          onClick={() => handleSignIn()}
          disabled={saveButtonEnabled}
        >
          {signInTranslation("signIn.logIn")}
        </button>
      </form>
    </div>
  );
};
export default SignIn;
