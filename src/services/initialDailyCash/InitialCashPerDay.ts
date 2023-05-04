import IInitialCashPerDay from "./IInitialCashPerDay";

export default class InitialCashPerDay implements IInitialCashPerDay {
  constructor(id: number = 0, date: Date = new Date(), amount: number = 0) {
    this.id = id;
    this.date = date;
    this.amount = amount;
  }

  id: number;
  date: Date;
  amount: number;
}
