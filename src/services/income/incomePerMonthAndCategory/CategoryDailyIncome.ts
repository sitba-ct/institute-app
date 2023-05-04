import ICategoryDailyIncome from "./ICategoryDailyIncome";

export default class CategoryDailyIncome implements ICategoryDailyIncome {
  constructor(name: string = "", daysIncome: number[] = Array(31).fill(0)) {
    this.name = name;
    this.daysIncome = daysIncome;
  }

  name: string;
  daysIncome: number[];
}
