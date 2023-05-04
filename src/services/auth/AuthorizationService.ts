import getSessionFromStorage from "./SessionService";

function isUserAuthenticated(): boolean {
  let isUserAuthenticated: boolean;
  var session = getSessionFromStorage();
  isUserAuthenticated = session !== null;
  return isUserAuthenticated;
}

export default isUserAuthenticated;
