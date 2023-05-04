import IGroup from "../../group/IGroup";
import ICourse from "../../course/ICourse";
import ISelectedGroupInfo from "./ISelectedGroupInfo";

export default class SelectedGroupInfo implements ISelectedGroupInfo {
  constructor(
    id: number,
    name: string,
    surname: string,
    course: ICourse,
    group: IGroup
  ) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.courseId = course;
    this.groupId = group;
  }

  id: number;
  name: string;
  surname: string;
  courseId: ICourse;
  groupId: IGroup;
}
