import IStudentBasicInfo from "./IBasicInfo";

export default class StudentBasicInfo implements IStudentBasicInfo {
  constructor(id: number, name: string, surname: string, groupId: number) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.groupId = groupId;
  }
  id: number;
  name: string;
  surname: string;
  groupId: number;
}
