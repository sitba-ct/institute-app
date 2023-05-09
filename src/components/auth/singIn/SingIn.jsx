import { useState } from "react";
import { supabase } from "../../../utils/supabaseClient";
import "./singIn.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [signInTranslation] = useTranslation("signIn");

  const handleSignIn = async (e) => {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log(user);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      else navigate("/");
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };

  const createNewUser = async () => {
    navigate("SignUp");
  };

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
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <div className="fw-bold small-text">
            {signInTranslation("signIn.neverShare")}
          </div>
        </div>
        <div className="mb-3">
          <label className="fs-5 fw-bold">
            {signInTranslation("signIn.password")}
          </label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <button className="btn btn-primary " onClick={(e) => handleSignIn(e)}>
          {signInTranslation("signIn.logIn")}
        </button>
        <button className="btn btn-success " onClick={() => createNewUser()}>
          {signInTranslation("signIn.newUser")}
        </button>
      </form>
    </div>
  );
};
export default SignIn;
