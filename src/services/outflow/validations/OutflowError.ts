import IOutflowError from "./IOutflowError";

export default class OutflowError implements IOutflowError {
  constructor(
    id: string | undefined = "",
    outflowCategoryId: string | undefined = undefined,
    paymentMethodId: string | undefined = undefined,
    dateRegistered: string | undefined = undefined,
    amount: string | undefined = ""
  ) {
    this.id = id;
    this.outflowCategoryId = outflowCategoryId;
    this.paymentMethodId = paymentMethodId;
    this.dateRegistered = dateRegistered;
    this.amount = amount;
  }
  id: string | undefined;
  outflowCategoryId: string | undefined;
  paymentMethodId: string | undefined;
  dateRegistered: string | undefined;
  amount: string | undefined;
}
