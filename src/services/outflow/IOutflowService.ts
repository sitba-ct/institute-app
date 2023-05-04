import IOutflowCategory from "./outflowCategory/IOutflowCategory";
import IOutflow from "./IOutflow";
import IOutflowCategoryDetailed from "./outflowCategoryDetailed/IOutflowCategoryDetailed";
import IOutflowCategoryMonthly from "./outflowPerMonthAndCategory/IOutflowCategoryMonthly";
import IOutflowExtended from "./IOutflowExtended";

export default interface IOutflowervice {
  getOutflowCategorysList(): Promise<IOutflowCategory[]>;
  getOutflow(): Promise<IOutflow[]>;
  getOutflowCategoryDetailed(): Promise<IOutflowCategoryDetailed[]>;
  getMonthlyOutflow(
    incomesPerCategory: IOutflowCategoryDetailed[]
  ): IOutflowCategoryMonthly[];
  add(income: IOutflow): Promise<IOutflow>;
  isValid(income: IOutflow): boolean;
  geTotalPerMonth(incomesPerCategory: IOutflowCategoryMonthly[]): number[];
  getOutflowExtendedWithDate(dateSelected: string): Promise<IOutflowExtended[]>;
}
