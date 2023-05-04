import ICategoryMonthlyIncome from "./ICategoryMonthlyIncome";

export default class CategoryMonthlyIncome implements ICategoryMonthlyIncome {
  constructor(name: string = "", monthlyIncome: number[] = Array(12).fill(0)) {
    this.name = name;
    this.monthlyIncome = monthlyIncome;
  }

  name: string;
  monthlyIncome: number[];
}
