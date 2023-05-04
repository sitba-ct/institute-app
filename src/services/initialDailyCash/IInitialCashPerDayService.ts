import IInitialDailyCash from "./IInitialCashPerDay";

export default interface IInitialCashPerDayService {
  saveAmount(initialDailyCash: IInitialDailyCash): Promise<IInitialDailyCash[]>;
}
