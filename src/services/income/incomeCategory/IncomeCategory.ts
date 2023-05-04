import IIncomeCategory from "./IIncomeCategory";

export default class IncomeCategory implements IIncomeCategory {
  constructor(id: number = 0, name: string = "") {
    this.id = id;
    this.name = name;
  }
  id: number;
  name: string;
}
