import IGroup from "../../group/IGroup";
import ICourse from "../../course/ICourse";

export default interface ISelectedGroupInfo {
  id: number;
  name: string;
  surname: string;
  courseId: ICourse;
  groupId: IGroup;
}
