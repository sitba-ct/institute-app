import ISignUpError from "./ISignUpError";
import ISignUpValidationService from "./ISignUpValidationService";
import SignUpError from "./SignUpError";
import { injectable } from "tsyringe";
@injectable()
export class SignUpValidationService implements ISignUpValidationService {
  validateSignUp(email: string): ISignUpError {
    let errors = new SignUpError();

    if (!email.trim()) {
      errors.email = "requerido";
    } else {
      errors.email = "";
    }

    return errors;
  }
}
