import IDiscount from "./IDiscount";

export default class Discount implements IDiscount {
  constructor(
    id: number = 0,
    integrantsAmount: number = 0,
    discountRate: number = 0
  ) {
    this.id = id;
    this.integrantsAmount = integrantsAmount;
    this.discountRate = discountRate;
  }
  id: number;
  integrantsAmount: number;
  discountRate: number;
}
