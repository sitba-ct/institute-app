import "./errorBoudary.scss";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ErrorBoudary = () => {
  const { message } = useParams();

  const [errorResponse, setErrorResponse] = useState<string>(message!);

  const navigateHome = async () => {
    window.location.href = "/";
  };
  return (
    <div id="error-page" className="errorContainer ">
      <h2 className="header" data-text="error">
        error
      </h2>
      <h4 data-text={errorResponse}>{errorResponse}</h4>
      <div
        className="btns"
        onClick={() => {
          navigateHome();
        }}
      >
        return home
      </div>
    </div>
  );
};

export default ErrorBoudary;
