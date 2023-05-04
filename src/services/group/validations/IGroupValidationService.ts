import IDiscount from "../IDiscount";
import IGroup from "../IGroup";

export default interface IGroupValidationService {
  validateName(
    name: String,
    groups: IGroup[]
  ): {
    name: string;
  };
  validateDiscount(
    amount: number,
    discount: number,
    discounts: IDiscount[]
  ): { newAmount: string | undefined; newDiscount: string | undefined };
}
