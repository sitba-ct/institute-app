import { IInitialCashPerDayError } from "./IInitialCashPerDayError";

export default class InitialCashPerDayError implements IInitialCashPerDayError {
  constructor(date: string = "", initialCash: string | undefined = undefined) {
    this.date = date;
    this.initialCash = initialCash;
  }
  date: string;
  initialCash: string | undefined;
}
