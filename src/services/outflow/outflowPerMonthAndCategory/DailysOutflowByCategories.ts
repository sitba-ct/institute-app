import IDailysOutflowByCategories from "./IDailysOutflowByCategories";

export default class DailysOutflowByCategories
  implements IDailysOutflowByCategories
{
  constructor(name: string = "", daysOutflow: number[] = Array(31).fill(0)) {
    this.name = name;
    this.daysOutflow = daysOutflow;
  }

  name: string;
  daysOutflow: number[];
}
