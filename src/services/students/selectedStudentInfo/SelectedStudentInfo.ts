import IGroup from "../../group/IGroup";
import ICourseBasicInfo from "../../course/basicInfo/IBasicInfo";
import ISelectedStudentInfo from "./ISelectedStudentInfo";
import Group from "../../group/Group";
import CourseBasicInfo from "../../course/basicInfo/BasicInfo";

export default class SelectedStudentInfo implements ISelectedStudentInfo {
  constructor(
    id: number = 0,
    name: string = "",
    surname: string = "",
    course: ICourseBasicInfo = new CourseBasicInfo(),
    group: IGroup = new Group()
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
  courseId: ICourseBasicInfo;
  groupId: IGroup;
}
