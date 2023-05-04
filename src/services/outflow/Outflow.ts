import IOutflow from "./IOutflow";

export default class Outflow implements IOutflow {
  constructor(
    id: number = 0,
    outflowCategoryId: number = 0,
    dateRegistered: Date = new Date(),
    amount: number = 0,
    paymentMethodId: number = 0,
    detail: string | null = null
  ) {
    this.id = id;
    this.outflowCategoryId = outflowCategoryId;
    this.dateRegistered = dateRegistered;
    this.amount = amount;
    this.paymentMethodId = paymentMethodId;
    this.detail = detail;
  }
  id: number;
  outflowCategoryId: number;
  dateRegistered: Date;
  amount: number;
  paymentMethodId: number;
  detail: string | null;
}
