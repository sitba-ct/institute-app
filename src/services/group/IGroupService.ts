import IGroup from "./IGroup";
import Group from "./Group";
import IDiscount from "./IDiscount";

//maneges groups
export default interface IGroupService {
  get(): Promise<IGroup[]>;
  add(name: string): Promise<Group>;
  delete(id: number): Promise<Group>;
  edit(group: IGroup): Promise<Group>;
  getDiscount(): Promise<IDiscount[]>;
  GetDiscountByAmountOfIntegrants(integrantsAmount: number): Promise<IDiscount>;
}
