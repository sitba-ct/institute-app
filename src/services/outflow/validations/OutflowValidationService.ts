import IOutflow from "../IOutflow";
import IOutflowError from "./IOutflowError";
import IOutflowValidationService from "./IOutflowValidationService";
import OutflowError from "./OutflowError";
import { injectable } from "tsyringe";
@injectable()
export class OutflowValidationService implements IOutflowValidationService {
  validateAddOutflow(outflow: IOutflow): IOutflowError {
    let errors = new OutflowError();

    if (!outflow.dateRegistered) {
      errors.dateRegistered = "requerido";
    } else if (
      new Date(outflow.dateRegistered).getUTCFullYear() !==
      new Date().getUTCFullYear()
    ) {
      errors.dateRegistered = "Actual year";
    } else {
      errors.dateRegistered = "";
    }

    if (!outflow.amount) {
      errors.amount = "requerido";
    } else if (outflow.amount <= 0 || outflow.amount > 300000) {
      errors.amount = "Sólo letras y espacios";
    } else {
      errors.amount = "";
    }
    if (!outflow.paymentMethodId) {
      errors.paymentMethodId = "requerido";
    } else {
      errors.paymentMethodId = "";
    }
    if (!outflow.outflowCategoryId) {
      errors.outflowCategoryId = "requerido";
    } else {
      errors.outflowCategoryId = "";
    }

    return errors;
  }
}
