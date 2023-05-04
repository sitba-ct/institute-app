import axios from "axios";
import IInitialDailyCash from "./IInitialCashPerDay";
import IInitialCashPerDayService from "./IInitialCashPerDayService";
import { injectable } from "tsyringe";
@injectable()
export class InitialCashPerDayService implements IInitialCashPerDayService {
  async saveAmount(
    initialDailyCash: IInitialDailyCash
  ): Promise<IInitialDailyCash[]> {
    let response = await axios
      .post("/rest/v1/initialCash?select=*", {
        date: initialDailyCash.date,
        amount: initialDailyCash.amount,
      })
      .catch((error) => {
        console.log(error.toJSON());
        throw error;
      });
    return response.data;
  }
}
