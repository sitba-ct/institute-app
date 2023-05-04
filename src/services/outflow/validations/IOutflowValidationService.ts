import IOutflow from "../IOutflow";
import IIncomeError from "./IOutflowError";

export default interface IOutflowValidationService {
  validateAddOutflow(income: IOutflow): IIncomeError;
}
