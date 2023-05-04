import IRole from "./IRole";

export default class Role implements IRole {
  constructor(id: number = 0, name: string = "") {
    this.id = id;
    this.name = name;
  }
  id: number;
  name: string;
}
