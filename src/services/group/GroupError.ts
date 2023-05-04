import IGroupError from "./IGroupError";

export default class GroupError implements IGroupError {
  constructor(name: string | undefined) {
    this.name = name;
  }
  name: string | undefined;
}
