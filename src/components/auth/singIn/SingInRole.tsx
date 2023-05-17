import { useState, useEffect, Dispatch, SetStateAction } from "react";

import { supabase } from "../../../utils/supabaseClient";
import "./singIn.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { container } from "tsyringe";
import { UserRoleService } from "../../../services/userRole/UserRoleService";
import IRole from "../../../services/userRole/IRole";
import IUserRole from "../../../services/userRole/IUserRole";

const SignInRole = () => {
  const userRoleService = container.resolve(UserRoleService);

  const [t, i18n] = useTranslation();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [signInTranslation] = useTranslation("signIn");
  const [role, setRole] = useState<number>(1);
  const [roles, setRoles] = useState<IRole[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [userRole, setUserRole] = useState<IUserRole[]>([]);

  useEffect(() => {
    getSession(setUserId, setEmail);
  }, []);

  useEffect(() => {
    initRoles();
    initUsers();
  }, [userId && email]);

  const initRoles = async () => {
    const roles = await userRoleService.initRoles();
    setRoles(roles);
  };
  const initUsers = async () => {
    const Users = await userRoleService.initUserRoles();
    setUserRole(Users);
  };

  const setUserRoles = async (event: any) => {
    event.preventDefault();
    const user = doesTheUserExist(userRole, userId);
    if (user === undefined) {
      await userRoleService.newUserRole(userId, role);
    } else {
      await userRoleService.updateUserRole(userId, role);
    }
    navigate("/");
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
        <div className="form border  border-dark rounded   bg-gradient  p-2 text-dark">
          <div className="mb-3 ">
            <label className="fs-5 fw-bold">
              {signInTranslation("signIn.emailAddress")}
            </label>
            <input
              type="email"
              className="form-control"
              disabled={true}
              value={email}
            ></input>
          </div>
          <div className="mb-3">
            <h6 className="fs-5 fw-bold">
              {signInTranslation("signIn.userRole")}
            </h6>
            <select
              className="form-select"
              value={role || ""}
              onChange={(e) => {
                setRole(Number(e.target.value));
              }}
            >
              {roles.map((role) => (
                <option key={role.id} value={role.id || ""}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          <button
            className="btn btn-primary "
            onClick={(event) => setUserRoles(event)}
          >
            {signInTranslation("signIn.logIn")}
          </button>
        </div>
      </div>
      <div className=" ">
        <label className=" textform border border-dark rounded  bg-gradient  p-2 text-dark ">
          <p className="p-0 m-0 fs-3 fw-bold"> Sitba </p>
          <p className="p-0 m-0">{signInTranslation("signIn.viewRoleText1")}</p>
          <p className="p-0 m-0">{signInTranslation("signIn.viewRoleText2")}</p>
        </label>
      </div>
    </div>
  );
};
export default SignInRole;

export function doesTheUserExist(userRole: IUserRole[], userId: string) {
  const user = userRole.find((user) => {
    return user.userId === userId;
  });
  return user;
}
export function getSession(
  setUserId: Dispatch<SetStateAction<string>>,
  setEmail: Dispatch<SetStateAction<string>>
) {
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session!.user.email !== undefined) {
      setUserId(session!.user.id);
      setEmail(session!.user.email);
    }
  });
}
