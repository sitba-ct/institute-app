import IOutflowCategory from "./IOutflowCategory";

export default class OutflowCategory implements IOutflowCategory {
  constructor(id: number = 0, name: string = "") {
    this.id = id;
    this.name = name;
  }
  id: number;
  name: string;
}
