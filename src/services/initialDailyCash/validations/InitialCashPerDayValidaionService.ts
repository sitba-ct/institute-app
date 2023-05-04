import IInitialCashPerDay from "../IInitialCashPerDay";
import { IInitialCashPerDayError } from "./IInitialCashPerDayError";
import IInitialCashPerDayValidaionService from "./IInitialCashPerDayValidaionService";
import InitialCashPerDayError from "./InitialCashPerDayError";
import { injectable } from "tsyringe";
@injectable()
export class InitialCashPerDayValidaionService
  implements IInitialCashPerDayValidaionService
{
  validateInitialCashPerDay(
    initialDailyCash: IInitialCashPerDay
  ): IInitialCashPerDayError {
    let errors = new InitialCashPerDayError();

    if (!initialDailyCash.date) {
      errors.date = "requerido";
    } else if (
      new Date(initialDailyCash.date).getFullYear() !== new Date().getFullYear()
    ) {
      errors.date = "año actual";
    } else {
      errors.date = "";
    }

    if (!initialDailyCash.amount) {
      errors.initialCash = "requerido";
    } else if (
      initialDailyCash.amount <= -50000 ||
      initialDailyCash.amount > 800000
    ) {
      errors.initialCash = "verificar el monto";
    } else {
      errors.initialCash = "";
    }
    return errors;
  }
}
