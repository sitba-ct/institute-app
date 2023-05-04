import { container } from "tsyringe";
import { SignUpValidationService } from "./SignUpValidationService";
import { ISignUpValidationService } from "./ISignUpValidationService";

const configureSignUpServices = () => {
  container.register(`${ISignUpValidationService}`, {
    useClass: SignUpValidationService,
  });
};

export default configureSignUpServices;
