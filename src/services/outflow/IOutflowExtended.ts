import IPaymentMethod from "../income/paymentMethods/IPaymentMethod";
import IOutflowCategory from "./outflowCategory/IOutflowCategory";

export default interface IOutflowExtended {
  id: number;
  outflowCategory: IOutflowCategory;
  dateRegistered: Date;
  amount: number;
  paymentMethod: IPaymentMethod;
  detail: string | null;
}
