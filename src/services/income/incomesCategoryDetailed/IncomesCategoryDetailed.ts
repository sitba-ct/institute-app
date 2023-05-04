import IIncome from "../IIncome";
import Income from "../Income";
import IIncomesCategoryDetailed from "./IIncomesCategoryDetailed";

export default class IncomesCategoryDetailed
  implements IIncomesCategoryDetailed
{
  constructor(name: string = "", income: IIncome[] = [new Income()]) {
    this.name = name;
    this.income = income;
  }

  name: string;
  income: IIncome[];
}
