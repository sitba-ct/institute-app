import ISignUpError from "./ISignUpError";
import ISignUpValidationService from "./ISignUpValidationService";
import SignUpError from "./SignUpError";
import { injectable } from "tsyringe";
@injectable()
export class SignUpValidationService implements ISignUpValidationService {
  validateSignUp(email: string): ISignUpError {
    let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    let errors = new SignUpError();

    if (!email.trim()) {
      errors.email = "requerido";
    } else if (!regexEmail.test(email.trim())) {
      errors.email = "Incorrecto ";
    } else {
      errors.email = "";
    }

    return errors;
  }
}
