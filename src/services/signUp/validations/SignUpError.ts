import ISignUpError from "./ISignUpError";

export default class SignUpError implements ISignUpError {
  constructor(email: string | undefined = undefined) {
    this.email = email;
  }

  email: string | undefined;
}
