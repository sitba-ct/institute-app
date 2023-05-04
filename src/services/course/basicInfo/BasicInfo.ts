import ICourseBasicInfo from "./IBasicInfo";

export default class CourseBasicInfo implements ICourseBasicInfo {
  constructor(id: number = 0, name: string = "") {
    this.id = id;
    this.name = name;
  }
  id: number;
  name: string;
}
