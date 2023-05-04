import ICourseBasicInfo from "../../course/basicInfo/IBasicInfo";
import IGroup from "../../group/IGroup";

export default interface ISelectedStudentInfo {
  id: number;
  name: string;
  surname: string;
  courseId: ICourseBasicInfo;
  groupId: IGroup;
}
