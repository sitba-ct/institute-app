import IIncome from "../IIncome";
import IIncomeError from "./IIncomeError";

export default interface IIncomesValidationService {
  validateAddIncome(income: IIncome, studentIncomes: IIncome[]): IIncomeError;
}
