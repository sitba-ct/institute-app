import IOutflowCategoryMonthly from "./IOutflowCategoryMonthly";

export default class OutflowCategoryMonthly implements IOutflowCategoryMonthly {
  constructor(name: string = "", monthlyOutflow: number[] = Array(12).fill(0)) {
    this.name = name;
    this.monthlyOutflow = monthlyOutflow;
  }

  name: string;
  monthlyOutflow: number[];
}
