import IGroupErrorNewStudent from "./IGroupErrorNewStudent";

export default class GroupErrorNewStudent implements IGroupErrorNewStudent {
  constructor(groupId: string | undefined = undefined) {
    this.groupId = groupId;
  }

  groupId: string | undefined;
}
