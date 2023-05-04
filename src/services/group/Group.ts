import IGroup from "./IGroup";

export default class Group implements IGroup {
  constructor(id: number = 0, name: string = "") {
    this.id = id;
    this.name = name;
  }
  id: number;
  name: string;
}
