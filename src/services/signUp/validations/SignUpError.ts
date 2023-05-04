import ISignUpError from "./ISignUpError";

export default class SignUpError implements ISignUpError {
  constructor(
    email: string | undefined = undefined,
    password: string | undefined = "",
    role: string | undefined = undefined
  ) {
    this.email = email;
    this.password = password;
    this.role = role;
  }

  email: string | undefined;
  password: string | undefined;
  role: string | undefined;
}
