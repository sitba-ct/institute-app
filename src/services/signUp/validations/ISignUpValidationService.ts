import ISignUpError from "./ISignUpError";

export default interface ISignUpValidationService {
  validateSignUp(email: string, role: string): ISignUpError;
}
