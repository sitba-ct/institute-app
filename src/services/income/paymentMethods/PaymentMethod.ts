import IPaymentMethod from "./IPaymentMethod";

export default class PaymentMethod implements IPaymentMethod {
  constructor(id: number = 0, name: string = "") {
    this.id = id;
    this.name = name;
  }
  id: number;
  name: string;
}
