import IIncome from "../IIncome";
import IIncomeError from "./IIncomeError";
import IIncomesValidationService from "./IIncomesValidationService";
import IncomeError from "./IncomeError";
import { injectable } from "tsyringe";

@injectable()
export class IncomeValidationService implements IIncomesValidationService {
  validateAddIncome(income: IIncome, studentIncomes: IIncome[]): IIncomeError {
    let errors = new IncomeError();

    if (!income.dateRegistered) {
      errors.dateRegistered = "requerido";
    } else if (
      new Date(income.dateRegistered).getUTCFullYear() !==
      new Date().getUTCFullYear()
    ) {
      errors.dateRegistered = "Actual year";
    } else {
      errors.dateRegistered = "";
    }

    if (!income.amount) {
      errors.amount = "requerido";
    } else if (income.amount <= 0 || income.amount > 300000) {
      errors.amount = "Sólo letras y espacios";
    } else {
      errors.amount = "";
    }
    if (!income.paymentMethodId) {
      errors.paymentMethodId = "requerido";
    } else {
      errors.paymentMethodId = "";
    }
    if (!income.incomeCategoryId) {
      errors.incomeCategoryId = "requerido";
    } else {
      errors.incomeCategoryId = "";
    }

    if (studentIncomes.length !== 0) {
      //   studentIncomes.map((studentIncome) => {
      //     if (
      //       income.studentId === studentIncome.studentId &&
      //       new Date(income.dateRegistered).getFullYear() ===
      //         new Date(studentIncome.dateRegistered).getFullYear() &&
      //       income.incomeCategoryId === studentIncome.incomeCategoryId
      //     ) {
      //       errors.studentIncome = "libro pago este año";
      //     } else {
      //       errors.studentIncome = "";
      //     }
      //   });
      // } else {
      errors.studentIncome = "";
    }

    return errors;
  }
}
