import IInitialCashPerDay from "../IInitialCashPerDay";
import { IInitialCashPerDayError } from "./IInitialCashPerDayError";

export default interface IInitialCashPerDayValidaionService {
  validateInitialCashPerDay(
    initialDailyCash: IInitialCashPerDay
  ): IInitialCashPerDayError;
}
