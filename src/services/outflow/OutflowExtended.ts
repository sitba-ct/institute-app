import IPaymentMethod from "../income/paymentMethods/IPaymentMethod";
import IOutflowExtended from "./IOutflowExtended";
import IOutflowCategory from "./outflowCategory/IOutflowCategory";
import OutflowCategory from "./outflowCategory/OutflowCategory";

export default class OutflowExtended implements IOutflowExtended {
  constructor(
    id: number = 0,
    outflowCategory: IOutflowCategory = new OutflowCategory(),
    dateRegistered: Date = new Date(),
    amount: number = 0,
    paymentMethod: IPaymentMethod,
    detail: string | null = null
  ) {
    this.id = id;
    this.outflowCategory = outflowCategory;
    this.dateRegistered = dateRegistered;
    this.amount = amount;
    this.paymentMethod = paymentMethod;
    this.detail = detail;
  }
  id: number;
  outflowCategory: IOutflowCategory;
  dateRegistered: Date;
  amount: number;
  paymentMethod: IPaymentMethod;
  detail: string | null;
}
